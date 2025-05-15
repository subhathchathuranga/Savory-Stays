import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS = [
{
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin" as const
},
{
  id: 2,
  name: "Test User",
  email: "user@example.com",
  password: "user123",
  role: "user" as const,
  phone: "123-456-7890",
  address: "123 Main St, City"
}];


// Provider component
export const AuthProvider = ({ children }: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // This would be an API call in a real application
    try {
      // Mock login logic
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;

      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // This would be an API call in a real application
    try {
      // Check if email already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }

      // Create new user
      const newUser = {
        id: MOCK_USERS.length + 1,
        name,
        email,
        role: "user" as const
      };

      // In a real app, we would save this to a database
      // For this mock, we'll just pretend it was saved

      // Log in the new user
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in");

      // Update user data
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>);

};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
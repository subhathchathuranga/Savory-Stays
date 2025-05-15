import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect URL from query parameters
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirect") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back!"
        });
        navigate(redirectTo);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // For demo purposes - quick login options
  const quickLogin = async (type: "admin" | "user") => {
    setIsLoading(true);

    try {
      const credentials = type === "admin" ?
      { email: "admin@example.com", password: "admin123" } :
      { email: "user@example.com", password: "user123" };

      const success = await login(credentials.email, credentials.password);

      if (success) {
        toast({
          title: "Login successful",
          description: `Logged in as ${type}`
        });
        navigate(redirectTo);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4" data-id="whrw7eotf" data-path="src/pages/LoginPage.tsx">
        <div className="max-w-md mx-auto" data-id="6cfbpusoi" data-path="src/pages/LoginPage.tsx">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4" data-id="d5mu8rakd" data-path="src/pages/LoginPage.tsx">
                {error &&
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start" data-id="mqjwv6081" data-path="src/pages/LoginPage.tsx">
                    <AlertCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <p data-id="763gmlxdn" data-path="src/pages/LoginPage.tsx">{error}</p>
                  </div>
                }
                
                <div className="space-y-2" data-id="gft48t7z5" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                </div>
                
                <div className="space-y-2" data-id="0l7q27uq9" data-path="src/pages/LoginPage.tsx">
                  <div className="flex justify-between items-center" data-id="dj9r9r21o" data-path="src/pages/LoginPage.tsx">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative" data-id="i8tsvsy0d" data-path="src/pages/LoginPage.tsx">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={toggleShowPassword}>

                      {showPassword ?
                      <EyeOff className="h-4 w-4" /> :

                      <Eye className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}>

                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-600" data-id="m908r5den" data-path="src/pages/LoginPage.tsx">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline font-medium">

                  Register
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="relative w-full mb-2" data-id="m0csidsqu" data-path="src/pages/LoginPage.tsx">
                <div className="absolute inset-0 flex items-center" data-id="r8tr1y8vy" data-path="src/pages/LoginPage.tsx">
                  <div className="w-full border-t border-gray-200" data-id="ny4rlhd6j" data-path="src/pages/LoginPage.tsx"></div>
                </div>
                <div className="relative flex justify-center text-sm" data-id="4lxklusth" data-path="src/pages/LoginPage.tsx">
                  <span className="px-2 bg-white text-gray-500" data-id="kngmk3jxl" data-path="src/pages/LoginPage.tsx">
                    Quick Login (Demo)
                  </span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-2" data-id="karnm0era" data-path="src/pages/LoginPage.tsx">
                <Button
                  variant="outline"
                  onClick={() => quickLogin("user")}
                  disabled={isLoading}>

                  Login as User
                </Button>
                <Button
                  variant="outline"
                  onClick={() => quickLogin("admin")}
                  disabled={isLoading}>

                  Login as Admin
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>);

};

export default LoginPage;
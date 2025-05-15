import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password);

      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully."
        });
        navigate("/");
      } else {
        setError("Registration failed. This email may already be in use.");
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

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4" data-id="xcx4ltzno" data-path="src/pages/RegisterPage.tsx">
        <div className="max-w-md mx-auto" data-id="a7z6bop9p" data-path="src/pages/RegisterPage.tsx">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Enter your details to register a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4" data-id="6n7o689jy" data-path="src/pages/RegisterPage.tsx">
                {error &&
                <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start" data-id="zfuyoktvz" data-path="src/pages/RegisterPage.tsx">
                    <AlertCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <p data-id="07p6f34g6" data-path="src/pages/RegisterPage.tsx">{error}</p>
                  </div>
                }
                
                <div className="space-y-2" data-id="7bnuyl9lx" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />

                </div>
                
                <div className="space-y-2" data-id="7bg3w198v" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                </div>
                
                <div className="space-y-2" data-id="vif9lezou" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative" data-id="scb1u1vs8" data-path="src/pages/RegisterPage.tsx">
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
                  <p className="text-xs text-gray-500" data-id="7nx0511qh" data-path="src/pages/RegisterPage.tsx">
                    Password must be at least 6 characters long
                  </p>
                </div>
                
                <div className="space-y-2" data-id="gftgzjr1l" data-path="src/pages/RegisterPage.tsx">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required />

                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}>

                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-600" data-id="036hp8f5z" data-path="src/pages/RegisterPage.tsx">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium">

                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>);

};

export default RegisterPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Save, User, AlertCircle } from "lucide-react";

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login?redirect=profile");
    return null;
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await updateProfile({
        name,
        email,
        phone,
        address
      });

      if (success) {
        toast({
          title: "Profile Updated",
          description: "Your profile information has been updated successfully."
        });
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    // Check password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // In a real app, we would verify the current password
    // Since this is a demo, we'll just simulate success
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully."
      });

      // Reset form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

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
      <div className="container mx-auto px-4 py-12" data-id="2cm7lv8d0" data-path="src/pages/ProfilePage.tsx">
        <h1 className="text-3xl font-bold mb-8" data-id="av70boevv" data-path="src/pages/ProfilePage.tsx">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" data-id="co4cj40pe" data-path="src/pages/ProfilePage.tsx">
          {/* Sidebar */}
          <div className="lg:col-span-1" data-id="sxfzvo8hh" data-path="src/pages/ProfilePage.tsx">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto rounded-full bg-gray-100 p-6 w-24 h-24 flex items-center justify-center mb-2" data-id="wmxtjimtz" data-path="src/pages/ProfilePage.tsx">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1" data-id="mtaof2exl" data-path="src/pages/ProfilePage.tsx">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild>

                    <a href="/orders" data-id="2gnvh1575" data-path="src/pages/ProfilePage.tsx">My Orders</a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild>

                    <a href="/bookings" data-id="srdy5kg17" data-path="src/pages/ProfilePage.tsx">My Bookings</a>
                  </Button>
                </nav>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}>

                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3" data-id="33nmyxgij" data-path="src/pages/ProfilePage.tsx">
            <Tabs defaultValue="account">
              <TabsList className="mb-6">
                <TabsTrigger value="account">Account Information</TabsTrigger>
                <TabsTrigger value="password">Change Password</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4" data-id="vvdel9i47" data-path="src/pages/ProfilePage.tsx">
                      {error &&
                      <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start" data-id="pm8qpxrua" data-path="src/pages/ProfilePage.tsx">
                          <AlertCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                          <p data-id="hlgs6rrh8" data-path="src/pages/ProfilePage.tsx">{error}</p>
                        </div>
                      }
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="vxb9m4ndd" data-path="src/pages/ProfilePage.tsx">
                        <div className="space-y-2" data-id="ecssexgf1" data-path="src/pages/ProfilePage.tsx">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />

                        </div>
                        <div className="space-y-2" data-id="es088e7dc" data-path="src/pages/ProfilePage.tsx">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />

                        </div>
                      </div>
                      
                      <div className="space-y-2" data-id="znb5i6vwc" data-path="src/pages/ProfilePage.tsx">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(123) 456-7890" />

                      </div>
                      
                      <div className="space-y-2" data-id="5un86zmne" data-path="src/pages/ProfilePage.tsx">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Your delivery address"
                          rows={3} />

                      </div>
                      
                      <Button
                        type="submit"
                        className="flex items-center"
                        disabled={isLoading}>

                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4" data-id="sl6n0gndi" data-path="src/pages/ProfilePage.tsx">
                      {error &&
                      <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start" data-id="b2hx130lb" data-path="src/pages/ProfilePage.tsx">
                          <AlertCircle className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                          <p data-id="eav5d9g7a" data-path="src/pages/ProfilePage.tsx">{error}</p>
                        </div>
                      }
                      
                      <div className="space-y-2" data-id="y3crtupu9" data-path="src/pages/ProfilePage.tsx">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative" data-id="sbpasw0ha" data-path="src/pages/ProfilePage.tsx">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
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
                      
                      <div className="space-y-2" data-id="f1q8q191o" data-path="src/pages/ProfilePage.tsx">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative" data-id="50uv9kmve" data-path="src/pages/ProfilePage.tsx">
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required />

                        </div>
                      </div>
                      
                      <div className="space-y-2" data-id="5f55xky6j" data-path="src/pages/ProfilePage.tsx">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative" data-id="5p1zdc72a" data-path="src/pages/ProfilePage.tsx">
                          <Input
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />

                        </div>
                        <p className="text-xs text-gray-500" data-id="lic2l3bs9" data-path="src/pages/ProfilePage.tsx">
                          Password must be at least 6 characters long
                        </p>
                      </div>
                      
                      <Button
                        type="submit"
                        className="flex items-center"
                        disabled={isLoading}>

                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>);

};

export default ProfilePage;
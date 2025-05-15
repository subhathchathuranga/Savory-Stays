import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ?
      "bg-white shadow-md py-2" :
      "bg-white/90 backdrop-blur-sm py-4"}`
      } data-id="p2ugmv5iw" data-path="src/components/layout/Navbar.tsx">

      <div className="container mx-auto px-4" data-id="ga8wpjdi2" data-path="src/components/layout/Navbar.tsx">
        <div className="flex items-center justify-between" data-id="woa08c1pl" data-path="src/components/layout/Navbar.tsx">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-id="w1fz45mpk" data-path="src/components/layout/Navbar.tsx">
              Savory Stays
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" data-id="wse4sgedx" data-path="src/components/layout/Navbar.tsx">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="text-base">

                Home
              </Button>
            </Link>
            <Link to="/menu">
              <Button
                variant={isActive("/menu") ? "default" : "ghost"}
                className="text-base">

                Menu
              </Button>
            </Link>
            <Link to="/rooms">
              <Button
                variant={isActive("/rooms") ? "default" : "ghost"}
                className="text-base">

                Rooms
              </Button>
            </Link>
            {isAuthenticated &&
            <>
                <Link to="/orders">
                  <Button
                  variant={isActive("/orders") ? "default" : "ghost"}
                  className="text-base">

                    Orders
                  </Button>
                </Link>
                <Link to="/bookings">
                  <Button
                  variant={isActive("/bookings") ? "default" : "ghost"}
                  className="text-base">

                    Bookings
                  </Button>
                </Link>
              </>
            }
            <Link to="/about">
              <Button
                variant={isActive("/about") ? "default" : "ghost"}
                className="text-base">

                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant={isActive("/contact") ? "default" : "ghost"}
                className="text-base">

                Contact
              </Button>
            </Link>
            
            <div className="ml-4 flex items-center space-x-2" data-id="j6c9zr5am" data-path="src/components/layout/Navbar.tsx">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 &&
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-id="5c32127lu" data-path="src/components/layout/Navbar.tsx">
                      {cartItems.length}
                    </span>
                  }
                </Button>
              </Link>

              {isAuthenticated ?
              <div className="flex items-center space-x-2" data-id="w5u1ipbzj" data-path="src/components/layout/Navbar.tsx">
                  <Link to="/profile">
                    <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border">

                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div> :

              <Link to="/login">
                  <Button variant="default" size="sm">
                    Login / Register
                  </Button>
                </Link>
              }
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden" data-id="7vdko3djb" data-path="src/components/layout/Navbar.tsx">
            <Link to="/cart" className="mr-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 &&
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-id="90zfr5c6n" data-path="src/components/layout/Navbar.tsx">
                    {cartItems.length}
                  </span>
                }
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu">

              {mobileMenuOpen ?
              <X className="h-6 w-6" /> :

              <Menu className="h-6 w-6" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen &&
        <div className="md:hidden pt-4 pb-3 border-t mt-2" data-id="68ubqa6vj" data-path="src/components/layout/Navbar.tsx">
            <div className="flex flex-col space-y-2" data-id="lmd35br5f" data-path="src/components/layout/Navbar.tsx">
              <Link
              to="/"
              onClick={closeMobileMenu}
              className={`px-4 py-2 rounded-md ${
              isActive("/") ?
              "bg-orange-100 text-orange-800 font-medium" :
              "text-gray-700 hover:bg-gray-100"}`
              }>

                Home
              </Link>
              <Link
              to="/menu"
              onClick={closeMobileMenu}
              className={`px-4 py-2 rounded-md ${
              isActive("/menu") ?
              "bg-orange-100 text-orange-800 font-medium" :
              "text-gray-700 hover:bg-gray-100"}`
              }>

                Menu
              </Link>
              <Link
              to="/rooms"
              onClick={closeMobileMenu}
              className={`px-4 py-2 rounded-md ${
              isActive("/rooms") ?
              "bg-orange-100 text-orange-800 font-medium" :
              "text-gray-700 hover:bg-gray-100"}`
              }>

                Rooms
              </Link>
              {isAuthenticated &&
            <>
                  <Link
                to="/orders"
                onClick={closeMobileMenu}
                className={`px-4 py-2 rounded-md ${
                isActive("/orders") ?
                "bg-orange-100 text-orange-800 font-medium" :
                "text-gray-700 hover:bg-gray-100"}`
                }>

                    Orders
                  </Link>
                  <Link
                to="/bookings"
                onClick={closeMobileMenu}
                className={`px-4 py-2 rounded-md ${
                isActive("/bookings") ?
                "bg-orange-100 text-orange-800 font-medium" :
                "text-gray-700 hover:bg-gray-100"}`
                }>

                    Bookings
                  </Link>
                </>
            }
              <Link
              to="/about"
              onClick={closeMobileMenu}
              className={`px-4 py-2 rounded-md ${
              isActive("/about") ?
              "bg-orange-100 text-orange-800 font-medium" :
              "text-gray-700 hover:bg-gray-100"}`
              }>

                About
              </Link>
              <Link
              to="/contact"
              onClick={closeMobileMenu}
              className={`px-4 py-2 rounded-md ${
              isActive("/contact") ?
              "bg-orange-100 text-orange-800 font-medium" :
              "text-gray-700 hover:bg-gray-100"}`
              }>

                Contact
              </Link>
              
              {isAuthenticated ?
            <div className="pt-2 border-t mt-2 flex flex-col space-y-2" data-id="rnu7c1iim" data-path="src/components/layout/Navbar.tsx">
                  <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">

                    My Profile
                  </Link>
                  <Button
                variant="outline"
                className="mx-4"
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}>

                    Logout
                  </Button>
                </div> :

            <div className="pt-2 border-t mt-2" data-id="j5xfnkx6q" data-path="src/components/layout/Navbar.tsx">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button className="w-full">Login / Register</Button>
                  </Link>
                </div>
            }
            </div>
          </div>
        }
      </div>
    </header>);

};

export default Navbar;
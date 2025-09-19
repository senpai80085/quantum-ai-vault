import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Safely get location with error handling
  let location;
  try {
    location = useLocation();
  } catch (error) {
    console.error("Router context error:", error);
    return null; // Don't render if router context is not available
  }
  
  const isAuth = localStorage.getItem("quantum_token");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Generator", href: "/generator" },
    { name: "Vault", href: "/vault" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="quantum-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="quantum-glow p-2 rounded-lg">
              <Shield className="h-6 w-6 text-primary animate-glow" />
            </div>
            <span className="text-xl font-bold text-gradient">QuantumSafe</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location?.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuth ? (
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("quantum_token");
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/auth?signup=true">
                  <Button className="quantum-button">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 py-4"
            >
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location?.pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                  {isAuth ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        localStorage.removeItem("quantum_token");
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link to="/auth">
                        <Button variant="ghost" className="w-full">Login</Button>
                      </Link>
                      <Link to="/auth?signup=true">
                        <Button className="quantum-button w-full">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
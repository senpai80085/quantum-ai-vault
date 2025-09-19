import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="quantum-bg min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <Card className="quantum-card">
          <CardContent className="p-12">
            <div className="inline-flex items-center justify-center p-4 quantum-glow rounded-full mb-6">
              <Shield className="h-12 w-12 text-primary opacity-50" />
            </div>
            <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The quantum pathway you're looking for doesn't exist in this dimension.
            </p>
            <Button
              onClick={() => window.location.href = "/"}
              className="quantum-button"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Security
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;

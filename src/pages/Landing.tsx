import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Zap, Bot, Key, Database } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Generation",
      description: "Smart passphrases using advanced AI models for human-readable security.",
    },
    {
      icon: Lock,
      title: "Quantum-Safe Encryption",
      description: "Post-quantum cryptography with Kyber512 and AES-256 protection.",
    },
    {
      icon: Key,
      title: "Developer Keys",
      description: "Generate 64-128 character secure keys for API tokens and development.",
    },
    {
      icon: Database,
      title: "Encrypted Vault",
      description: "Securely store all your passwords with client-side master key encryption.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Lightning-fast password generation with real-time strength analysis.",
    },
    {
      icon: Shield,
      title: "Zero Knowledge",
      description: "Your master key never leaves your device. We can't see your passwords.",
    },
  ];

  return (
    <div className="quantum-bg min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center p-4 quantum-glow rounded-full mb-6">
              <Shield className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Future-Proof <span className="text-gradient">Passwords</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered password generation with quantum-safe encryption. 
              Secure your digital life against tomorrow's threats today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/auth?signup=true">
              <Button size="lg" className="quantum-button text-lg px-8 py-6">
                Start Securing Now
              </Button>
            </Link>
            <Link to="/generator">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Try Generator
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">256-bit</div>
              <div className="text-muted-foreground">AES Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">Quantum-Safe</div>
              <div className="text-muted-foreground">PQC Protection</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">AI-Powered</div>
              <div className="text-muted-foreground">Smart Generation</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose QuantumSafe?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced security meets intuitive design. Protect your digital identity 
            with the next generation of password management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="quantum-card h-full hover:quantum-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 quantum-glow rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center quantum-card p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Go Quantum-Safe?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the future of password security. Generate, store, and manage your 
            passwords with military-grade quantum-resistant encryption.
          </p>
          <Link to="/auth?signup=true">
            <Button size="lg" className="quantum-button text-lg px-8 py-6">
              Create Your Vault
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
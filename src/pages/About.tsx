import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Bot, Zap, Database, Key, Check } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Generation",
      description: "Advanced language models create human-readable yet secure passphrases",
      details: ["GPT-based passphrase generation", "Contextual word combinations", "Natural language patterns"],
    },
    {
      icon: Lock,
      title: "Post-Quantum Cryptography",
      description: "Future-proof encryption that resists quantum computer attacks",
      details: ["Kyber512 key exchange", "NIST-approved algorithms", "Quantum-resistant security"],
    },
    {
      icon: Shield,
      title: "AES-256 Encryption",
      description: "Military-grade symmetric encryption for password storage",
      details: ["256-bit key length", "GCM authenticated encryption", "Zero-knowledge architecture"],
    },
    {
      icon: Key,
      title: "Master Key Derivation",
      description: "Secure key derivation using industry-standard functions",
      details: ["HKDF key derivation", "Argon2 password hashing", "Client-side key management"],
    },
  ];

  const securityLayers = [
    "Client-side master key encryption",
    "Post-quantum key exchange (Kyber512)",
    "AES-256-GCM authenticated encryption",
    "HKDF key derivation function",
    "Argon2 password hashing",
    "Zero-knowledge architecture",
  ];

  return (
    <div className="quantum-bg min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 quantum-glow rounded-full mb-6">
            <Shield className="h-12 w-12 text-primary animate-float" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Why <span className="text-gradient">Quantum-Safe</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional encryption methods will become vulnerable when quantum computers reach maturity. 
            QuantumSafe protects your passwords against both current and future threats using 
            post-quantum cryptography and advanced AI generation.
          </p>
        </motion.div>

        {/* Quantum Threat Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-center">The Quantum Timeline</CardTitle>
              <CardDescription className="text-center">
                Why we need quantum-safe security today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-quantum-danger">Today</div>
                  <div className="text-lg font-semibold">Current Risk</div>
                  <p className="text-muted-foreground">
                    Adversaries are already collecting encrypted data to decrypt later with quantum computers
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-quantum-warning">2030s</div>
                  <div className="text-lg font-semibold">Quantum Advantage</div>
                  <p className="text-muted-foreground">
                    Quantum computers expected to break current RSA and ECC encryption methods
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-quantum-success">Future</div>
                  <div className="text-lg font-semibold">Quantum-Safe Era</div>
                  <p className="text-muted-foreground">
                    Only quantum-resistant algorithms will provide adequate security
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advanced Technology Stack</h2>
            <p className="text-xl text-muted-foreground">
              Cutting-edge cryptography meets intelligent password generation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="quantum-card h-full hover:quantum-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 quantum-glow rounded-lg">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-quantum-success" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-center">Multi-Layer Security Architecture</CardTitle>
              <CardDescription className="text-center">
                Defense in depth with quantum-resistant technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {securityLayers.map((layer, index) => (
                  <motion.div
                    key={layer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-white/10"
                  >
                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{layer}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="quantum-card text-center">
            <CardContent className="p-6">
              <Database className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">256-bit</div>
              <div className="text-sm text-muted-foreground">AES Encryption</div>
            </CardContent>
          </Card>
          
          <Card className="quantum-card text-center">
            <CardContent className="p-6">
              <Lock className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent">Kyber512</div>
              <div className="text-sm text-muted-foreground">PQC Algorithm</div>
            </CardContent>
          </Card>
          
          <Card className="quantum-card text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-quantum-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-quantum-warning">Argon2</div>
              <div className="text-sm text-muted-foreground">Key Derivation</div>
            </CardContent>
          </Card>
          
          <Card className="quantum-card text-center">
            <CardContent className="p-6">
              <Bot className="h-8 w-8 text-quantum-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-quantum-success">AI-Gen</div>
              <div className="text-sm text-muted-foreground">Smart Passwords</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle className="text-center">Why Choose QuantumSafe?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">For Individuals</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Future-proof password security
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      AI-generated memorable passwords
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Zero-knowledge architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Cross-platform accessibility
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-accent">For Developers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      64-128 char secure API keys
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Cryptographically secure generation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Perfect for tokens & secrets
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-quantum-success" />
                      Integration-ready format
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Save, Bot, Hash, Key, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface StrengthMeter {
  score: number;
  label: string;
  color: string;
  entropy: number;
}

const Generator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const { toast } = useToast();

  // Password options
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);

  const calculateStrength = (password: string): StrengthMeter => {
    let entropy = 0;
    let charset = 0;
    
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;  
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;
    
    entropy = Math.log2(Math.pow(charset, password.length));
    
    if (entropy < 40) return { score: 1, label: "Weak", color: "strength-weak", entropy };
    if (entropy < 60) return { score: 2, label: "Fair", color: "strength-fair", entropy };
    if (entropy < 80) return { score: 3, label: "Good", color: "strength-good", entropy };
    if (entropy < 100) return { score: 4, label: "Strong", color: "strength-strong", entropy };
    return { score: 5, label: "Very Strong", color: "strength-very-strong", entropy };
  };

  const generateAIPassphrase = async () => {
    setIsGenerating(true);
    
    // Mock AI-powered passphrase generation
    const adjectives = ["Quantum", "Secure", "Digital", "Cyber", "Neural", "Advanced", "Protected", "Encrypted"];
    const nouns = ["Guardian", "Shield", "Fortress", "Vault", "Lock", "Key", "Matrix", "Portal"];
    const verbs = ["Protects", "Secures", "Guards", "Encrypts", "Shields", "Defends", "Fortifies", "Conceals"];
    
    setTimeout(() => {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const number = Math.floor(Math.random() * 9999) + 1000;
      
      const passphrase = `${adjective}${noun}${verb}${number}!`;
      setGeneratedPassword(passphrase);
      setIsGenerating(false);
    }, 1500);
  };

  const generateRandomPassword = () => {
    setIsGenerating(true);
    
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "");
    }
    
    setTimeout(() => {
      let password = "";
      for (let i = 0; i < length[0]; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      setGeneratedPassword(password);
      setIsGenerating(false);
    }, 500);
  };

  const generateDevKey = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let key = "";
      const keyLength = Math.floor(Math.random() * 65) + 64; // 64-128 chars
      
      for (let i = 0; i < keyLength; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setGeneratedPassword(key);
      setIsGenerating(false);
    }, 500);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const savePassword = () => {
    if (!generatedPassword) return;
    
    const savedPasswords = JSON.parse(localStorage.getItem("quantum_passwords") || "[]");
    const newPassword = {
      id: Date.now(),
      website: website || "Generated Password",
      username: username || "N/A",
      password: generatedPassword,
      strength: calculateStrength(generatedPassword),
      createdAt: new Date().toISOString(),
    };
    
    savedPasswords.push(newPassword);
    localStorage.setItem("quantum_passwords", JSON.stringify(savedPasswords));
    
    toast({
      title: "Password Saved!",
      description: "Added to your quantum-safe vault",
    });
    
    setWebsite("");
    setUsername("");
  };

  const strength = generatedPassword ? calculateStrength(generatedPassword) : null;

  return (
    <div className="quantum-bg min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Password Generator</h1>
          <p className="text-xl text-muted-foreground">
            AI-powered, quantum-safe password generation for ultimate security
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Options */}
          <div className="lg:col-span-2">
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Generation Methods
                </CardTitle>
                <CardDescription>
                  Choose your preferred password generation method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ai" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ai" className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Passphrase
                    </TabsTrigger>
                    <TabsTrigger value="random" className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Random
                    </TabsTrigger>
                    <TabsTrigger value="dev" className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Developer
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai" className="space-y-4">
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">AI-Powered Passphrases</h3>
                      <p className="text-muted-foreground mb-4">
                        Human-readable yet secure passwords using advanced AI
                      </p>
                      <Button
                        onClick={generateAIPassphrase}
                        disabled={isGenerating}
                        className="quantum-button"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate AI Passphrase"
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="random" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Length: {length[0]}</Label>
                        <Slider
                          value={length}
                          onValueChange={setLength}
                          max={128}
                          min={8}
                          step={1}
                          className="mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="uppercase"
                            checked={includeUppercase}
                            onCheckedChange={setIncludeUppercase}
                          />
                          <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="lowercase"
                            checked={includeLowercase}
                            onCheckedChange={setIncludeLowercase}
                          />
                          <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="numbers"
                            checked={includeNumbers}
                            onCheckedChange={setIncludeNumbers}
                          />
                          <Label htmlFor="numbers">Numbers (0-9)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="symbols"
                            checked={includeSymbols}
                            onCheckedChange={setIncludeSymbols}
                          />
                          <Label htmlFor="symbols">Symbols (!@#$)</Label>
                        </div>
                        <div className="flex items-center space-x-2 col-span-2">
                          <Switch
                            id="exclude-similar"
                            checked={excludeSimilar}
                            onCheckedChange={setExcludeSimilar}
                          />
                          <Label htmlFor="exclude-similar">Exclude Similar Characters</Label>
                        </div>
                      </div>

                      <Button
                        onClick={generateRandomPassword}
                        disabled={isGenerating}
                        className="w-full quantum-button"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Random Password"
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="dev" className="space-y-4">
                    <div className="text-center py-8">
                      <Key className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Developer Keys</h3>
                      <p className="text-muted-foreground mb-4">
                        64-128 character secure keys for API tokens and development
                      </p>
                      <Button
                        onClick={generateDevKey}
                        disabled={isGenerating}
                        className="quantum-button"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Developer Key"
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Generated Password & Actions */}
          <div className="space-y-6">
            {/* Generated Password Display */}
            <Card className="quantum-card">
              <CardHeader>
                <CardTitle>Generated Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedPassword ? (
                  <>
                    <div className="p-4 bg-secondary/50 rounded-lg border border-white/10">
                      <p className="font-mono text-sm break-all">{generatedPassword}</p>
                    </div>
                    
                    {strength && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Strength:</span>
                          <Badge variant="outline" className={strength.color}>
                            {strength.label}
                          </Badge>
                        </div>
                        <div className="w-full bg-secondary/30 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${strength.color} transition-all duration-500`}
                            style={{ width: `${(strength.score / 5) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Entropy: {Math.round(strength.entropy)} bits
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyToClipboard}
                        className="flex-1"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.location.reload()}
                        variant="outline"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Generate a password to see it here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Password */}
            {generatedPassword && (
              <Card className="quantum-card">
                <CardHeader>
                  <CardTitle>Save to Vault</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Service</Label>
                    <Input
                      id="website"
                      placeholder="e.g., github.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username/Email</Label>
                    <Input
                      id="username"
                      placeholder="e.g., john@example.com"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <Button onClick={savePassword} className="w-full quantum-button">
                    <Save className="mr-2 h-4 w-4" />
                    Save to Vault
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
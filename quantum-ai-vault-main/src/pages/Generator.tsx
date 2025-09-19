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

  const apiBase = (import.meta as any).env?.VITE_API_BASE || (window as any).__API_BASE__ || "/api";

  const generateAIPassphrase = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${apiBase}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "passphrase", words: 4 }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setGeneratedPassword(data.password);
    } catch (e) {
      setGeneratedPassword("");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateRandomPassword = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${apiBase}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "random", length: length[0], use_symbols: includeSymbols }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setGeneratedPassword(data.password);
    } catch (e) {
      setGeneratedPassword("");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDevKey = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`${apiBase}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "devkey", length: 80 }),
      });
      if (!res.ok) throw new Error("Failed to generate");
      const data = await res.json();
      setGeneratedPassword(data.password);
    } catch (e) {
      setGeneratedPassword("");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPassword);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const savePassword = async () => {
    if (!generatedPassword) return;
    try {
      const res = await fetch(`${apiBase}/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: website || "Generated Password", plaintext: generatedPassword }),
      });
      if (!res.ok) throw new Error("Failed to save");
      await res.json();
      toast({ title: "Saved!", description: "Encrypted and stored in backend" });
      setWebsite("");
      setUsername("");
    } catch (e) {
      toast({ title: "Save failed", description: "Backend error", variant: "destructive" });
    }
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="quantum-glow p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary animate-glow" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">Quantum AI Generator</h1>
            <div className="flex gap-2">
              <span className="ai-indicator">
                <Bot className="h-3 w-3" />
                AI-Powered
              </span>
              <span className="pqc-indicator">
                <Shield className="h-3 w-3" />
                PQC-Safe
              </span>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            Next-generation password generation using AI neural networks and post-quantum cryptography
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
                    <div className="text-center py-8 ai-processing">
                      <div className="quantum-glow p-4 rounded-full w-fit mx-auto mb-4">
                        <Bot className="h-12 w-12 text-primary animate-glow" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gradient">Neural Network Passphrases</h3>
                      <p className="text-muted-foreground mb-4">
                        Advanced AI generates human-readable yet cryptographically secure passphrases
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="ai-indicator">
                          <Bot className="h-3 w-3" />
                          GPT-2 Neural Engine
                        </span>
                        <span className="pqc-indicator">
                          <Shield className="h-3 w-3" />
                          Quantum-Resistant
                        </span>
                      </div>
                      <Button
                        onClick={generateAIPassphrase}
                        disabled={isGenerating}
                        className="quantum-button"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            AI Processing...
                          </>
                        ) : (
                          "Generate Neural Passphrase"
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
                      <div className="entropy-display space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Cryptographic Strength:</span>
                          <Badge variant="outline" className={strength.color}>
                            {strength.label}
                          </Badge>
                        </div>
                        <div className="w-full bg-secondary/30 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full ${strength.color} transition-all duration-500 relative`}
                            style={{ width: `${(strength.score / 5) * 100}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="text-center">
                            <div className="font-mono text-primary">{Math.round(strength.entropy)} bits</div>
                            <div className="text-muted-foreground">Entropy</div>
                          </div>
                          <div className="text-center">
                            <div className="font-mono text-accent">
                              {strength.entropy > 128 ? "∞" : "2^" + Math.round(strength.entropy)}
                            </div>
                            <div className="text-muted-foreground">Complexity</div>
                          </div>
                        </div>
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
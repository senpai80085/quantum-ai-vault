import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Copy, Trash2, Plus, Shield, Lock, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface BackendItem { id: number; title: string; created_at: string; has_cipher: boolean }

const Vault = () => {
  const [items, setItems] = useState<BackendItem[]>([]);
  const [decrypted, setDecrypted] = useState<Record<number, string>>({});
  const apiBase = (import.meta as any).env?.VITE_API_BASE || (window as any).__API_BASE__ || "/api";
  const [searchQuery, setSearchQuery] = useState("");
  const [masterKey, setMasterKey] = useState("");
  const [showPassword, setShowPassword] = useState<{ [key: number]: boolean }>({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("quantum_token");
    if (!token) {
      navigate("/auth");
      return;
    }

    fetch(`${apiBase}/items`).then(r=>r.json()).then(setItems).catch(()=>setItems([]));
  }, [navigate]);

  const filtered = items.filter((it) => it.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const unlockVault = () => {
    // In a real app, this would verify the master key
    if (masterKey.length >= 8) {
      setIsUnlocked(true);
      toast({
        title: "Vault Unlocked",
        description: "Your passwords are now accessible",
      });
    } else {
      toast({
        title: "Invalid Master Key",
        description: "Please enter your correct master key",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const decryptItem = async (id: number) => {
    try {
      const res = await fetch(`${apiBase}/decrypt`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!res.ok) throw new Error("fail");
      const data = await res.json();
      setDecrypted((d)=>({ ...d, [id]: data.plaintext }));
    } catch {
      toast({ title: "Decrypt failed", description: "Backend error", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isUnlocked) {
    return (
      <div className="quantum-bg min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="quantum-card">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center p-3 quantum-glow rounded-full mb-4 mx-auto">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Unlock Your Vault</CardTitle>
              <CardDescription>
                Enter your master key to access your quantum-safe passwords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter master key"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && unlockVault()}
                />
              </div>
              <Button onClick={unlockVault} className="w-full quantum-button">
                <Shield className="mr-2 h-4 w-4" />
                Unlock Vault
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quantum-bg min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Password Vault</h1>
              <p className="text-xl text-muted-foreground">
                Your quantum-safe password collection
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/generator")}
                className="quantum-button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Generate New
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Password Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <Card className="quantum-card max-w-md mx-auto">
              <CardContent className="p-8">
                <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No Passwords Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start building your quantum-safe password collection
                </p>
                <Button
                  onClick={() => navigate("/generator")}
                  className="quantum-button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Your First Password
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => (
              <motion.div
                key={password.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="quantum-card hover:quantum-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>Encrypted item</CardDescription>
                      </div>
                      <Badge variant="outline">PQC</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Secret:</span>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => togglePasswordVisibility(item.id)}
                          >
                            {showPassword[item.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(decrypted[item.id] || "", "Secret")}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-secondary/50 rounded-lg border border-white/10">
                        <p className="font-mono text-sm break-all">
                          {showPassword[item.id]
                            ? (decrypted[item.id] || "Tap unlock")
                            : "•".repeat(12)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Created: {formatDate(item.created_at)}
                      </span>
                      
                      <Button size="sm" variant="outline" onClick={()=>decryptItem(item.id)}>Decrypt</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="quantum-card">
            <CardHeader>
              <CardTitle>Vault Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{passwords.length}</div>
                  <div className="text-sm text-muted-foreground">Total Passwords</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {passwords.filter((p) => p.strength.score >= 4).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Strong Passwords</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-quantum-warning">
                    {passwords.filter((p) => p.strength.score <= 2).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Need Upgrade</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-quantum-success">AES-256</div>
                  <div className="text-sm text-muted-foreground">Encryption</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Vault;
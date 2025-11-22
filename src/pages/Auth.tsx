import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { LogIn, UserPlus, ShieldAlert } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

interface LoginAttempts {
  count: number;
  lockoutUntil: number | null;
}

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempts>({ count: 0, lockoutUntil: null });
  const [remainingLockoutTime, setRemainingLockoutTime] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load login attempts from localStorage on mount
  useEffect(() => {
    const storedAttempts = localStorage.getItem("loginAttempts");
    if (storedAttempts) {
      const attempts: LoginAttempts = JSON.parse(storedAttempts);
      
      // Check if lockout has expired
      if (attempts.lockoutUntil && Date.now() >= attempts.lockoutUntil) {
        // Reset attempts if lockout expired
        const resetAttempts = { count: 0, lockoutUntil: null };
        setLoginAttempts(resetAttempts);
        localStorage.setItem("loginAttempts", JSON.stringify(resetAttempts));
      } else {
        setLoginAttempts(attempts);
      }
    }
  }, []);

  // Update remaining lockout time every second
  useEffect(() => {
    if (loginAttempts.lockoutUntil) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, loginAttempts.lockoutUntil! - Date.now());
        setRemainingLockoutTime(remaining);
        
        // Clear lockout when time expires
        if (remaining === 0) {
          const resetAttempts = { count: 0, lockoutUntil: null };
          setLoginAttempts(resetAttempts);
          localStorage.setItem("loginAttempts", JSON.stringify(resetAttempts));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loginAttempts.lockoutUntil]);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        // Redirect authenticated users to admin
        if (session) {
          setTimeout(() => {
            navigate("/admin");
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if account is locked
    if (loginAttempts.lockoutUntil && Date.now() < loginAttempts.lockoutUntil) {
      const remainingMinutes = Math.ceil((loginAttempts.lockoutUntil - Date.now()) / 60000);
      toast({
        variant: "destructive",
        title: "Akun Terkunci",
        description: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${remainingMinutes} menit.`,
      });
      return;
    }
    
    // Validate input
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Call edge function for IP-based rate limiting
        const { data, error } = await supabase.functions.invoke('auth-login', {
          body: { email: email.trim(), password }
        });

        if (error || data?.error) {
          const errorData = data || {};
          
          if (errorData.locked) {
            // IP is locked by server
            const lockoutUntil = Date.now() + ((errorData.remainingMinutes || 15) * 60 * 1000);
            const newAttempts = { count: MAX_LOGIN_ATTEMPTS, lockoutUntil };
            setLoginAttempts(newAttempts);
            localStorage.setItem("loginAttempts", JSON.stringify(newAttempts));
            
            toast({
              variant: "destructive",
              title: "IP Address Terkunci",
              description: errorData.error || "Terlalu banyak percobaan login gagal dari IP ini.",
            });
          } else if (errorData.remainingAttempts !== undefined) {
            // Show remaining attempts
            const remaining = errorData.remainingAttempts;
            const newAttempts = { count: MAX_LOGIN_ATTEMPTS - remaining, lockoutUntil: null };
            setLoginAttempts(newAttempts);
            localStorage.setItem("loginAttempts", JSON.stringify(newAttempts));
            
            toast({
              variant: "destructive",
              title: "Login Gagal",
              description: `Email atau password salah. ${remaining} percobaan tersisa sebelum IP dikunci.`,
            });
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: errorData.error || error?.message || "Login gagal",
            });
          }
          return;
        }

        // Login successful - set session from edge function response
        if (data?.session) {
          await supabase.auth.setSession(data.session);
        }
        
        // Reset login attempts on successful login
        const resetAttempts = { count: 0, lockoutUntil: null };
        setLoginAttempts(resetAttempts);
        localStorage.setItem("loginAttempts", JSON.stringify(resetAttempts));

        toast({
          title: "Login Berhasil",
          description: "Selamat datang di Admin Panel",
        });
      } else {
        // Sign up
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              variant: "destructive",
              title: "Email Sudah Terdaftar",
              description: "Gunakan email lain atau login",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message,
            });
          }
          return;
        }

        toast({
          title: "Registrasi Berhasil",
          description: "Akun berhasil dibuat",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Terjadi kesalahan sistem",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Login Admin" : "Registrasi Admin"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Masuk ke Admin Panel Breakroom Depok"
              : "Buat akun admin baru"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Lockout Warning */}
          {loginAttempts.lockoutUntil && Date.now() < loginAttempts.lockoutUntil && (
            <Alert variant="destructive" className="mb-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Akun Terkunci</AlertTitle>
              <AlertDescription>
                Terlalu banyak percobaan login gagal. Coba lagi dalam{" "}
                <strong>{Math.ceil(remainingLockoutTime / 60000)} menit</strong>.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Failed Attempts Warning */}
          {isLogin && loginAttempts.count > 0 && loginAttempts.count < MAX_LOGIN_ATTEMPTS && !loginAttempts.lockoutUntil && (
            <Alert className="mb-4 border-caution bg-caution/10">
              <ShieldAlert className="h-4 w-4 text-caution" />
              <AlertTitle className="text-caution">Peringatan Keamanan</AlertTitle>
              <AlertDescription>
                {loginAttempts.count} percobaan login gagal.{" "}
                {MAX_LOGIN_ATTEMPTS - loginAttempts.count} percobaan tersisa sebelum akun dikunci.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@breakroom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || (loginAttempts.lockoutUntil !== null && Date.now() < loginAttempts.lockoutUntil)}
            >
              {loading ? (
                "Loading..."
              ) : isLogin ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Registrasi
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
              className="text-sm"
            >
              {isLogin
                ? "Belum punya akun? Registrasi"
                : "Sudah punya akun? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

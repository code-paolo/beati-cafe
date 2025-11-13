"use client";

import { useAuth } from "@/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { LoginForm } from "@/components/forms/login-form";

export function LoginModal() {
  const { isLoginOpen, closeLogin, login, switchToSignup } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={closeLogin}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <LogIn className="h-6 w-6 text-amber-700" />
            Welcome Back
          </DialogTitle>
          <DialogDescription>
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <LoginForm onSubmit={handleLogin} onSwitchToSignup={switchToSignup} />
      </DialogContent>
    </Dialog>
  );
}

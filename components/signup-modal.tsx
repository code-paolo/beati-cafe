"use client";

import { useAuth } from "@/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { SignupForm } from "@/components/forms/signup-form";

export function SignupModal() {
  const { isSignupOpen, closeSignup, signup, switchToLogin } = useAuth();

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    await signup(data.name, data.email, data.password);
  };

  return (
    <Dialog open={isSignupOpen} onOpenChange={closeSignup}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-amber-700" />
            Create Account
          </DialogTitle>
          <DialogDescription>
            Join us and start enjoying our amazing coffee
          </DialogDescription>
        </DialogHeader>

        <SignupForm onSubmit={handleSignup} onSwitchToLogin={switchToLogin} />
      </DialogContent>
    </Dialog>
  );
}

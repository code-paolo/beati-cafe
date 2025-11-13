'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/app/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  openSignup: () => void;
  closeSignup: () => void;
  switchToSignup: () => void;
  switchToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      name: email.split('@')[0],
      email,
    });
    setIsLoginOpen(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // Mock signup - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      name,
      email,
    });
    setIsSignupOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const openLogin = useCallback(() => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  }, []);

  const closeLogin = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  const openSignup = useCallback(() => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  }, []);

  const closeSignup = useCallback(() => {
    setIsSignupOpen(false);
  }, []);

  const switchToSignup = useCallback(() => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  }, []);

  const switchToLogin = useCallback(() => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoginOpen,
        isSignupOpen,
        login,
        signup,
        logout,
        openLogin,
        closeLogin,
        openSignup,
        closeSignup,
        switchToSignup,
        switchToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


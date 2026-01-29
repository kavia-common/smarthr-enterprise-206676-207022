"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "@/lib/auth/token";
import type { Role } from "@/lib/routes";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  role: Role | null;
  email?: string;
};

type AuthContextValue = AuthState & {
  // PUBLIC_INTERFACE
  signIn: (payload: { token: string; role: Role; email?: string }) => void;
  // PUBLIC_INTERFACE
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// PUBLIC_INTERFACE
export function useAuth(): AuthContextValue {
  /** Hook for accessing auth state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initial = typeof window === "undefined" ? null : getStoredAuth();
  const [state, setState] = useState<AuthState>(() => ({
    isAuthenticated: Boolean(initial?.token),
    token: initial?.token ?? null,
    role: (initial?.role as Role) ?? null,
  }));

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...state,
      signIn: ({ token, role, email }) => {
        setStoredAuth(token, role);
        setState({
          isAuthenticated: true,
          token,
          role,
          email,
        });
      },
      signOut: () => {
        clearStoredAuth();
        setState({
          isAuthenticated: false,
          token: null,
          role: null,
        });
      },
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

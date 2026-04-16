"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { MockUser, UserRole } from "@/data/mock-data";
import { mockUsers } from "@/data/mock-data";

interface AuthState {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => string | null; // returns error or null
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (name: string, company?: string) => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoggedIn: false,
  login: () => "Not initialised",
  logout: () => {},
  switchRole: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  // Rehydrate from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ettiexpo_user");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to sessionStorage
  useEffect(() => {
    try {
      if (user) {
        sessionStorage.setItem("ettiexpo_user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("ettiexpo_user");
      }
    } catch {}
  }, [user]);

  const login = useCallback((email: string, password: string): string | null => {
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return "Invalid email or password";
    setUser(found);
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev || !prev.roles.includes(role)) return prev;
      return { ...prev, role };
    });
  }, []);

  const updateProfile = useCallback((name: string, company?: string) => {
    setUser((prev) => (prev ? { ...prev, name, company: company ?? prev.company } : null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, switchRole, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

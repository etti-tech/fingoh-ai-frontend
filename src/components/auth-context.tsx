"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { MockUser, UserRole } from "@/data/mock-data";
import { mockUsers } from "@/data/mock-data";

interface AuthState {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => string | null;
  loginWithOtp: (email: string, otp: string) => string | null;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (name: string, company?: string) => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  isLoggedIn: false,
  login: () => "Not initialised",
  loginWithOtp: () => "Not initialised",
  logout: () => {},
  switchRole: () => {},
  updateProfile: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from sessionStorage on mount (client only)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("fingoh_user");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from external storage
      if (saved) setUser(JSON.parse(saved) as MockUser);
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to sessionStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        sessionStorage.setItem("fingoh_user", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("fingoh_user");
      }
    } catch {}
  }, [user, hydrated]);

  const login = useCallback((email: string, password: string): string | null => {
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return "Invalid email or password";
    setUser(found);
    return null;
  }, []);

  const loginWithOtp = useCallback((email: string, otp: string): string | null => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) return "Enter a valid email address";
    if (otp !== "123456") return "Enter the valid 6-digit OTP";

    const found = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (found) {
      setUser(found);
      return null;
    }

    const name = normalizedEmail
      .split("@")[0]
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Guest User";

    const avatar = name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setUser({
      id: `U-DEMO-${Date.now()}`,
      name,
      email: normalizedEmail,
      password: "",
      roles: ["visitor"],
      role: "visitor",
      avatar: avatar || "GU",
      company: "Fingoh",
    });

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
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, loginWithOtp, logout, switchRole, updateProfile }}>
      {hydrated ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

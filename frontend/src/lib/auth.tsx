// Hardcoded demo auth. Two roles: "admin" and "user".
// Admin credentials: admin / sia-admin-2026
// Any other email/password combo logs in as a regular user (frontend-only demo).
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readLS, writeLS } from "./storage";

export interface SiaUser {
  email: string;
  name: string;
  role: "admin" | "user";
}

const AUTH_KEY = "sia:auth:v1";
const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "sia-admin-2026";

interface AuthCtx {
  user: SiaUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrated: boolean;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SiaUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readLS<SiaUser | null>(AUTH_KEY, null));
    setHydrated(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 350));
    const e = email.trim().toLowerCase();
    if (e === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const u: SiaUser = { email: ADMIN_EMAIL, name: "SIA Admin", role: "admin" };
      writeLS(AUTH_KEY, u);
      setUser(u);
      return { ok: true } as const;
    }
    if (!e || password.length < 4) {
      return { ok: false, error: "Invalid credentials" } as const;
    }
    const u: SiaUser = { email: e, name: e.split("@")[0] || "Seeker", role: "user" };
    writeLS(AUTH_KEY, u);
    setUser(u);
    return { ok: true } as const;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const u: SiaUser = {
      email: email.trim().toLowerCase(),
      name: name.trim() || "Seeker",
      role: "user",
    };
    void password;
    writeLS(AUTH_KEY, u);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    writeLS(AUTH_KEY, null);
    setUser(null);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({ user, isAdmin: user?.role === "admin", login, signup, logout, hydrated }),
    [user, login, signup, logout, hydrated],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}

export const ADMIN_HINT = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };

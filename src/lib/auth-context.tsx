"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  getCurrentUser,
  login as loginFn,
  signup as signupFn,
  logout as logoutFn,
  type User,
} from "~/lib/auth";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string, name?: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const u = await loginFn({ data: { email, password } });
    setUser(u);
    return u;
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      const u = await signupFn({ data: { email, password, name } });
      setUser(u);
      return u;
    },
    [],
  );

  const logout = useCallback(async () => {
    await logoutFn();
    setUser(null);
  }, []);

  const isAuthenticated = !!user;
  const isPremium = user
    ? !!user.premium_until && new Date(user.premium_until) > new Date()
    : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isPremium,
        login,
        signup,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cmsLogin } from '@/lib/api';

interface AdminUser {
  id: string;
  email: string;
  role_id: string;
}

interface AdminAuthContext {
  token: string | null;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AdminAuthContext | null>(null);

const TOKEN_KEY = 'irenne_admin_token';
const USER_KEY = 'irenne_admin_user';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    const u = localStorage.getItem(USER_KEY);
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await cmsLogin(email, password);
    if (!res.data?.token) throw new Error('Login failed');
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be inside AdminAuthProvider');
  return ctx;
}

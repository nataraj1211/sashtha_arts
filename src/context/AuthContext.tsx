import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'sashtha_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || 'admin@sashthaarts.com',
              role: 'admin',
            });
          }
        } catch (e) {
          console.warn('Supabase auth session check failed', e);
        }
      } else {
        // Fallback local session for dev/preview
        const local = localStorage.getItem(ADMIN_SESSION_KEY) || localStorage.getItem('vetri_admin_session');
        if (local) {
          try {
            setUser(JSON.parse(local));
          } catch {
            localStorage.removeItem(ADMIN_SESSION_KEY);
          }
        }
      }
      setIsLoading(false);
    }

    checkSession();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@sashthaarts.com',
            role: 'admin',
          });
        } else {
          setUser(null);
        }
      });
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const adminUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin',
          };
          setUser(adminUser);
          setIsLoading(false);
          return { success: true };
        }
      } else {
        // Local Dev / Demo Admin Authentication
        const cleanEmail = email.trim().toLowerCase();
        if (
          (cleanEmail === 'admin@sashthaarts.com' && (password === 'sashthaarts123' || password === 'vetriarts123')) ||
          (cleanEmail === 'admin@vetriarts.com' && (password === 'sashthaarts123' || password === 'vetriarts123'))
        ) {
          const demoUser: User = {
            id: 'admin-local-1',
            email: 'admin@sashthaarts.com',
            role: 'admin',
          };
          setUser(demoUser);
          localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(demoUser));
          setIsLoading(false);
          return { success: true };
        } else {
          setIsLoading(false);
          return { success: false, error: 'Invalid admin credentials. Use admin@sashthaarts.com / sashthaarts123 for access.' };
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed' };
    }
    setIsLoading(false);
    return { success: false, error: 'Authentication failed' };
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

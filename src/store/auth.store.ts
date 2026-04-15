import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (accessToken: string, user?: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (accessToken, user) => {
        localStorage.setItem('accessToken', accessToken);
        set({ accessToken, user: user ?? null });
      },
      clearAuth: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, accessToken: null });
      },
    }),
    { name: 'auth-storage', partialize: (s) => ({ user: s.user, accessToken: s.accessToken }) }
  )
);

export const useIsAdmin = () => useAuthStore((s) => s.user?.role === 'admin');

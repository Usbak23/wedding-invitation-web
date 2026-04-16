import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearAuth: () => set({ user: null }),
}));

export const useIsAdmin = () => useAuthStore((s) => s.user?.role === 'admin');

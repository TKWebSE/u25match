// src/stores/authStore.ts
// 認証状態管理ストア

import { User } from 'firebase/auth';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const authStore = create<AuthStore>((set) => ({
  // 初期状態
  user: null,
  isLoading: false,
  error: null,

  // アクション
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  logout: () => set({ user: null, error: null }),
}));

// React Hook として使用するためのカスタムフック
export const useAuthStore = () => authStore();

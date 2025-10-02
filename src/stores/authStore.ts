// src/stores/authStore.ts
// 認証状態管理ストア - Zustandを使用したグローバル状態管理

import { User } from 'firebase/auth';
import { create } from 'zustand';

/**
 * 認証状態の型定義
 */
interface AuthState {
  user: User | null;      // 現在ログイン中のユーザー（Firebase User）
  isLoading: boolean;     // 認証状態チェック中フラグ（起動時・ログイン・サインアップ）
}

/**
 * 認証アクションの型定義
 */
interface AuthActions {
  setUser: (user: User | null) => void;    // ユーザー情報を設定
  setLoading: (loading: boolean) => void;  // ローディング状態を設定
  logout: () => void;                      // ログアウト（ユーザー情報をクリア）
  deleteAccount: () => void;               // アカウント削除（完全クリア）
}

/**
 * 認証ストアの完全な型定義
 */
type AuthStore = AuthState & AuthActions;

/**
 * Zustand認証ストア
 * 
 * 使用方法:
 * - 監視システムから: authStore.getState().setUser(user) ← 主な更新元
 * - ユースケースから: authStore.getState().setLoading(true) ← ローディング開始時のみ
 * - コンポーネントから: const { user, isLoading } = useAuthStore()
 */
export const authStore = create<AuthStore>((set) => ({
  // 初期状態
  user: null,
  isLoading: true,  // アプリ起動時は認証状態チェック中

  // アクション実装
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null }),
  deleteAccount: () => set({ user: null, isLoading: false }),
}));

/**
 * React Hook として使用するためのカスタムフック
 * 
 * @returns 認証ストアの現在の状態とアクション
 * 
 * 使用例:
 * const { user, isLoading, setUser } = useAuthStore();
 */
export const useAuthStore = () => authStore();

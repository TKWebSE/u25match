// src/stores/purchaseStore.ts
// 購入・決済状態管理ストア - 購入履歴とローディング状態を担当
// ポイント・ブースト・いいねはprofileStoreで管理

import { create } from 'zustand';

/**
 * 購入関連の状態
 */
interface PurchaseState {
  purchaseHistory: any[];     // 購入履歴
  isLoading: boolean;         // 購入処理中フラグ
  error: string | null;       // エラーメッセージ
}

/**
 * 購入関連のアクション
 */
interface PurchaseActions {
  setPurchaseHistory: (history: any[]) => void;
  addPurchaseHistory: (purchase: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

type PurchaseStore = PurchaseState & PurchaseActions;

/**
 * 購入ストア
 * ポイント・ブースト・いいねの残高はprofileStoreで管理
 */
export const purchaseStore = create<PurchaseStore>((set) => ({
  // 初期状態
  purchaseHistory: [],
  isLoading: false,
  error: null,

  // アクション
  setPurchaseHistory: (purchaseHistory) => set({ purchaseHistory }),
  addPurchaseHistory: (purchase) => set((state) => ({
    purchaseHistory: [purchase, ...state.purchaseHistory]
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const usePurchaseStore = () => purchaseStore();

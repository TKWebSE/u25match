// src/stores/purchaseStore.ts
// 購入・決済状態管理ストア - ポイント・ブースト・いいね購入を担当

import { create } from 'zustand';

/**
 * 購入関連の状態
 */
interface PurchaseState {
  currentPoints: number;      // 現在のポイント数
  currentBoosts: number;      // 現在のブースト数
  currentLikes: number;       // 現在のいいね数
  purchaseHistory: any[];     // 購入履歴
  isLoading: boolean;         // 購入処理中フラグ
}

/**
 * 購入関連のアクション
 */
interface PurchaseActions {
  setCurrentPoints: (points: number) => void;
  setCurrentBoosts: (boosts: number) => void;
  setCurrentLikes: (likes: number) => void;
  setPurchaseHistory: (history: any[]) => void;
  addPurchaseHistory: (purchase: any) => void;
  setLoading: (loading: boolean) => void;
  // ポイント・ブースト・いいねを消費
  consumePoints: (amount: number) => void;
  consumeBoosts: (amount: number) => void;
  consumeLikes: (amount: number) => void;
}

type PurchaseStore = PurchaseState & PurchaseActions;

/**
 * 購入ストア
 */
export const purchaseStore = create<PurchaseStore>((set) => ({
  // 初期状態
  currentPoints: 0,
  currentBoosts: 0,
  currentLikes: 0,
  purchaseHistory: [],
  isLoading: false,

  // アクション
  setCurrentPoints: (currentPoints) => set({ currentPoints }),
  setCurrentBoosts: (currentBoosts) => set({ currentBoosts }),
  setCurrentLikes: (currentLikes) => set({ currentLikes }),
  setPurchaseHistory: (purchaseHistory) => set({ purchaseHistory }),
  addPurchaseHistory: (purchase) => set((state) => ({
    purchaseHistory: [purchase, ...state.purchaseHistory]
  })),
  setLoading: (isLoading) => set({ isLoading }),

  // 消費アクション
  consumePoints: (amount) => set((state) => ({
    currentPoints: Math.max(0, state.currentPoints - amount)
  })),
  consumeBoosts: (amount) => set((state) => ({
    currentBoosts: Math.max(0, state.currentBoosts - amount)
  })),
  consumeLikes: (amount) => set((state) => ({
    currentLikes: Math.max(0, state.currentLikes - amount)
  })),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const usePurchaseStore = () => purchaseStore();

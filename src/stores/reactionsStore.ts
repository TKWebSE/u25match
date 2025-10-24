// src/stores/reactionsStore.ts
// リアクション状態管理ストア - いいね・スキップ・マッチング状態を担当

import { create } from 'zustand';


/**
 * リアクション情報（ユーザー詳細情報付き）
 */
export interface Reaction {
  id: string;
  fromUserId: string;        // リアクションした人
  toUserId: string;          // リアクションされた人
  timestamp: Date;           // リアクション時刻
  // ユーザー詳細情報
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

/**
 * リアクション関連の状態
 */
interface ReactionsState {
  likes: Reaction[];              // 受信したいいね
  footprints: Reaction[];         // 受信した足跡
  isLoading: boolean;             // リアクション処理中フラグ
}

/**
 * リアクション関連のアクション
 */
interface ReactionsActions {
  setLikes: (likes: Reaction[]) => void;
  setFootprints: (footprints: Reaction[]) => void;
  addLike: (like: Reaction) => void;
  addFootprint: (footprint: Reaction) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void; // 状態をリセット
}

type ReactionsStore = ReactionsState & ReactionsActions;

/**
 * リアクションストア
 * 受信したいいね・足跡を分けて管理
 */
export const reactionsStore = create<ReactionsStore>((set, get) => ({
  // 初期状態
  likes: [],
  footprints: [],
  isLoading: false,

  // アクション
  setLikes: (likes) => set({ likes }),
  setFootprints: (footprints) => set({ footprints }),
  addLike: (like) => set((state) => ({
    likes: [like, ...state.likes]
  })),
  addFootprint: (footprint) => set((state) => ({
    footprints: [footprint, ...state.footprints]
  })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    likes: [],
    footprints: [],
    isLoading: false,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useReactionsStore = () => reactionsStore();

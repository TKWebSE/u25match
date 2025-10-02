// src/stores/exploreStore.ts
// 探索状態管理ストア

import { create } from 'zustand';

/**
 * 探索関連の状態
 */
interface ExploreState {
  users: any[];             // ユーザー一覧
  currentUser: any | null;  // 現在表示中のユーザー
  filters: any;             // 検索フィルター
  isLoading: boolean;       // ローディング状態
  hasMore: boolean;         // さらに読み込み可能か
}

/**
 * 探索関連のアクション
 */
interface ExploreActions {
  setUsers: (users: any[]) => void;
  addUsers: (users: any[]) => void;
  setCurrentUser: (user: any | null) => void;
  setFilters: (filters: any) => void;
  setLoading: (loading: boolean) => void;
  setHasMore: (hasMore: boolean) => void;
  reset: () => void;
}

type ExploreStore = ExploreState & ExploreActions;

/**
 * 探索ストア
 */
export const exploreStore = create<ExploreStore>((set) => ({
  // 初期状態
  users: [],
  currentUser: null,
  filters: {},
  isLoading: false,
  hasMore: true,

  // アクション
  setUsers: (users) => set({ users }),
  addUsers: (users) => set((state) => ({
    users: [...state.users, ...users]
  })),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),
  reset: () => set({
    users: [],
    currentUser: null,
    filters: {},
    isLoading: false,
    hasMore: true,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useExploreStore = () => exploreStore();

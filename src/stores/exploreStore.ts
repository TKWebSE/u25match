// src/stores/exploreStore.ts
// 探索状態管理ストア

import { getUserList } from '@usecases/explore';
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
  activeTab: 'recommended' | 'beginner' | 'online' | 'nearby'; // アクティブなタブ
  currentPage: number;      // 現在のページ番号
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
  setActiveTab: (tab: 'recommended' | 'beginner' | 'online' | 'nearby') => void;
  setCurrentPage: (page: number) => void;
  switchTab: (tab: 'recommended' | 'beginner' | 'online' | 'nearby') => void;
  reset: () => void;
}

type ExploreStore = ExploreState & ExploreActions;

/**
 * 探索ストア
 */
export const exploreStore = create<ExploreStore>((set, get) => ({
  // 初期状態
  users: [],
  currentUser: null,
  filters: {},
  isLoading: false,
  hasMore: true,
  activeTab: 'recommended',
  currentPage: 1,

  // アクション
  setUsers: (users) => set({ users }),
  addUsers: (users) => set((state) => ({
    users: [...state.users, ...users]
  })),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  switchTab: async (tab) => {
    set({ activeTab: tab, currentPage: 1 });
    // タブ切り替え時にデータ取得
    try {
      await getUserList({ page: 1, limit: 30, filters: { tab } });
    } catch (error) {
      console.error('タブ切り替え時のデータ取得エラー:', error);
    }
  },
  reset: () => set({
    users: [],
    currentUser: null,
    filters: {},
    isLoading: false,
    hasMore: true,
    activeTab: 'recommended',
    currentPage: 1,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useExploreStore = () => exploreStore();

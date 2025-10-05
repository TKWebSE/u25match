// src/stores/exploreStore.ts
// 探索状態管理ストア

import { ExploreTabType } from '@constants/exploreTabs';
import { create } from 'zustand';

/**
 * 探索関連の状態
 */
interface ExploreState {
  isLoading: boolean;       // ローディング状態
  activeTab: ExploreTabType; // アクティブなタブ
  // 4タブ分のデータキャッシュ
  tabUsers: {
    recommended?: any[];
    beginner?: any[];
    online?: any[];
    nearby?: any[];
  };
}

/**
 * 探索関連のアクション
 */
interface ExploreActions {
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: ExploreTabType) => void;
  setTabUsers: (tab: ExploreTabType, users: any[]) => void;
  switchTab: (tab: ExploreTabType) => void;
  reset: () => void;
}

type ExploreStore = ExploreState & ExploreActions;

/**
 * 探索ストア
 */
export const exploreStore = create<ExploreStore>((set, get) => ({
  // 初期状態
  isLoading: false,
  activeTab: 'recommended',
  tabUsers: {},

  // アクション
  setLoading: (isLoading) => set({ isLoading }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setTabUsers: (tab, users) => set((state) => ({
    tabUsers: { ...state.tabUsers, [tab]: users }
  })),
  switchTab: (tab) => {
    set({ activeTab: tab });
  },
  reset: () => set({
    isLoading: false,
    activeTab: 'recommended',
    tabUsers: {},
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useExploreStore = () => exploreStore();

// src/stores/reactionsStore.ts
// リアクション状態管理ストア - いいね・スキップ・マッチング状態を担当

import { create } from 'zustand';

/**
 * リアクションの種類
 */
export type ReactionType = 'like' | 'footprint';

/**
 * リアクション情報
 */
export interface Reaction {
  id: string;
  fromUserId: string;        // リアクションした人
  toUserId: string;          // リアクションされた人
  type: ReactionType;        // リアクションの種類
  timestamp: Date;           // リアクション時刻
}

/**
 * リアクション関連の状態
 */
interface ReactionsState {
  receivedReactions: Reaction[];     // 受信したリアクション一覧（いいね・足跡）
  isLoading: boolean;                // リアクション処理中フラグ
}

/**
 * リアクション関連のアクション
 */
interface ReactionsActions {
  setReceivedReactions: (reactions: Reaction[]) => void;
  addReceivedReaction: (reaction: Reaction) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void; // 状態をリセット
}

type ReactionsStore = ReactionsState & ReactionsActions;

/**
 * リアクションストア
 * 受信したいいね・足跡を一時的にキャッシュ
 */
export const reactionsStore = create<ReactionsStore>((set, get) => ({
  // 初期状態
  receivedReactions: [],
  isLoading: false,

  // アクション
  setReceivedReactions: (receivedReactions) => set({ receivedReactions }),
  addReceivedReaction: (reaction) => set((state) => ({
    receivedReactions: [reaction, ...state.receivedReactions]
  })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    receivedReactions: [],
    isLoading: false,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useReactionsStore = () => reactionsStore();

// src/stores/reactionsStore.ts
// リアクション状態管理ストア - いいね・スキップ・マッチング状態を担当

import { create } from 'zustand';

/**
 * リアクションの種類
 */
export type ReactionType = 'like' | 'skip' | 'super_like';

/**
 * リアクション情報
 */
export interface Reaction {
  id: string;
  fromUserId: string;        // リアクションした人
  toUserId: string;          // リアクションされた人
  type: ReactionType;        // リアクションの種類
  timestamp: Date;           // リアクション時刻
  isMatched?: boolean;       // マッチしたかどうか
}

/**
 * マッチ情報
 */
export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  matchedAt: Date;
  isActive: boolean;         // マッチがアクティブかどうか
  lastActivity?: Date;       // 最終活動日時
}

/**
 * リアクション関連の状態
 */
interface ReactionsState {
  sentReactions: Reaction[];         // 送信したリアクション一覧
  receivedReactions: Reaction[];     // 受信したリアクション一覧
  matches: Match[];                  // マッチ一覧
  dailyLikesUsed: number;           // 本日使用したいいね数
  dailyLikesLimit: number;          // 本日のいいね上限
  superLikesUsed: number;           // 使用したスーパーいいね数
  superLikesLimit: number;          // スーパーいいね上限
  isLoading: boolean;               // リアクション処理中フラグ
}

/**
 * リアクション関連のアクション
 */
interface ReactionsActions {
  setSentReactions: (reactions: Reaction[]) => void;
  setReceivedReactions: (reactions: Reaction[]) => void;
  addSentReaction: (reaction: Reaction) => void;
  addReceivedReaction: (reaction: Reaction) => void;
  setMatches: (matches: Match[]) => void;
  addMatch: (match: Match) => void;
  removeMatch: (matchId: string) => void;
  setDailyLikesUsed: (used: number) => void;
  setDailyLikesLimit: (limit: number) => void;
  setSuperLikesUsed: (used: number) => void;
  setSuperLikesLimit: (limit: number) => void;
  incrementDailyLikes: () => void;
  incrementSuperLikes: () => void;
  setLoading: (loading: boolean) => void;
  reset: () => void; // 状態をリセット
  // ヘルパー関数
  canSendLike: () => boolean;
  canSendSuperLike: () => boolean;
  getRemainingLikes: () => number;
  getRemaingSuperLikes: () => number;
}

type ReactionsStore = ReactionsState & ReactionsActions;

/**
 * リアクションストア
 */
export const reactionsStore = create<ReactionsStore>((set, get) => ({
  // 初期状態
  sentReactions: [],
  receivedReactions: [],
  matches: [],
  dailyLikesUsed: 0,
  dailyLikesLimit: 10,      // 無料ユーザーは1日10いいね
  superLikesUsed: 0,
  superLikesLimit: 1,       // 1日1スーパーいいね
  isLoading: false,

  // アクション
  setSentReactions: (sentReactions) => set({ sentReactions }),
  setReceivedReactions: (receivedReactions) => set({ receivedReactions }),
  addSentReaction: (reaction) => set((state) => ({
    sentReactions: [reaction, ...state.sentReactions]
  })),
  addReceivedReaction: (reaction) => set((state) => ({
    receivedReactions: [reaction, ...state.receivedReactions]
  })),
  setMatches: (matches) => set({ matches }),
  addMatch: (match) => set((state) => ({
    matches: [match, ...state.matches]
  })),
  removeMatch: (matchId) => set((state) => ({
    matches: state.matches.filter(m => m.id !== matchId)
  })),
  setDailyLikesUsed: (dailyLikesUsed) => set({ dailyLikesUsed }),
  setDailyLikesLimit: (dailyLikesLimit) => set({ dailyLikesLimit }),
  setSuperLikesUsed: (superLikesUsed) => set({ superLikesUsed }),
  setSuperLikesLimit: (superLikesLimit) => set({ superLikesLimit }),
  incrementDailyLikes: () => set((state) => ({
    dailyLikesUsed: state.dailyLikesUsed + 1
  })),
  incrementSuperLikes: () => set((state) => ({
    superLikesUsed: state.superLikesUsed + 1
  })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    sentReactions: [],
    receivedReactions: [],
    matches: [],
    dailyLikesUsed: 0,
    dailyLikesLimit: 10,
    superLikesUsed: 0,
    superLikesLimit: 1,
    isLoading: false,
  }),

  // ヘルパー関数
  canSendLike: () => {
    const state = get();
    return state.dailyLikesUsed < state.dailyLikesLimit;
  },
  canSendSuperLike: () => {
    const state = get();
    return state.superLikesUsed < state.superLikesLimit;
  },
  getRemainingLikes: () => {
    const state = get();
    return Math.max(0, state.dailyLikesLimit - state.dailyLikesUsed);
  },
  getRemaingSuperLikes: () => {
    const state = get();
    return Math.max(0, state.superLikesLimit - state.superLikesUsed);
  },
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useReactionsStore = () => reactionsStore();

// src/services/main/reactions/types.ts
// 🎯 リアクションサービスの型定義 - 契約書

export type ReactionType = 'like' | 'super_like' | 'pass';

export interface Reaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: ReactionType;
  timestamp: Date;
  message?: string;
}

export interface ReactionsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * 🎯 リアクションサービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface ReactionsService {
  // リアクションを送信
  sendReaction(targetUserId: string): Promise<ReactionsResponse>;

  // スーパーライクを送信
  sendSuperLike(targetUserId: string): Promise<ReactionsResponse>;

  // リアクション履歴を取得
  getReactions(userId: string): Promise<ReactionsResponse>;
} 

// src/services/main/reactions/types.ts
// 🎯 リアクションサービスの型定義 - 契約書


export interface Reaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  timestamp: Date;
  message?: string;
}

export interface ReactionsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * リアクション取得のレスポンス
 */
export interface GetReactionsResponse {
  reactions: {
    likes: Reaction[];           // 受信したいいね
    footprints: Reaction[];      // 受信した足跡
  };
}

/**
 * 🎯 リアクションサービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface ReactionsService {
  // 足あとを残す
  leaveFootprint(targetUserId: string): Promise<ReactionsResponse>;

  // リアクション履歴を取得（受信したいいね・足跡）
  getReactions(userId: string): Promise<GetReactionsResponse>;
} 

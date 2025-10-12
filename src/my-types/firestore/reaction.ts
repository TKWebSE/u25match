// src/my-types/firestore/reaction.ts
// Firestoreのリアクション（いいね）関連の型定義

/**
 * 送信したいいねの記録
 * 
 * 保存場所: users/{currentUserId}/sentLikes/{targetUserId}
 * 
 * 用途:
 * - いいね履歴画面（自分が送ったいいね一覧）
 * - いいね済みチェック（重複防止）
 */
export interface FirestoreSentLike {
  toUserId: string;             // いいねを送った相手のID
  type: 'like' | 'super_like';  // リアクションの種類
  timestamp: Date;              // 送信日時
  isMatched?: boolean;          // マッチしたかどうか
}

/**
 * 受信したいいねの記録
 * 
 * 保存場所: users/{currentUserId}/receivedLikes/{fromUserId}
 * 
 * 用途:
 * - リアクション画面（自分がもらったいいね一覧）
 * - マッチング判定
 */
export interface FirestoreReceivedLike {
  fromUserId: string;           // いいねを送ってきた相手のID
  type: 'like' | 'super_like';  // リアクションの種類
  timestamp: Date;              // 受信日時
  isMatched?: boolean;          // マッチしたかどうか
}


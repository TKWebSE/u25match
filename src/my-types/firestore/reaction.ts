// src/my-types/firestore/reaction.ts
// Firestoreの reactionsコレクション または likesサブコレクション の型定義

/**
 * Firestoreに保存されるリアクション情報
 * 
 * 保存場所:
 * - users/{fromUserId}/likes/{toUserId} (サブコレクション形式)
 * - または reactions/{reactionId} (単一コレクション形式)
 */
export interface FirestoreReaction {
  fromUserId: string;           // いいねを送った人
  toUserId: string;             // いいねを受け取った人
  type: 'like' | 'super_like' | 'skip';  // リアクションの種類
  timestamp: Date;              // リアクション時刻
  isMatched?: boolean;          // マッチしたかどうか
}


// src/my-types/firestore/viewHistory.ts
// Firestoreの viewHistoryコレクション または viewHistoryサブコレクション の型定義

/**
 * Firestoreに保存される閲覧履歴情報
 * 
 * 保存場所:
 * - users/{viewerId}/viewHistory/{viewedUserId} (サブコレクション形式)
 * - または viewHistory/{recordId} (単一コレクション形式)
 */
export interface FirestoreViewHistory {
  viewerId: string;        // 閲覧した人
  viewedUserId: string;    // 閲覧された人
  viewedAt: Date;          // 閲覧日時
}


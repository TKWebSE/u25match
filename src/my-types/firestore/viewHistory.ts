// src/my-types/firestore/viewHistory.ts
// Firestoreの閲覧履歴の型定義

/**
 * Firestoreに保存される閲覧履歴情報
 * 
 * 保存場所: viewHistory/{recordId}
 * 
 * 用途:
 * - プロフィール閲覧時の記録
 * - 足跡機能（誰が見たか）
 * 
 * 注意:
 * - viewHistoryStore でキャッシュされ、一定数たまったらバッチ保存される
 * - キャッシュ用の型は ViewHistoryCache（number型のタイムスタンプ）
 */
export interface FirestoreViewHistory {
  viewerId: string;        // 閲覧した人のID
  viewedUserId: string;    // 閲覧された人のID
  viewedAt: Date;          // 閲覧日時（Firestore Timestamp）
}


// src/services/viewHistory/types.ts
// 閲覧履歴サービスの型定義

/**
 * 閲覧履歴のローカルキャッシュ用型
 * viewedAtはミリ秒のタイムスタンプ（number）
 */
export interface ViewHistoryCache {
  viewerId: string;        // 閲覧したユーザーID
  viewedUserId: string;    // 閲覧されたユーザーID
  viewedAt: number;        // 閲覧日時（ミリ秒タイムスタンプ）
}

export interface ViewHistoryService {
  saveBatch(views: ViewHistoryCache[]): Promise<void>;
}


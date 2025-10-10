// src/services/viewHistory/types.ts
// 閲覧履歴サービスの型定義

export interface ViewedProfile {
  viewerId: string;   // 閲覧したユーザーID
  targetId: string;   // 閲覧されたユーザーID
  viewedAt: number;   // 閲覧日時
}

export interface ViewHistoryService {
  saveBatch(views: ViewedProfile[]): Promise<void>;
}


// src/types/search.ts
// 検索画面関連の型定義

/**
 * 検索結果・一覧表示用のユーザー型
 * 
 * この型を使う理由：
 * - 一覧表示では詳細情報（details, tags等）は不要
 * - 軽量なデータ構造でパフォーマンスを向上
 * - 検索APIが返す最小限のフィールドのみ
 * 
 * 完全な情報が必要な場合は FirestoreUser を使用してください
 */
export interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

export interface SearchCategory {
  key: string;
  title: string;
  icon: string;
  isPremiumRequired?: boolean; // プレミアム会員限定かどうか
}

export type ReactionTabType = 'likes' | 'footprints';


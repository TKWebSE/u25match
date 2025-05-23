// src/types/search.ts
// 検索画面関連の型定義

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
}

export type ReactionTabType = 'likes' | 'footprints';

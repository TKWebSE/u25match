// src/components/search/common/types.ts
// 検索画面共通の型定義

export interface User {
  name: string;
  gender: 'male' | 'female' | 'other'; // 性別
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

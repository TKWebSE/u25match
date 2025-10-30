// src/services/search/types.ts
// 🔍 検索サービスの型定義
import { User } from '@my-types/app/search';

export interface SearchService {
  // カテゴリに基づいてユーザーを取得
  getUsersByCategory(categoryKey: string): Promise<User[]>;
}



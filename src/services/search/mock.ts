// src/services/search/mock.ts
// 🎭 検索サービス（モック実装）
import { getUsersByCategory as getUsersByCategoryMock } from '@mock/searchMock';
import { User } from '@my-types/app/search';
import { SearchService } from './types';

export class MockSearchService implements SearchService {
  /**
   * 指定カテゴリのユーザー一覧をモックから取得
   * 
   * @param categoryKey 取得対象のカテゴリキー（例: 'student', 'working', 'online'）
   * @returns モックデータ由来のユーザー配列
   */
  async getUsersByCategory(categoryKey: string): Promise<User[]> {
    return getUsersByCategoryMock(categoryKey) as User[];
  }
}



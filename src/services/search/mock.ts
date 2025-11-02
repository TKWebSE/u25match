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
   * @param currentUserId 現在のユーザーID（検索結果から自分を除外するため）
   * @returns モックデータ由来のユーザー配列
   */
  async getUsersByCategory(categoryKey: string, currentUserId: string): Promise<User[]> {
    return getUsersByCategoryMock(categoryKey, currentUserId) as User[];
  }
}



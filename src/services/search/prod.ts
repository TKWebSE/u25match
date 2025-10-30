// src/services/search/prod.ts
// 🔥 検索サービス（本番実装: Firebase等）
import { User } from '@my-types/app/search';
import { SearchService } from './types';

export class ProdSearchService implements SearchService {
  /**
   * 指定カテゴリのユーザー一覧を本番環境（Firebase等）から取得
   *
   * @param categoryKey 取得対象のカテゴリキー（例: 'student', 'working', 'online'）
   * @returns 取得したユーザー配列（未実装のため空配列を返却中）
   */
  async getUsersByCategory(categoryKey: string): Promise<User[]> {
    // TODO: Firebase 等からカテゴリ別ユーザーを取得する実装に置換
    return [] as User[];
  }
}



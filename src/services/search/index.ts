// src/services/search/index.ts
// 🚪 検索サービスのエントリーポイント
import { createSearchService } from './factory';

const searchService = createSearchService();

/**
 * カテゴリキーでユーザー一覧を取得（サービス層に委譲）
 * - mock/firebaseの切替はサービス内で実施
 */
export const fetchUsersByCategory = (categoryKey: string) =>
  searchService.getUsersByCategory(categoryKey);

export type { SearchService } from './types';



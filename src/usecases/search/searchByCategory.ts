// src/usecases/search/searchByCategory.ts
// カテゴリ検索のユースケース - サービスを呼び出すだけに責務を限定

import { User } from '@my-types/app/search';
import { serviceRegistry } from '@services/core/ServiceRegistry';

/**
 * カテゴリに基づいてユーザーを検索するユースケース
 * - サービス層に委譲（mock/firebase の切替はサービス内で実施）
 *
 * @param categoryKey - 検索するカテゴリキー（例: 'student', 'working', 'online'）
 * @returns 該当カテゴリのユーザーリスト
 */
export const searchByCategory = async (categoryKey: string): Promise<User[]> => {
  try {
    return await serviceRegistry.search.getUsersByCategory(categoryKey);
  } catch (error: any) {
    throw new Error(`カテゴリ検索に失敗しました: ${error.message}`);
  }
};


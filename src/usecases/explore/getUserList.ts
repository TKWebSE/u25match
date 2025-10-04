// src/usecases/explore/getUserList.ts
// ユーザー一覧取得のユースケース - 探索機能でユーザー検索・一覧表示を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { exploreStore } from '@stores/exploreStore';

/**
 * ユーザー一覧取得に必要なデータ
 */
export interface GetUserListData {
  limit?: number;    // 取得件数（デフォルト: 30）
  filters?: any;     // 検索フィルター（年齢・地域・趣味など）
}

/**
 * ユーザー一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でユーザー一覧取得
 * 3. ストアに反映
 * 4. 結果をUIに返却
 * 
 * @param data - 取得データ（件数・フィルター）
 * @returns 取得成功フラグ
 */
export const getUserList = async (data: GetUserListData = {}): Promise<boolean> => {
  const { limit = 30, filters = {} } = data;
  const exploreStoreState = exploreStore.getState();

  try {
    // ローディング開始
    exploreStoreState.setLoading(true);

    // サービス層でユーザー一覧取得
    const result = await serviceRegistry.explore.getUserList({
      limit,
      filters,
    });

    // ストアに反映
    exploreStoreState.setUsers(result.users);
    exploreStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    exploreStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'ユーザー一覧の取得に失敗しました');
  }
};

// src/usecases/explore/getUserList.ts
// ユーザー一覧取得のユースケース - 探索機能でユーザー検索・一覧表示を担当

import { ExploreTabType } from '@constants/exploreTabs';
import { serviceRegistry } from '@services/core/ServiceRegistry';
import { exploreStore } from '@stores/exploreStore';

/**
 * ユーザー一覧取得に必要なデータ
 */
export interface GetUserListData {
  tab: ExploreTabType; // タブ情報（recommended, beginner, online, nearby）
}

/**
 * ユーザー一覧を取得するユースケース（キャッシュ対応）
 * 
 * フロー:
 * 1. キャッシュチェック（データがあれば即座に返却）
 * 2. ローディング開始
 * 3. サービス層でユーザー一覧取得
 * 4. ストアに反映（現在表示 + キャッシュ保存）
 * 5. 結果をUIに返却
 * 
 * @param data - 取得データ（タブ・件数）
 * @returns 取得成功フラグ
 */
export const getUserList = async (data: GetUserListData): Promise<boolean> => {
  const { tab } = data;
  const exploreStoreState = exploreStore.getState();

  // キャッシュチェック
  if (exploreStoreState.tabUsers[tab]) {
    // キャッシュがあれば即座に返却
    return true;
  }

  try {
    // ローディング開始
    exploreStoreState.setLoading(true);

    // サービス層でユーザー一覧取得（limit固定30、タブ別フィルター適用）
    const result = await serviceRegistry.explore.getUserList({
      limit: 30,
      filters: { tab },
    });

    // タブのデータをキャッシュに保存
    exploreStoreState.setTabUsers(tab as any, result.users);

    exploreStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    exploreStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'ユーザー一覧の取得に失敗しました');
  }
};

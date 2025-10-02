// src/usecases/explore/getUserList.ts
// ユーザー一覧取得のユースケース - 探索機能でユーザー検索・一覧表示を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { exploreStore } from '@stores/exploreStore';

/**
 * ユーザー一覧取得に必要なデータ
 */
export interface GetUserListData {
  page?: number;     // ページ番号（デフォルト: 1）
  limit?: number;    // 1ページあたりの取得件数（デフォルト: 20）
  filters?: any;     // 検索フィルター（年齢・地域・趣味など）
}

/**
 * ユーザー一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でユーザー一覧取得
 * 3. ページング処理（初回 or 追加読み込み）
 * 4. ストアに反映
 * 5. 結果をUIに返却
 * 
 * @param data - 取得データ（ページ・件数・フィルター）
 * @returns 取得成功フラグ
 */
export const getUserList = async (data: GetUserListData = {}): Promise<boolean> => {
  const { page = 1, limit = 20, filters = {} } = data;
  const exploreStoreState = exploreStore.getState();

  try {
    // ローディング開始
    exploreStoreState.setLoading(true);

    // サービス層でユーザー一覧取得
    const result = await serviceRegistry.explore.getUserList({
      page,
      limit,
      filters,
    });

    // ストアに反映（ページングに応じて処理を分岐）
    if (page === 1) {
      // 初回取得時は既存データを置き換え
      exploreStoreState.setUsers(result.users);
    } else {
      // 追加読み込み時は既存データに追加
      exploreStoreState.addUsers(result.users);
    }

    // さらに読み込み可能かとローディング状態を更新
    exploreStoreState.setHasMore(result.hasMore);
    exploreStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    exploreStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'ユーザー一覧の取得に失敗しました');
  }
};

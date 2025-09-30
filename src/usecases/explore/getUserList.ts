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
 * ユーザー一覧取得処理の結果
 */
export interface GetUserListResult {
  success: boolean;    // 取得成功フラグ
  error?: string;      // エラーメッセージ（失敗時のみ）
}

/**
 * ユーザー一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でユーザー一覧取得
 * 3. ページング処理（初回 or 追加読み込み）
 * 4. ストアに反映
 * 5. 結果をUIに返却
 * 
 * @param data - 取得データ（ページ・件数・フィルター）
 * @returns 取得結果（成功/失敗とエラーメッセージ）
 */
export const getUserList = async (data: GetUserListData = {}): Promise<GetUserListResult> => {
  const { page = 1, limit = 20, filters = {} } = data;
  const exploreStoreState = exploreStore.getState();

  try {
    // ローディング開始・エラークリア
    exploreStoreState.setLoading(true);
    exploreStoreState.clearError();

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

    return { success: true };

  } catch (error: any) {
    console.error('ユーザー一覧取得エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    exploreStoreState.setLoading(false);
    exploreStoreState.setError(error.message || 'ユーザー一覧の取得に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'ユーザー一覧の取得に失敗しました'
    };
  }
};

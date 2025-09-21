// src/usecases/auth/logoutUser.ts
// ログアウトのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface LogoutResult {
  success: boolean;
  error?: string;
}

/**
 * ユーザーログアウトのユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でFirebaseログアウト
 * 3. ストアをクリア
 * 4. 結果をUIに返却
 */
export const logoutUser = async (): Promise<LogoutResult> => {
  try {
    // ローディング開始
    authStore.getState().setLoading(true);

    // サービス層でFirebaseログアウト
    await serviceRegistry.auth.logOut();

    // ストアをクリア（監視システムも自動でクリアしてくれるが、明示的に実行）
    authStore.getState().logout();
    authStore.getState().setLoading(false);

    return { success: true };

  } catch (error: any) {
    console.error('ログアウトエラー:', error);

    // エラー時
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'ログアウトに失敗しました');

    return {
      success: false,
      error: error.message || 'ログアウトに失敗しました'
    };
  }
};

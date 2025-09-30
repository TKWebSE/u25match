// src/usecases/auth/logoutUser.ts
// ログアウトのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

/**
 * ユーザーログアウトのユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でFirebaseログアウト
 * 3. ストアをクリア
 * 4. 成功時はtrueを返し、エラー時はスロー
 */
export const logoutUser = async (): Promise<boolean> => {
  const authStoreState = authStore.getState();

  try {
    // ローディング開始
    authStoreState.setLoading(true);

    // サービス層でFirebaseログアウト
    await serviceRegistry.auth.logOut();

    // ストアをクリア（監視システムも自動でクリアしてくれるが、明示的に実行）
    authStoreState.logout();
    authStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時
    authStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'ログアウトに失敗しました');
  }
};

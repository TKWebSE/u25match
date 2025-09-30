// src/usecases/auth/deleteAccount.ts
// アカウント削除のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface DeleteAccountData {
  password: string; // 本人確認用
}

/**
 * アカウント削除のユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でFirebaseアカウント削除
 * 3. プロフィール情報も削除
 * 4. ストアをクリア
 * 5. 成功時はtrueを返し、エラー時はスロー
 */
export const deleteAccount = async (data: DeleteAccountData): Promise<boolean> => {
  const { password } = data;
  const authStoreState = authStore.getState();

  try {
    // ローディング開始
    authStoreState.setLoading(true);

    // 本人確認（再認証）
    await serviceRegistry.auth.reauthenticate(password);

    // プロフィール情報はFirebaseアカウント削除時に自動削除される

    // Firebaseアカウント削除
    await serviceRegistry.auth.deleteAccount();

    // ストアをクリア
    authStoreState.deleteAccount();
    authStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時
    authStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'アカウント削除に失敗しました');
  }
};

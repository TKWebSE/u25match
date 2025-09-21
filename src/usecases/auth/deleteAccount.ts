// src/usecases/auth/deleteAccount.ts
// アカウント削除のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface DeleteAccountData {
  password: string; // 本人確認用
}

export interface DeleteAccountResult {
  success: boolean;
  error?: string;
}

/**
 * アカウント削除のユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でFirebaseアカウント削除
 * 3. プロフィール情報も削除
 * 4. ストアをクリア
 * 5. 結果をUIに返却
 */
export const deleteAccount = async (data: DeleteAccountData): Promise<DeleteAccountResult> => {
  const { password } = data;

  try {
    // ローディング開始
    authStore.getState().setLoading(true);

    // 本人確認（再認証）
    const currentUser = authStore.getState().user;
    if (!currentUser?.email) {
      throw new Error('ユーザー情報が取得できません');
    }

    // サービス層で再認証
    await serviceRegistry.auth.logIn(currentUser.email, password);

    // プロフィール情報を削除
    if (currentUser.uid) {
      await serviceRegistry.profileDetail.deleteProfile(currentUser.uid);
    }

    // Firebaseアカウント削除
    await serviceRegistry.auth.deleteAccount();

    // ストアをクリア
    authStore.getState().logout();
    authStore.getState().setLoading(false);

    return { success: true };

  } catch (error: any) {
    console.error('アカウント削除エラー:', error);

    // エラー時
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'アカウント削除に失敗しました');

    return {
      success: false,
      error: error.message || 'アカウント削除に失敗しました'
    };
  }
};

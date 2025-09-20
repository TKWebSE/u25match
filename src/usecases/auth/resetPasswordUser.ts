// src/usecases/auth/resetPasswordUser.ts
// パスワードリセットのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface ResetPasswordData {
  email: string;
}

export interface ResetPasswordResult {
  success: boolean;
  error?: string;
}

/**
 * パスワードリセットのユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. サービス層でFirebaseパスワードリセットメール送信
 * 3. 結果をUIに返却
 * 
 * @param data - リセットデータ（メールアドレス）
 * @returns リセット結果（成功/失敗とエラーメッセージ）
 */
export const resetPasswordUser = async (data: ResetPasswordData): Promise<ResetPasswordResult> => {
  const { email } = data;

  try {
    // ローディング開始（UIにスピナー表示）
    authStore.getState().setLoading(true);

    // サービス層でFirebaseパスワードリセットメール送信
    await serviceRegistry.auth.resetPassword(email);

    // 成功時
    authStore.getState().setLoading(false);
    authStore.getState().setError(null); // エラーをクリア

    return { success: true };

  } catch (error: any) {
    console.error('パスワードリセットエラー:', error);

    // エラー時
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'パスワードリセットに失敗しました');

    return {
      success: false,
      error: error.message || 'パスワードリセットに失敗しました'
    };
  }
};

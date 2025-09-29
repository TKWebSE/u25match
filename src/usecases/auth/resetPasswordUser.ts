// src/usecases/auth/resetPasswordUser.ts
// パスワードリセットのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface ResetPasswordData {
  email: string;
}

/**
 * パスワードリセットのユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. サービス層でFirebaseパスワードリセットメール送信
 * @param data - リセットデータ（メールアドレス）
 * @returns 成功時はtrue、エラー時はスロー
 */
export const resetPasswordUser = async (data: ResetPasswordData): Promise<boolean> => {
  const { email } = data;

  try {
    // ローディング開始（UIにスピナー表示）
    authStore.getState().setLoading(true);

    // サービス層でFirebaseパスワードリセットメール送信
    await serviceRegistry.auth.resetPassword(email);

    // 成功時
    authStore.getState().setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時
    authStore.getState().setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'パスワードリセットに失敗しました');
  }
};

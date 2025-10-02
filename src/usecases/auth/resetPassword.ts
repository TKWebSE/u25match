// src/usecases/auth/resetPassword.ts
// パスワードリセットユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { validatePasswordCharacterTypes, validatePasswordLength, validatePasswordMatch } from '@utils/validation/authValidation';

export interface ResetPasswordData {
  oobCode: string | undefined;
  newPassword: string;
  confirmPassword: string;
}

/**
 * パスワードリセットユースケース
 * 
 * フロー:
 * 1. oobCodeの存在チェック
 * 2. パスワードバリデーション（長さ、文字種、一致確認）
 * 3. ローディング状態を開始
 * 4. サービス層でFirebaseパスワード更新実行
 * @param data - パスワード更新データ（oobCode、newPassword、confirmPassword）
 * @returns 成功時はtrue、エラー時はスロー
 */
export const resetPassword = async (data: ResetPasswordData): Promise<boolean> => {
  const { oobCode, newPassword, confirmPassword } = data;
  const authStoreState = authStore.getState();

  try {
    // 入力値の存在チェック
    if (!oobCode) {
      throw new Error('無効なリセットリンクです');
    }

    // バリデーション（utils側でエラーをスロー）
    validatePasswordLength(newPassword);
    validatePasswordCharacterTypes(newPassword);
    validatePasswordMatch(newPassword, confirmPassword);

    // ローディング開始（UIにスピナー表示）
    authStoreState.setLoading(true);

    // サービス層でFirebaseパスワード更新実行
    await serviceRegistry.auth.updatePassword(oobCode, newPassword);

    // 成功時
    authStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時
    authStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'パスワードの更新に失敗しました');
  }
};



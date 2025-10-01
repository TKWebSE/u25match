// src/usecases/auth/updatePasswordWithReset.ts
// パスワードリセット後の新しいパスワード設定ユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface UpdatePasswordData {
  oobCode: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * パスワードリセット後の新しいパスワード設定ユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. パスワード確認の一致チェック
 * 3. パスワード強度バリデーション
 * 4. サービス層でFirebaseパスワード更新実行
 * @param data - パスワード更新データ（oobCode、newPassword、confirmPassword）
 * @returns 成功時はtrue、エラー時はスロー
 */
export const updatePasswordWithReset = async (data: UpdatePasswordData): Promise<boolean> => {
  const { oobCode, newPassword, confirmPassword } = data;
  const authStoreState = authStore.getState();

  try {
    // ローディング開始（UIにスピナー表示）
    authStoreState.setLoading(true);

    // パスワード確認の一致チェック
    if (newPassword !== confirmPassword) {
      throw new Error('パスワードが一致しません');
    }

    // パスワード強度バリデーション
    if (newPassword.length < 6) {
      throw new Error('パスワードは6文字以上で入力してください');
    }

    if (newPassword.length > 32) {
      throw new Error('パスワードは32文字以内で入力してください');
    }

    // 英字と数字の組み合わせチェック
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    if (!hasLetter || !hasNumber) {
      throw new Error('パスワードは英字と数字を含む必要があります');
    }

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


// src/usecases/auth/forgotPasswordUser.ts
// パスワードを忘れた場合のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { validateEmailFormat } from '@utils/validation/authValidation';

export interface ForgotPasswordData {
  email: string;
}

/**
 * パスワードを忘れた場合のユースケース
 * 
 * フロー:
 * 1. 入力値の存在チェック
 * 2. メールアドレスのバリデーション
 * 3. ローディング状態を開始
 * 4. サービス層でFirebaseパスワードリセットメール送信
 * @param data - リセットデータ（メールアドレス）
 * @returns 成功時はtrue、エラー時はスロー
 */
export const forgotPasswordUser = async (data: ForgotPasswordData): Promise<boolean> => {
  const { email } = data;
  const authStoreState = authStore.getState();

  try {
    // 入力値の存在チェック
    if (!email) {
      throw new Error('メールアドレスを入力してください');
    }

    // バリデーション（utils側でエラーをスロー）
    validateEmailFormat(email);

    // ローディング開始（UIにスピナー表示）
    authStoreState.setLoading(true);

    // サービス層でFirebaseパスワードリセットメール送信
    await serviceRegistry.auth.forgotPassword(email);

    // 成功時
    authStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時
    authStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'パスワードリセットに失敗しました');
  }
};

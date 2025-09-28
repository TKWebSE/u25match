// src/usecases/auth/signUpUser.ts
// サインアップのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import {
  validateEmailFormat,
  validatePasswordCharacterTypes,
  validatePasswordLength,
  validatePasswordMatch,
  validatePasswordNoSpaces
} from '@utils/validation/authValidation';

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResult {
  success: boolean;
  error?: string;
}

/**
 * ユーザーサインアップのユースケース
 * バリデーション → アカウント作成 → ストア更新
 * プロフィール初期化は認証後のコールバックで実行される
 */
export const signUpUser = async (data: SignUpData): Promise<SignUpResult> => {
  const { email, password, confirmPassword } = data;

  try {
    // バリデーション（utils側でエラーをスロー）
    validateEmailFormat(email);
    validatePasswordLength(password);
    validatePasswordNoSpaces(password);
    validatePasswordCharacterTypes(password);
    validatePasswordMatch(password, confirmPassword);

    // ローディング開始
    authStore.getState().setLoading(true);

    // Firebase認証でアカウント作成
    await serviceRegistry.auth.signUp(email, password);

    // ストア更新は監視システムに任せる（重複処理を避ける）
    // プロフィール初期化も認証後のコールバックで実行される

    return { success: true };

  } catch (error: any) {
    console.error('サインアップエラー:', error);

    // エラー時のみ手動でストア更新
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'アカウント作成に失敗しました');

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'アカウント作成に失敗しました');
  }
};

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

/**
 * ユーザーサインアップのユースケース
 * バリデーション → アカウント作成 → ストア更新
 * プロフィール初期化は認証後のコールバックで実行される
 */
export const signUpUser = async (data: SignUpData): Promise<boolean> => {
  const { email, password, confirmPassword } = data;
  const authStoreState = authStore.getState();

  try {
    // バリデーション（utils側でエラーをスロー）
    validateEmailFormat(email);
    validatePasswordLength(password);
    validatePasswordNoSpaces(password);
    validatePasswordCharacterTypes(password);
    validatePasswordMatch(password, confirmPassword);

    // ローディング開始
    authStoreState.setLoading(true);

    // Firebase認証でアカウント作成
    await serviceRegistry.auth.signUp(email, password);

    // サインアップ完了後は自動的にログイン状態になる
    // FirebaseのcreateUserWithEmailAndPasswordはアカウント作成と同時にユーザーを認証済み状態にする
    // onAuthStateChangedが発火してログイン状態になり、画面が自動リダイレクトされる

    // ストア更新は監視システムに任せる（重複処理を避ける）
    // プロフィール初期化も認証後のコールバックで実行される

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    authStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'アカウント作成に失敗しました');
  }
};

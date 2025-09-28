// src/usecases/auth/loginUser.ts
// ログインのユースケース - ビジネスロジックとストア更新を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { validateEmailFormat, validatePasswordLength } from '@utils/validation/authValidation';

/**
 * ログインに必要なデータ
 */
export interface LoginData {
  email: string;     // メールアドレス
  password: string;  // パスワード
}

/**
 * ログイン処理の結果
 */
export interface LoginResult {
  success: boolean;    // 処理成功フラグ
  error?: string;      // エラーメッセージ（失敗時のみ）
}

/**
 * ユーザーログインのユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. サービス層でFirebase認証を実行
 * 3. 監視システムが自動的にストア更新（onAuthStateChanged）
 * 4. 結果をUIに返却
 * 
 * @param data - ログインデータ（メール・パスワード）
 * @returns ログイン結果（成功/失敗とエラーメッセージ）
 */
export const loginUser = async (data: LoginData): Promise<LoginResult> => {
  const { email, password } = data;

  try {
    // バリデーション（utils側でエラーをスロー）
    validateEmailFormat(email);
    validatePasswordLength(password);

    // ローディング開始（UIにスピナー表示）
    authStore.getState().setLoading(true);

    // サービス層でFirebase認証を実行
    // → 成功時、onAuthStateChangedが自動的にストア更新してくれる
    await serviceRegistry.auth.logIn(email, password);

    // ストア更新は監視システムに任せる（重複処理を避ける）
    // authStore.getState().setUser() ← 削除
    // authStore.getState().setLoading(false) ← 削除

    return { success: true };

  } catch (error: any) {
    console.error('ログインエラー:', error);

    // エラー時のみ手動でストア更新
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'ログインに失敗しました');

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'ログインに失敗しました');
  }
};

// src/usecases/auth/loginUser.ts
// ログインのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

/**
 * ユーザーログインのユースケース
 * サービス層を呼び出し、結果をストアに反映
 */
export const loginUser = async (data: LoginData): Promise<LoginResult> => {
  const { email, password } = data;

  try {
    // ローディング開始
    authStore.getState().setLoading(true);

    // サービス層でFirebase認証
    await serviceRegistry.auth.signIn(email, password);

    // 認証成功時、ユーザー情報をストアに設定
    const currentUser = await serviceRegistry.auth.getCurrentUser();
    if (currentUser) {
      authStore.getState().setUser(currentUser);
    }

    authStore.getState().setLoading(false);
    return { success: true };

  } catch (error: any) {
    console.error('ログインエラー:', error);
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'ログインに失敗しました');

    return {
      success: false,
      error: error.message || 'ログインに失敗しました'
    };
  }
};

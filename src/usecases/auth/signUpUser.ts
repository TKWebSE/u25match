// src/usecases/auth/signUpUser.ts
// サインアップのユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { validateSignUpForm } from '@utils/validation';
import { auth } from '../../../firebaseConfig';

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
 * バリデーション → アカウント作成 → プロフィール作成 → ストア更新
 */
export const signUpUser = async (data: SignUpData): Promise<SignUpResult> => {
  const { email, password, confirmPassword } = data;

  // バリデーション
  const validationResult = validateSignUpForm({ email, password, confirmPassword });
  if (!validationResult.isValid) {
    return {
      success: false,
      error: validationResult.message || 'バリデーションエラーが発生しました'
    };
  }

  try {
    // ローディング開始
    authStore.getState().setLoading(true);

    // Firebase認証でアカウント作成
    await serviceRegistry.auth.signUp(email, password);

    // ユーザープロファイル作成
    const currentUser = auth.currentUser;
    if (currentUser) {
      await serviceRegistry.profileDetail.updateProfileDetail(currentUser.uid, {
        name: '',
        age: 0,
        location: '',
        bio: '',
        images: [],
        tags: [],
        details: {
          height: 0,
          occupation: '',
          education: '',
          languages: [],
          smoking: false,
          drinking: ''
        },
        createdAt: new Date()
      });

      // ストアにユーザー情報を設定
      authStore.getState().setUser(currentUser);
    }

    authStore.getState().setLoading(false);
    return { success: true };

  } catch (error: any) {
    console.error('サインアップエラー:', error);
    authStore.getState().setLoading(false);
    authStore.getState().setError(error.message || 'アカウント作成に失敗しました');

    return {
      success: false,
      error: error.message || 'アカウント作成に失敗しました'
    };
  }
};

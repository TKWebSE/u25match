// src/services/auth/signUpService.ts
// サインアップのビジネスロジック

import { validateSignUpForm } from '@utils/validation';
import { auth } from '../../../firebaseConfig';
import { serviceRegistry } from '../core/ServiceRegistry';
import { signUp } from './index';

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
 * サインアップの完全な処理を実行
 * バリデーション → アカウント作成 → プロフィール作成
 */
export const executeSignUp = async (data: SignUpData): Promise<SignUpResult> => {
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
    // Firebase認証でアカウント作成
    await signUp(email, password);

    // ユーザープロファイル作成
    const currentUser = auth.currentUser;
    if (currentUser) {
      await serviceRegistry.profileDetail.updateProfileDetail(currentUser.uid, {
        email: currentUser.email || email,
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
    }

    return { success: true };

  } catch (error: any) {
    console.error('サインアップエラー:', error);
    return {
      success: false,
      error: error.message || 'アカウント作成に失敗しました'
    };
  }
};

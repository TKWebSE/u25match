// src/services/auth/prod.ts
// 🔥 本番用認証サービス - 実際のFirebaseを使う

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { AuthResult, AuthService } from './types';

export class ProdAuthService implements AuthService {
  // 🎯 インターフェースの約束を守って実装

  async signUp(email: string, password: string): Promise<AuthResult> {
    console.log('🔥 本番サインアップ:', email);

    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Firebase結果を共通フォーマットに変換
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || undefined,
        photoURL: result.user.photoURL || undefined,
        emailVerified: result.user.emailVerified,
      },
      operationType: 'signIn',
      providerId: null,
    };
  }

  async logIn(email: string, password: string): Promise<AuthResult> {
    console.log('🔥 本番ログイン:', email);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Firebase結果を共通フォーマットに変換
      return {
        user: {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || undefined,
          photoURL: result.user.photoURL || undefined,
          emailVerified: result.user.emailVerified,
        },
        operationType: 'signIn',
        providerId: null,
      };
    } catch (error) {
      throw new Error("ログインできませんでした");
    }
  }

  async logOut(): Promise<void> {
    console.log('🔥 本番ログアウト');
    await signOut(auth);
  }

  async resetPassword(email: string): Promise<void> {
    console.log('🔥 本番パスワードリセット:', email);
    await sendPasswordResetEmail(auth, email);
  }
}

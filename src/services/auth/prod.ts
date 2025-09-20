// src/services/auth/prod.ts
// 🔥 本番用認証サービス - 実際のFirebaseを使う

import { AuthUser } from '@my-types/user';
// import { getUserProfile } from '@services/firestoreUserProfile'; // 削除済み
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { AuthResult, AuthService } from './types';

export class ProdAuthService implements AuthService {
  logIn(email: string, password: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  // 🎯 インターフェースの約束を守って実装
  private currentUser: AuthUser | null = null;

  async signUp(email: string, password: string): Promise<AuthResult> {
    console.log('🔥 本番サインアップ:', email);

    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Firebase結果を共通フォーマットに変換
    return {
      user: {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || undefined,
        image: result.user.photoURL || undefined,
        emailVerified: result.user.emailVerified,
      },
      operationType: 'signIn',
      providerId: null,
    };
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    console.log('🔥 本番ログイン:', email);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Firebase結果を共通フォーマットに変換
      return {
        user: {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || undefined,
          image: result.user.photoURL || undefined,
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

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    console.log('🔥 Firebase認証状態監視を開始');

    return onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Firebase認証状態変更:', firebaseUser ? firebaseUser.uid : 'null');

      if (firebaseUser) {
        // Firebase UserをAuthUserに変換
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: null,
          image: null,
        };

        // Firestoreからプロフィール情報を取得
        // TODO: プロフィール情報の取得を実装
        // try {
        //   const userProfile = await getUserProfile(firebaseUser.uid);
        //   if (userProfile) {
        //     authUser.displayName = userProfile.displayName || null;
        //     authUser.image = userProfile.photoURL || null;
        //   }
        // } catch (error) {
        //   console.error('🔥 プロフィール取得エラー:', error);
        // }

        this.currentUser = authUser;
        callback(authUser);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }
}

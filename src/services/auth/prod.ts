// src/services/auth/prod.ts
// 🔥 本番用認証サービス - 実際のFirebaseを使う

import { AuthUser } from '@my-types/firebase';
// import { getUserProfile } from '@services/firestoreUserProfile'; // 削除済み
import { confirmPasswordReset, createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { AuthResult, AuthService } from './types';

/**
 * 本番環境用の認証サービス実装
 * Firebase Authenticationを使用して実際のユーザー認証を行う
 */
export class ProdAuthService implements AuthService {
  // 🎯 インターフェースの約束を守って実装
  // 現在ログインしているユーザー情報を保持
  private currentUser: AuthUser | null = null;

  /**
   * 新規ユーザー登録
   * @param email メールアドレス
   * @param password パスワード
   * @returns 認証結果（ユーザー情報、操作タイプ、プロバイダーID）
   */
  async signUp(email: string, password: string): Promise<AuthResult> {
    try {
      // Firebase Authenticationでユーザー作成
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
        operationType: result.operationType || 'signUp',
        providerId: result.providerId,
      };
    } catch (error: any) {
      // Firebaseエラーを適切なメッセージに変換
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('このメールアドレスは既に使用されています');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('パスワードが弱すぎます');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('無効なメールアドレスです');
      } else {
        throw new Error('アカウント作成に失敗しました');
      }
    }
  }

  /**
   * ユーザーログイン
   * @param email メールアドレス
   * @param password パスワード
   * @returns 認証結果（ユーザー情報、操作タイプ、プロバイダーID）
   * @throws ログインに失敗した場合
   */
  async logIn(email: string, password: string): Promise<AuthResult> {
    try {
      // Firebase Authenticationでログイン
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
        operationType: result.operationType || 'signIn',
        providerId: result.providerId,
      };
    } catch (error) {
      throw new Error("ログインできませんでした");
    }
  }

  /**
   * ユーザーログアウト
   * 現在のセッションを終了する
   */
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('ログアウトに失敗しました');
    }
  }

  /**
   * パスワードを忘れた場合のメール送信
   * @param email パスワードリセットメールを送信するメールアドレス
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error('パスワードリセットメールの送信に失敗しました');
    }
  }

  /**
   * 再認証（パスワード確認）
   * 現在のユーザーが正しいパスワードを持っているか確認する
   * @param password 確認するパスワード
   * @throws パスワードが間違っている場合、ログインしていない場合
   */
  async reauthenticate(password: string): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email) {
      throw new Error('ログインしていません');
    }

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, password);
      await reauthenticateWithCredential(currentUser, credential);
    } catch (error: any) {
      throw new Error('パスワードが正しくありません');
    }
  }

  /**
   * パスワードの更新（oobCodeとnewPasswordを使用）
   * パスワードリセットメールから取得したoobCodeを使用して新しいパスワードを設定する
   * @param oobCode メールから取得したワンタイムコード
   * @param newPassword 新しいパスワード
   * @throws 無効なoobCodeまたはパスワード設定に失敗した場合
   */
  async updatePassword(oobCode: string, newPassword: string): Promise<void> {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error: any) {
      if (error.code === 'auth/invalid-action-code') {
        throw new Error('無効なリセットコードです。再度パスワードリセットを実行してください');
      } else if (error.code === 'auth/expired-action-code') {
        throw new Error('リセットコードの有効期限が切れています。再度パスワードリセットを実行してください');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('パスワードが弱すぎます');
      } else {
        throw new Error('パスワードの更新に失敗しました');
      }
    }
  }

  /**
   * アカウント削除
   * 現在ログインしているユーザーのアカウントを完全に削除する
   * @throws ログインしていない場合
   */
  async deleteAccount(): Promise<void> {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('ログインしていません');
    }
    await deleteUser(currentUser);
  }

  /**
   * 現在ログインしているユーザー情報を取得
   * @returns 現在のユーザー情報、ログインしていない場合はnull
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * 認証状態の変更を監視
   * Firebase Authenticationの状態変更を監視し、コールバック関数を実行する
   * @param callback 認証状態が変更された時に実行されるコールバック関数
   * @returns 監視を停止するための関数
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser) => {

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
        // ログアウト状態
        this.currentUser = null;
        callback(null);
      }
    });
  }
}

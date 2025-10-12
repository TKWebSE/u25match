// src/services/auth/types.ts
// 🎯 これが「契約書」- どんな認証サービスも必ずこの機能を提供する約束

import { AuthUser } from '@my-types/firebase';

export interface AuthService {
  // 認証処理機能
  /** 新規ユーザーアカウントの作成 */
  signUp(email: string, password: string): Promise<AuthResult>;

  /** 既存ユーザーのログイン */
  logIn(email: string, password: string): Promise<AuthResult>;

  /** 現在ユーザーのログアウト */
  logOut(): Promise<void>;

  /** パスワードを忘れた場合のメール送信 */
  forgotPassword(email: string): Promise<void>;

  /** パスワードの更新（oobCodeとnewPasswordを使用） */
  updatePassword(oobCode: string, newPassword: string): Promise<void>;

  /** アカウント削除 */
  deleteAccount(): Promise<void>;

  /** 再認証（パスワード確認） */
  reauthenticate(password: string): Promise<void>;

  // 状態監視機能
  /** 現在ログイン中のユーザー情報を取得 */
  getCurrentUser(): AuthUser | null;

  /** 認証状態の変更を監視し、変更時にコールバックを実行 */
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
}

// 認証結果の型も定義
export interface AuthResult {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    image?: string;
    emailVerified: boolean;
  };
  operationType?: string;
  providerId?: string | null;
}

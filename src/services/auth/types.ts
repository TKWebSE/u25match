// src/services/auth/types.ts
// 🎯 これが「契約書」- どんな認証サービスも必ずこの機能を提供する約束

export interface AuthService {
  // サインアップ機能
  signUp(email: string, password: string): Promise<any>;

  // ログイン機能  
  logIn(email: string, password: string): Promise<any>;

  // ログアウト機能
  logOut(): Promise<void>;

  // パスワードリセット機能
  resetPassword(email: string): Promise<void>;
}

// 認証結果の型も定義
export interface AuthResult {
  user: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    emailVerified: boolean;
  };
  operationType?: string;
  providerId?: string | null;
}

// src/services/auth/index.ts
// 🎯 メインエントリーポイント - 外部からはここだけを使う

import { createAuthService } from './factory';

// 🏭 認証サービスのインスタンスを一度だけ作成（シングルトン）
const authService = createAuthService();

// 🚀 外部からは関数として簡単に使える
export const signUp = (email: string, password: string) => {
  return authService.signUp(email, password);
};

export const logIn = (email: string, password: string) => {
  return authService.logIn(email, password);
};

export const logOut = () => {
  return authService.logOut();
};

// 型も再エクスポート
export type { AuthService, AuthResult } from './types';
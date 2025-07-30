// src/services/auth/index.ts
// 🎯 認証サービスのコントローラー兼エントリーポイント

import { createAuthService } from './factory';

/**
 * 🏭 認証サービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const authService = createAuthService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const signUp = (email: string, password: string) => {
  return authService.signUp(email, password);
};

export const logIn = (email: string, password: string) => {
  return authService.logIn(email, password);
};

export const logOut = () => {
  return authService.logOut();
};

// 型定義も再エクスポート
export type { AuthService, AuthResult } from './types';
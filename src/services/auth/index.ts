// src/services/auth/index.ts
// 🎯 メインエントリーポイント - 判定も生成もここでやる

import Constants from 'expo-constants';
import { AuthService } from './types';
import { ProdAuthService } from './prod';
import { MockAuthService } from './mock';

// 🏭 環境判定して適切なサービスを作成（factoryの機能をここに統合）
function createAuthService(): AuthService {
  const isDev = Constants.expoConfig?.extra?.isDev;
  
  if (isDev) {
    console.log('🎭 モック認証サービスを使用中...');
    return new MockAuthService();
  } else {
    console.log('🔥 本番認証サービスを使用中...');
    return new ProdAuthService();
  }
}

// 🚀 認証サービスのインスタンスを一度だけ作成（シングルトン）
const authService = createAuthService();

// 🚪 外部からは関数として簡単に使える
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
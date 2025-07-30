// src/services/auth/factory.ts
// 🏭 認証サービス工場 - 環境判定と生成の責任のみ

import Constants from 'expo-constants';
import { AuthService } from './types';
import { ProdAuthService } from './prod';
import { MockAuthService } from './mock';

export class AuthServiceFactory {
  /**
   * 🎯 環境に応じて適切な認証サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createAuthService(): AuthService {
    const isDev = Constants.expoConfig?.extra?.isDev;
    
    if (isDev) {
      console.log('🎭 DEVモード: モック認証サービスを生成');
      return new MockAuthService();
    } else {
      console.log('🔥 本番モード: Firebase認証サービスを生成');
      return new ProdAuthService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createAuthService(): AuthService {
  return AuthServiceFactory.createAuthService();
}
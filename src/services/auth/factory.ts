// src/services/auth/factory.ts
// 🏭 認証サービス工場 - 環境に応じて適切なサービスを作る

import Constants from 'expo-constants';
import { AuthService } from './types';
import { ProdAuthService } from './prod';
import { MockAuthService } from './mock';

export class AuthServiceFactory {
  // 🎯 ここが「依存性注入」の核心部分
  
  static createAuthService(): AuthService {
    const isDev = Constants.expoConfig?.extra?.isDev;
    
    if (isDev) {
      console.log('🎭 モック認証サービスを作成中...');
      return new MockAuthService();
    } else {
      console.log('🔥 本番認証サービスを作成中...');
      return new ProdAuthService();
    }
  }
}

// 🚀 簡単に使えるヘルパー関数も提供
export function createAuthService(): AuthService {
  return AuthServiceFactory.createAuthService();
}
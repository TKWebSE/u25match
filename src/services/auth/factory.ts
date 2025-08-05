// src/services/auth/factory.ts
// 🏭 認証サービス工場 - 環境判定と生成の責任のみ

import { getDevModeInfo, isDevMode } from '../../utils/devMode';
import { MockAuthService } from './mock';
import { ProdAuthService } from './prod';
import { AuthService } from './types';

export class AuthServiceFactory {
  /**
   * 🎯 環境に応じて適切な認証サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createAuthService(): AuthService {
    const devModeInfo = getDevModeInfo();
    const isDevelopment = isDevMode();

    console.log('🔧 認証サービス生成中...');
    console.log('📋 DEVモード情報:', devModeInfo);

    if (isDevelopment) {
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

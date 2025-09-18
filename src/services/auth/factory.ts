// src/services/auth/factory.ts
// 🏭 認証サービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
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
    const mode = getServiceMode('AUTH');
    const configInfo = getServiceConfigInfo('AUTH');

    console.log('🔧 認証サービス生成中...');
    console.log('📋 認証サービス設定:', configInfo);

    if (mode === 'firebase') {
      console.log('🔥 Firebase認証サービスを生成');
      return new ProdAuthService();
    } else {
      console.log('🎭 モック認証サービスを生成');
      return new MockAuthService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createAuthService(): AuthService {
  return AuthServiceFactory.createAuthService();
}

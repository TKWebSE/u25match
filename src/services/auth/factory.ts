// src/services/auth/factory.ts
// 🏭 認証サービス工場 - 環境判定と生成の責任のみ

import { getServiceMode } from '@utils/serviceConfig';
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

    if (mode === 'firebase') {
      return new ProdAuthService();
    } else {
      return new MockAuthService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createAuthService(): AuthService {
  return AuthServiceFactory.createAuthService();
}

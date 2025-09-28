// src/services/profileDetail/factory.ts
// 🏭 プロフィール詳細サービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
import { MockProfileService } from './mock';
import { ProdProfileDetailService } from './prod';
import { ProfileDetailService } from './types';

export class ProfileServiceFactory {
  /**
   * 🎯 環境に応じて適切なプロフィール詳細サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createProfileService(): ProfileDetailService {
    const mode = getServiceMode('PROFILE');
    const configInfo = getServiceConfigInfo('PROFILE');

    console.log('🔧 プロフィール詳細サービス生成中...');
    console.log('📋 プロフィール詳細サービス設定:', configInfo);

    if (mode === 'firebase') {
      console.log('🔥 Firebaseプロフィール詳細サービスを生成');
      return new ProdProfileDetailService();
    } else {
      console.log('🎭 モックプロフィール詳細サービスを生成');
      return new MockProfileService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createProfileService(): ProfileDetailService {
  return ProfileServiceFactory.createProfileService();
} 

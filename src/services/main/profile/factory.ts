// src/services/profileDetail/factory.ts
// 🏭 プロフィール詳細サービス工場 - 環境判定と生成の責任のみ

import { getDevModeInfo, isDevMode } from '@utils/devMode';
import { MockProfileDetailService } from './mock';
import { ProdProfileDetailService } from './prod';
import { ProfileDetailService } from './types';

export class ProfileDetailServiceFactory {
  /**
   * 🎯 環境に応じて適切なプロフィール詳細サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createProfileDetailService(): ProfileDetailService {
    const devModeInfo = getDevModeInfo();
    const isDevelopment = isDevMode();

    console.log('🔧 プロフィール詳細サービス生成中...');
    console.log('📋 DEVモード情報:', devModeInfo);

    if (isDevelopment) {
      console.log('🎭 DEVモード: モックプロフィール詳細サービスを生成');
      return new MockProfileDetailService();
    } else {
      console.log('🌐 本番モード: 本番プロフィール詳細サービスを生成');
      return new ProdProfileDetailService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createProfileDetailService(): ProfileDetailService {
  return ProfileDetailServiceFactory.createProfileDetailService();
} 

// src/services/main/settings/factory.ts
// 🏭 設定サービス工場 - 環境判定と生成の責任のみ

import { getDevModeInfo, isDevMode } from '@utils/devMode';
import { MockSettingsService } from './mock';
import { ProdSettingsService } from './prod';
import { SettingsService } from './types';

export class SettingsServiceFactory {
  /**
   * 🎯 環境に応じて適切な設定サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createSettingsService(): SettingsService {
    const devModeInfo = getDevModeInfo();
    const isDevelopment = isDevMode();

    console.log('🔧 設定サービス生成中...');
    console.log('📋 DEVモード情報:', devModeInfo);

    if (isDevelopment) {
      console.log('🎭 DEVモード: モック設定サービスを生成');
      return new MockSettingsService();
    } else {
      console.log('🌐 本番モード: 本番設定サービスを生成');
      return new ProdSettingsService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createSettingsService(): SettingsService {
  return SettingsServiceFactory.createSettingsService();
} 

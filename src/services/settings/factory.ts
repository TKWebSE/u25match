// src/services/main/settings/factory.ts
// 🏭 設定サービス工場 - 環境判定と生成の責任のみ

import { getServiceMode } from '@utils/serviceConfig';
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
    const mode = getServiceMode('SETTINGS');

    if (mode === 'firebase') {
      return new ProdSettingsService();
    } else {
      return new MockSettingsService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createSettingsService(): SettingsService {
  return SettingsServiceFactory.createSettingsService();
} 

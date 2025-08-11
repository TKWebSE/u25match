// src/services/sales/factory.ts
// 🏭 セールサービス工場 - 環境判定と生成の責任のみ

import { getDevModeInfo, isDevMode } from '@utils/devMode';
import { MockSalesService } from './mock';
import { ProdSalesService } from './prod';
import { SalesService } from './types';

export class SalesServiceFactory {
  /**
   * 🎯 環境に応じて適切なセールサービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createSalesService(): SalesService {
    const devModeInfo = getDevModeInfo();
    const isDevelopment = isDevMode();

    console.log('🔧 セールサービス生成中...');
    console.log('📋 DEVモード情報:', devModeInfo);

    if (isDevelopment) {
      console.log('🎭 DEVモード: モックセールサービスを生成');
      return new MockSalesService();
    } else {
      console.log('🌐 本番モード: 本番セールサービスを生成');
      return new ProdSalesService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createSalesService(): SalesService {
  return SalesServiceFactory.createSalesService();
}

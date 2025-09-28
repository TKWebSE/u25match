// src/services/sales/factory.ts
// 🏭 セールサービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
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
    const mode = getServiceMode('SALES');
    const configInfo = getServiceConfigInfo('SALES');

    console.log('🔧 セールサービス生成中...');
    console.log('📋 セールサービス設定:', configInfo);

    if (mode === 'firebase') {
      console.log('🔥 Firebaseセールサービスを生成');
      return new ProdSalesService();
    } else {
      console.log('🎭 モックセールサービスを生成');
      return new MockSalesService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createSalesService(): SalesService {
  return SalesServiceFactory.createSalesService();
}

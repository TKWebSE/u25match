// src/services/main/reactions/factory.ts
// 🏭 リアクションサービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
import { MockReactionsService } from './mock';
import { ProdReactionsService } from './prod';
import { ReactionsService } from './types';

export class ReactionsServiceFactory {
  /**
   * 🎯 環境に応じて適切なリアクションサービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createReactionsService(): ReactionsService {
    const mode = getServiceMode('REACTIONS');
    const configInfo = getServiceConfigInfo('REACTIONS');

    console.log('🔧 リアクションサービス生成中...');
    console.log('📋 リアクションサービス設定:', configInfo);

    if (mode === 'firebase') {
      console.log('🔥 Firebaseリアクションサービスを生成');
      return new ProdReactionsService();
    } else {
      console.log('🎭 モックリアクションサービスを生成');
      return new MockReactionsService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createReactionsService(): ReactionsService {
  return ReactionsServiceFactory.createReactionsService();
} 

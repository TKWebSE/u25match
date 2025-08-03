// src/services/main/reactions/factory.ts
// 🏭 リアクションサービス工場 - 環境判定と生成の責任のみ

import Constants from 'expo-constants';
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
    const isDev = Constants.expoConfig?.extra?.isDev;

    if (isDev) {
      console.log('🎭 DEVモード: モックリアクションサービスを生成');
      return new MockReactionsService();
    } else {
      console.log('🌐 本番モード: 本番リアクションサービスを生成');
      return new ProdReactionsService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createReactionsService(): ReactionsService {
  return ReactionsServiceFactory.createReactionsService();
} 

// src/services/main/explore/factory.ts
// 🏭 探索サービス工場 - 環境判定と生成の責任のみ

import Constants from 'expo-constants';
import { MockExploreService } from './mock';
import { ProdExploreService } from './prod';
import { ExploreService } from './types';

export class ExploreServiceFactory {
  /**
   * 🎯 環境に応じて適切な探索サービスを生成
   * この関数の責任：
   * 1. 環境変数の判定
   * 2. 適切な実装クラスの選択
   * 3. インスタンスの生成
   */
  static createExploreService(): ExploreService {
    const isDev = Constants.expoConfig?.extra?.isDev;

    if (isDev) {
      console.log('🎭 DEVモード: モック探索サービスを生成');
      return new MockExploreService();
    } else {
      console.log('🌐 本番モード: 本番探索サービスを生成');
      return new ProdExploreService();
    }
  }
}

// 🚀 簡潔な関数形式も提供
export function createExploreService(): ExploreService {
  return ExploreServiceFactory.createExploreService();
} 

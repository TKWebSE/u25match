// src/services/main/explore/index.ts
// 🔍 探索サービスのコントローラー兼エントリーポイント

import { createExploreService } from './factory';

/**
 * 🏭 探索サービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const exploreService = createExploreService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const searchUsers = (query: string) => {
  return exploreService.searchUsers(query);
};

export const getRecommendedUsers = (userId: string) => {
  return exploreService.getRecommendedUsers(userId);
};

export const getNearbyUsers = (location: { lat: number; lng: number }) => {
  return exploreService.getNearbyUsers(location);
};

// 型定義も再エクスポート
export type { ExploreService, SearchResult, UserRecommendation } from './types';


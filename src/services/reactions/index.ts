// src/services/main/reactions/index.ts
// ❤️ リアクションサービスのコントローラー兼エントリーポイント

import { createReactionsService } from './factory';

/**
 * 🏭 リアクションサービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const reactionsService = createReactionsService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const leaveFootprint = (targetUserId: string) => {
  return reactionsService.leaveFootprint(targetUserId);
};

export const getReactions = (userId: string) => {
  return reactionsService.getReactions(userId);
};

// 型定義も再エクスポート
export type { Reaction, ReactionsService } from './types';


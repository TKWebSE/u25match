// src/services/profileDetail/index.ts
// 🚪 プロフィール詳細サービスのコントローラー兼エントリーポイント

import { createProfileDetailService } from './factory';

/**
 * 🏭 プロフィール詳細サービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const profileDetailService = createProfileDetailService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const getProfileDetail = (uid: string) => {
  return profileDetailService.getProfileDetail(uid);
};

export const updateProfileDetail = (uid: string, data: any) => {
  return profileDetailService.updateProfileDetail(uid, data);
};

export const sendLike = (uid: string) => {
  return profileDetailService.sendLike(uid);
};

export const setMockMode = (enabled: boolean) => {
  return profileDetailService.setMockMode(enabled);
};

export const isMockMode = () => {
  return profileDetailService.isMockMode();
};

// 型定義も再エクスポート
export type { ProfileDetail, ProfileDetailResponse, ProfileDetailService } from './types';


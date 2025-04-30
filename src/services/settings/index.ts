// src/services/main/settings/index.ts
// ⚙️ 設定サービスのコントローラー兼エントリーポイント

import { createSettingsService } from './factory';

/**
 * 🏭 設定サービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const settingsService = createSettingsService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const getUserSettings = (userId: string) => {
  return settingsService.getUserSettings(userId);
};

export const updateUserSettings = (userId: string, settings: any) => {
  return settingsService.updateUserSettings(userId, settings);
};

export const deleteAccount = (userId: string) => {
  return settingsService.deleteAccount(userId);
};

// 型定義も再エクスポート
export type { PrivacySettings, SettingsService, UserSettings } from './types';


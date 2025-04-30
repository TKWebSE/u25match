// src/services/main/settings/prod.ts
// 🌐 設定サービスの本番実装

import { SettingsResponse, SettingsService, UserSettings } from './types';

export class ProdSettingsService implements SettingsService {
  /**
   * ⚙️ ユーザー設定を取得（本番）
   * @param userId ユーザーID
   * @returns ユーザー設定
   */
  async getUserSettings(userId: string): Promise<SettingsResponse> {
    try {
      const response = await fetch(`/api/settings/${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to get user settings: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * ✏️ ユーザー設定を更新（本番）
   * @param userId ユーザーID
   * @param settings 更新する設定
   * @returns 更新結果
   */
  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<SettingsResponse> {
    try {
      const response = await fetch(`/api/settings/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user settings: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * 🗑️ アカウントを削除（本番）
   * @param userId ユーザーID
   * @returns 削除結果
   */
  async deleteAccount(userId: string): Promise<SettingsResponse> {
    try {
      const response = await fetch(`/api/settings/${userId}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete account: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
} 

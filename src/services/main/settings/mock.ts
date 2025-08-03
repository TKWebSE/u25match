// src/services/main/settings/mock.ts
// 🎭 設定サービスのモック実装

import { mockUserSettings } from '../../../mock/settingsMock';
import { SettingsResponse, SettingsService, UserSettings } from './types';

export class MockSettingsService implements SettingsService {
  /**
   * ⚙️ ユーザー設定を取得（モック）
   * @param userId ユーザーID
   * @returns ユーザー設定
   */
  async getUserSettings(userId: string): Promise<SettingsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        ...mockUserSettings,
        userId, // 渡されたuserIdで上書き
      },
    };
  }

  /**
   * ✏️ ユーザー設定を更新（モック）
   * @param userId ユーザーID
   * @param settings 更新する設定
   * @returns 更新結果
   */
  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<SettingsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        userId,
        ...settings,
        updatedAt: new Date(),
      },
    };
  }

  /**
   * 🗑️ アカウントを削除（モック）
   * @param userId ユーザーID
   * @returns 削除結果
   */
  async deleteAccount(userId: string): Promise<SettingsResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        message: 'アカウントが正常に削除されました',
        deletedAt: new Date(),
      },
    };
  }

  /**
   * ⏱️ ネットワーク遅延をシミュレート
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, Math.random() * 1000 + 500);
    });
  }
} 

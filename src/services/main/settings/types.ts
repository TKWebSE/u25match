// src/services/main/settings/types.ts
// 🎯 設定サービスの型定義 - 契約書

export interface UserSettings {
  userId: string;
  notifications: {
    matches: boolean;
    messages: boolean;
    likes: boolean;
    superLikes: boolean;
  };
  privacy: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    showDistance: boolean;
  };
  preferences: {
    ageRange: {
      min: number;
      max: number;
    };
    maxDistance: number;
    interestedIn: 'men' | 'women' | 'both';
  };
}

export interface PrivacySettings {
  showProfile: boolean;
  allowMessages: boolean;
  blockList: string[];
}

export interface SettingsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * 🎯 設定サービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface SettingsService {
  // ユーザー設定を取得
  getUserSettings(userId: string): Promise<SettingsResponse>;

  // ユーザー設定を更新
  updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<SettingsResponse>;

  // アカウントを削除
  deleteAccount(userId: string): Promise<SettingsResponse>;
} 

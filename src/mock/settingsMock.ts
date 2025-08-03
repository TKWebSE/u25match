// src/mock/settingsMock.ts
// ⚙️ 設定サービスのモックデータ

export const mockUserSettings = {
  userId: 'current_user',
  notifications: {
    matches: true,
    messages: true,
    likes: true,
    superLikes: false,
  },
  privacy: {
    showOnlineStatus: true,
    showLastSeen: false,
    showDistance: true,
  },
  preferences: {
    ageRange: {
      min: 18,
      max: 35,
    },
    maxDistance: 50,
    interestedIn: 'both' as const,
  },
};

export const mockPrivacySettings = {
  showProfile: true,
  allowMessages: true,
  blockList: ['blocked_user_1', 'blocked_user_2'],
}; 

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
    // 年齢範囲の設定（最小・最大年齢）
    ageRange: {
      min: 18,
      max: 25,
    },
    // 最大検索距離（km）
    maxDistance: 50,
    // 興味のある性別（both: 両方, male: 男性, female: 女性）
    interestedIn: 'both' as const,
  },
  // プレミアム会員情報
  membership: {
    isPremium: true,
    planName: 'プレミアム会員',
    expiryDate: '2025-12-31', // 有効期限（YYYY-MM-DD形式）
    startDate: '2025-01-01', // 開始日
  },
};

export const mockPrivacySettings = {
  showProfile: true,
  allowMessages: true,
  blockList: ['blocked_user_1', 'blocked_user_2'],
}; 

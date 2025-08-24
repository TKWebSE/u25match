// src/mock/reactionsMock.ts
// ❤️ リアクションサービスのモックデータ

export const mockReactions = [
  {
    id: 'reaction_1',
    fromUserId: 'user1',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'reaction_2',
    fromUserId: 'user2',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    message: '素敵なプロフィールですね！',
  },
  {
    id: 'reaction_3',
    fromUserId: 'user3',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'reaction_4',
    fromUserId: 'user4',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    message: 'あなたが気になります！',
  },
  {
    id: 'reaction_5',
    fromUserId: 'user5',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 'reaction_6',
    fromUserId: 'user6',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: 'reaction_7',
    fromUserId: 'user7',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  // 追加のリアクション
  {
    id: 'reaction_8',
    fromUserId: 'user8',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    message: '一緒にカフェ巡りしませんか？☕',
  },
  {
    id: 'reaction_9',
    fromUserId: 'user9',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 'reaction_10',
    fromUserId: 'user10',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: 'reaction_11',
    fromUserId: 'user11',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: 'reaction_12',
    fromUserId: 'user12',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    message: 'あなたの写真が素敵です！📸',
  },
  {
    id: 'reaction_13',
    fromUserId: 'user13',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
  },
  {
    id: 'reaction_14',
    fromUserId: 'user14',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
  },
  {
    id: 'reaction_15',
    fromUserId: 'user15',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    message: '一緒に旅行に行きませんか？✈️',
  },
  {
    id: 'reaction_16',
    fromUserId: 'user16',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 540),
  },
  {
    id: 'reaction_17',
    fromUserId: 'user17',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 600),
  },
  {
    id: 'reaction_18',
    fromUserId: 'user18',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 720),
  },
  {
    id: 'reaction_19',
    fromUserId: 'user19',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 900),
  },
  {
    id: 'reaction_20',
    fromUserId: 'user20',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 1080),
    message: 'あなたの趣味が素敵です！🎨',
  },
  // さらに追加のリアクション
  {
    id: 'reaction_21',
    fromUserId: 'user21',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 1440), // 24時間前
  },
  {
    id: 'reaction_22',
    fromUserId: 'user22',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 1800), // 30時間前
  },
  {
    id: 'reaction_23',
    fromUserId: 'user23',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 2160), // 36時間前
    message: '一緒に映画を見に行きませんか？🎬',
  },
  {
    id: 'reaction_24',
    fromUserId: 'user24',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 2520), // 42時間前
  },
  {
    id: 'reaction_25',
    fromUserId: 'user25',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 2880), // 48時間前
  },
  {
    id: 'reaction_26',
    fromUserId: 'user26',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 3240), // 54時間前
  },
  {
    id: 'reaction_27',
    fromUserId: 'user27',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 3600), // 60時間前
    message: 'あなたの性格が素敵です！✨',
  },
  {
    id: 'reaction_28',
    fromUserId: 'user28',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 3960), // 66時間前
  },
  {
    id: 'reaction_29',
    fromUserId: 'user29',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 4320), // 72時間前
  },
  {
    id: 'reaction_30',
    fromUserId: 'user30',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 4680), // 78時間前
    message: '一緒に料理を作りませんか？👨‍🍳',
  },
  // 過去のリアクション（1週間前）
  {
    id: 'reaction_31',
    fromUserId: 'user31',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1週間前
  },
  {
    id: 'reaction_32',
    fromUserId: 'user32',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1週間前
  },
  {
    id: 'reaction_33',
    fromUserId: 'user33',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1週間前
    message: 'あなたの仕事への情熱が素敵です！💼',
  },
  {
    id: 'reaction_34',
    fromUserId: 'user34',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8日前
  },
  {
    id: 'reaction_35',
    fromUserId: 'user35',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8), // 8日前
  },
  {
    id: 'reaction_36',
    fromUserId: 'user36',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), // 9日前
  },
  {
    id: 'reaction_37',
    fromUserId: 'user37',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9), // 9日前
    message: '一緒にスポーツしませんか？🏃‍♀️',
  },
  {
    id: 'reaction_38',
    fromUserId: 'user38',
    toUserId: 'current_user',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10日前
  },
  {
    id: 'reaction_39',
    fromUserId: 'user39',
    toUserId: 'current_user',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10日前
  },
  {
    id: 'reaction_40',
    fromUserId: 'user40',
    toUserId: 'current_user',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11), // 11日前
    message: 'あなたの笑顔が素敵です！😊',
  }
];

export const mockSentReactions = [
  {
    id: 'sent_reaction_1',
    fromUserId: 'current_user',
    toUserId: 'user5',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 'sent_reaction_2',
    fromUserId: 'current_user',
    toUserId: 'user6',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    message: 'あなたが気になります！',
  },
  {
    id: 'sent_reaction_3',
    fromUserId: 'current_user',
    toUserId: 'user7',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  // 追加の送信リアクション
  {
    id: 'sent_reaction_4',
    fromUserId: 'current_user',
    toUserId: 'user8',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 'sent_reaction_5',
    fromUserId: 'current_user',
    toUserId: 'user9',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    message: '素敵なプロフィールですね！',
  },
  {
    id: 'sent_reaction_6',
    fromUserId: 'current_user',
    toUserId: 'user10',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
  {
    id: 'sent_reaction_7',
    fromUserId: 'current_user',
    toUserId: 'user11',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
  },
  {
    id: 'sent_reaction_8',
    fromUserId: 'current_user',
    toUserId: 'user12',
    type: 'super_like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    message: '一緒にカフェ巡りしませんか？',
  },
  {
    id: 'sent_reaction_9',
    fromUserId: 'current_user',
    toUserId: 'user13',
    type: 'footprint' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
  },
  {
    id: 'sent_reaction_10',
    fromUserId: 'current_user',
    toUserId: 'user14',
    type: 'like' as const,
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
  }
];

// ランダムな画像URLを生成する関数
export const getRandomUserImage = (userId: string): string => {
  // userIdから一貫性のある画像を生成（同じユーザーは同じ画像）
  const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const imageId = (hash % 99) + 1;
  const isMale = hash % 2 === 0;
  const gender = isMale ? 'men' : 'women';

  return `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`;
};

// 各ユーザーの画像URLを取得する関数
export const getUserImageUrl = (userId: string): string => {
  return getRandomUserImage(userId);
}; 

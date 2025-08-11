// src/mock/chatMock.ts
// 💬 チャットサービスのモックデータ

export const mockChatMessages = [
  {
    id: 'msg_1',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'こんにちは！プロフィールを見させていただきました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'text' as const,
  },
  {
    id: 'msg_2',
    chatId: 'chat_123',
    senderId: 'my-user-id',
    content: 'はじめまして！私も音楽が好きです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: 'text' as const,
  },
  {
    id: 'msg_3',
    chatId: 'chat_123',
    senderId: 'user2',
    content: '素敵ですね！どんな音楽がお好きですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: 'text' as const,
  },
  {
    id: 'msg_4',
    chatId: 'chat_456',
    senderId: 'user3',
    content: 'カフェでお会いできて良かったです！',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: 'text' as const,
  },
  {
    id: 'msg_5',
    chatId: 'chat_789',
    senderId: 'user4',
    content: '明日の予定はどうですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: 'text' as const,
  },
  {
    id: 'msg_6',
    chatId: 'chat_789',
    senderId: 'my-user-id',
    content: '明日は空いています！どこかおすすめの場所はありますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: 'text' as const,
  },
  {
    id: 'msg_7',
    chatId: 'chat_101',
    senderId: 'user5',
    content: 'こんばんは！今日はありがとうございました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: 'text' as const,
  },
  {
    id: 'msg_8',
    chatId: 'chat_101',
    senderId: 'my-user-id',
    content: 'こちらこそ！またお会いできるのを楽しみにしています。',
    timestamp: new Date(Date.now() - 1000 * 60 * 175),
    type: 'text' as const,
  },
  {
    id: 'msg_9',
    chatId: 'chat_202',
    senderId: 'user6',
    content: '写真を送りますね！',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    type: 'image' as const,
  },
  {
    id: 'msg_10',
    chatId: 'chat_202',
    senderId: 'my-user-id',
    content: 'ありがとうございます！とても素敵な写真ですね。',
    timestamp: new Date(Date.now() - 1000 * 60 * 295),
    type: 'text' as const,
  },
];

export const mockChatRooms = [
  {
    id: 'chat_123',
    participants: ['my-user-id', 'user2'],
    lastMessage: mockChatMessages[2], // 最新のメッセージ
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 'chat_456',
    participants: ['my-user-id', 'user3'],
    lastMessage: mockChatMessages[3],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 'chat_789',
    participants: ['my-user-id', 'user4'],
    lastMessage: mockChatMessages[5],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'chat_101',
    participants: ['my-user-id', 'user5'],
    lastMessage: mockChatMessages[7],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 175),
  },
  {
    id: 'chat_202',
    participants: ['my-user-id', 'user6'],
    lastMessage: mockChatMessages[9],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5日前
    updatedAt: new Date(Date.now() - 1000 * 60 * 295),
  },
];

// ユーザー情報のモックデータ
export const mockUsers = [
  {
    id: 'user1',
    name: '田中太郎',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    isOnline: true,
  },
  {
    id: 'user2',
    name: '佐藤花子',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    isOnline: false,
  },
  {
    id: 'user3',
    name: '鈴木一郎',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    isOnline: true,
  },
  {
    id: 'user4',
    name: '高橋美咲',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    isOnline: false,
  },
  {
    id: 'user5',
    name: '伊藤健太',
    avatar: 'https://i.pravatar.cc/150?u=user5',
    isOnline: true,
  },
  {
    id: 'user6',
    name: '渡辺愛',
    avatar: 'https://i.pravatar.cc/150?u=user6',
    isOnline: false,
  },
]; 

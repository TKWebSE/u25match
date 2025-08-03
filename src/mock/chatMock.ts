// src/mock/chatMock.ts
// 💬 チャットサービスのモックデータ

export const mockChatMessages = [
  {
    id: 'msg_1',
    chatId: 'chat_123',
    senderId: 'user1',
    content: 'こんにちは！プロフィールを見させていただきました。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'text' as const,
  },
  {
    id: 'msg_2',
    chatId: 'chat_123',
    senderId: 'user2',
    content: 'はじめまして！私も音楽が好きです。',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: 'text' as const,
  },
  {
    id: 'msg_3',
    chatId: 'chat_123',
    senderId: 'user1',
    content: '素敵ですね！どんな音楽がお好きですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: 'text' as const,
  },
];

export const mockChatRooms = [
  {
    id: 'chat_123',
    participants: ['user1', 'user2'],
    lastMessage: mockChatMessages[mockChatMessages.length - 1],
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 'chat_456',
    participants: ['user1', 'user3'],
    lastMessage: {
      id: 'msg_4',
      chatId: 'chat_456',
      senderId: 'user3',
      content: 'カフェでお会いできて良かったです！',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      type: 'text' as const,
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 180),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
]; 

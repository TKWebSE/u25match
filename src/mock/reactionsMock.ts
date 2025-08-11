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
]; 

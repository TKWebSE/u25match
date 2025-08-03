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
]; 

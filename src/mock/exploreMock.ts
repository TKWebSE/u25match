// src/mock/exploreMock.ts
// 🔍 探索サービスのモックデータ

export const mockUserRecommendations = [
  {
    uid: 'user1',
    name: '田中太郎',
    age: 25,
    bio: '音楽が好きです。特にロックとジャズを聴きます。',
    images: [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/men/2.jpg',
    ],
    tags: ['music', 'coffee', 'jazz'],
    distance: 2.5,
    compatibility: 85,
  },
  {
    uid: 'user2',
    name: '佐藤花子',
    age: 23,
    bio: '旅行が趣味です。新しい場所を発見するのが大好き。',
    images: [
      'https://randomuser.me/api/portraits/women/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
    ],
    tags: ['travel', 'photography', 'cafe'],
    distance: 1.8,
    compatibility: 92,
  },
  {
    uid: 'user3',
    name: '山田次郎',
    age: 27,
    bio: 'スポーツが好きです。特にサッカーとテニスをしています。',
    images: [
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/men/4.jpg',
    ],
    tags: ['sports', 'gym', 'soccer'],
    distance: 3.2,
    compatibility: 78,
  },
  {
    uid: 'user4',
    name: '鈴木美咲',
    age: 24,
    bio: 'カフェ巡りが好きです。美味しいコーヒーとケーキを探しています。',
    images: [
      'https://randomuser.me/api/portraits/women/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
    ],
    tags: ['cafe', 'food', 'coffee'],
    distance: 0.5,
    compatibility: 88,
  },
];

export const mockSearchResults = {
  users: mockUserRecommendations,
  total: mockUserRecommendations.length,
  hasMore: false,
}; 

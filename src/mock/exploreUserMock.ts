export const users = [
  {
    name: 'さくら',
    age: 24,
    location: '東京',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    isOnline: true,
    lastActiveAt: new Date(Date.now() - 30 * 60 * 1000), // 30分前
  },
  {
    name: 'たけし',
    age: 28,
    location: '大阪',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2時間前
  },
  {
    name: 'みゆき',
    age: 22,
    location: '名古屋',
    imageUrl: 'https://randomuser.me/api/portraits/women/46.jpg',
    isOnline: true,
    lastActiveAt: new Date(Date.now() - 10 * 60 * 1000), // 10分前
  },
  {
    name: 'ひろし',
    age: 26,
    location: '福岡',
    imageUrl: 'https://randomuser.me/api/portraits/men/47.jpg',
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12時間前
  },
  {
    name: 'あやか',
    age: 25,
    location: '札幌',
    imageUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
    isOnline: true,
    lastActiveAt: new Date(Date.now() - 5 * 60 * 1000), // 5分前
  },
  {
    name: 'けんた',
    age: 29,
    location: '仙台',
    imageUrl: 'https://randomuser.me/api/portraits/men/49.jpg',
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3日前
  },
];

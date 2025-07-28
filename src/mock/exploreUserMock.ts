export interface MockUser {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  images: string[];
  isOnline: boolean;
  bio: string;
  tags: string[];
  distance?: number;
  gender: 'male' | 'female';
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'あいか',
    age: 22,
    gender: 'female',
    location: '東京',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    images: [
      'https://randomuser.me/api/portraits/women/44.jpg',
      'https://randomuser.me/api/portraits/women/45.jpg',
    ],
    isOnline: true,
    bio: 'カフェ巡りが趣味です☕️ 音楽フェスも大好き！一緒に楽しい時間を過ごせる人と出会いたいです✨',
    tags: ['カフェ', '音楽', 'フェス', '映画'],
    distance: 2,
  },
  {
    id: '2',
    name: 'ゆうき',
    age: 24,
    gender: 'male',
    location: '大阪',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    images: [
      'https://randomuser.me/api/portraits/men/45.jpg',
      'https://randomuser.me/api/portraits/men/46.jpg',
    ],
    isOnline: false,
    bio: 'プログラミングと筋トレが日課です💪 一緒にジムに行ったり、技術の話ができる人募集中！',
    tags: ['プログラミング', '筋トレ', 'ゲーム', 'アニメ'],
    distance: 5,
  },
  {
    id: '3',
    name: 'みゆき',
    age: 23,
    gender: 'female',
    location: '名古屋',
    imageUrl: 'https://randomuser.me/api/portraits/women/47.jpg',
    images: [
      'https://randomuser.me/api/portraits/women/47.jpg',
      'https://randomuser.me/api/portraits/women/48.jpg',
    ],
    isOnline: true,
    bio: 'イラストを描くのが好きです🎨 美術館やギャラリー巡りも楽しんでいます。アートについて語り合いましょう！',
    tags: ['イラスト', '美術館', 'アート', '読書'],
    distance: 15,
  },
  {
    id: '4',
    name: 'りょうた',
    age: 25,
    gender: 'male',
    location: '福岡',
    imageUrl: 'https://randomuser.me/api/portraits/men/48.jpg',
    images: [
      'https://randomuser.me/api/portraits/men/48.jpg',
      'https://randomuser.me/api/portraits/men/49.jpg',
    ],
    isOnline: true,
    bio: '料理が得意で、新しいレシピに挑戦するのが楽しいです🍳 一緒に美味しいものを食べに行きませんか？',
    tags: ['料理', 'グルメ', '旅行', 'ドライブ'],
    distance: 3,
  },
  {
    id: '5',
    name: 'なな',
    age: 21,
    gender: 'female',
    location: '横浜',
    imageUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
    images: [
      'https://randomuser.me/api/portraits/women/49.jpg',
      'https://randomuser.me/api/portraits/women/50.jpg',
    ],
    isOnline: false,
    bio: 'ダンスと写真撮影が趣味です📸 インスタ映えスポット探しも好きです！一緒に楽しい場所を見つけましょう',
    tags: ['ダンス', '写真', 'インスタ', 'ショッピング'],
    distance: 7,
  },
  {
    id: '6',
    name: 'けんた',
    age: 24,
    gender: 'male',
    location: '京都',
    imageUrl: 'https://randomuser.me/api/portraits/men/50.jpg',
    images: [
      'https://randomuser.me/api/portraits/men/50.jpg',
      'https://randomuser.me/api/portraits/men/51.jpg',
    ],
    isOnline: true,
    bio: 'バスケが大好きで、週末はよくコートにいます🏀 スポーツ観戦も楽しいですね！',
    tags: ['バスケ', 'スポーツ', '映画', 'ゲーム'],
    distance: 12,
  },
];

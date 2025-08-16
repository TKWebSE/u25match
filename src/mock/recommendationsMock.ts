// オススメスクリーン用のモックデータ
export interface RecommendationUser {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  tags: string[];
  isOnline: boolean;
  lastActiveAt: Date;
}

export const mockRecommendationUsers: RecommendationUser[] = [
  {
    id: '1',
    name: '田中花子',
    age: 24,
    location: '東京',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    bio: 'カフェ巡りと写真撮影が好きです。新しい出会いを楽しみにしています。',
    tags: ['カフェ', '写真', '旅行'],
    isOnline: true,
    lastActiveAt: new Date(),
  },
  {
    id: '2',
    name: '佐藤美咲',
    age: 26,
    location: '大阪',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    bio: '音楽ライブに行くのが大好き！一緒に楽しめる人を探しています。',
    tags: ['音楽', 'ライブ', 'アート'],
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2時間前
  },
  {
    id: '3',
    name: '山田愛',
    age: 23,
    location: '福岡',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    bio: '料理とワインが趣味です。一緒に美味しいものを楽しみましょう。',
    tags: ['料理', 'ワイン', 'グルメ'],
    isOnline: true,
    lastActiveAt: new Date(),
  },
  {
    id: '4',
    name: '鈴木さくら',
    age: 25,
    location: '名古屋',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    bio: '読書と映画鑑賞が好きです。心が動く作品について語り合える人を探しています。',
    tags: ['読書', '映画', '文学'],
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1時間前
  },
  {
    id: '5',
    name: '高橋みなみ',
    age: 22,
    location: '札幌',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face',
    bio: 'スノーボードと温泉が大好き！冬のスポーツを一緒に楽しめる人を探しています。',
    tags: ['スノーボード', '温泉', 'アウトドア'],
    isOnline: true,
    lastActiveAt: new Date(),
  },
];

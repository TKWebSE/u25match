import { ProfileDetail } from '@services/profile';

/**
 * 自分のプロフィール詳細用のモックデータ
 * 
 * このモックデータは以下の特徴を持ちます：
 * - 実際のユーザー情報に基づく
 * - 編集可能な状態
 * - 複数の画像を含む
 * - 詳細な自己紹介
 */
export const myProfileMock: ProfileDetail = {
  // 基本情報
  uid: 'my-user-id',
  name: '田中 花子',
  age: 25,
  location: '東京都渋谷区',

  // 画像情報（複数枚）
  images: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  ],

  // 自己紹介（詳細版）
  bio: `こんにちは！田中花子です。🌸

趣味は写真撮影とカフェ巡りです。特に自然風景や街並みの写真を撮るのが好きで、週末はよくカメラを持って出かけています。

最近は新しいカフェを開拓するのにハマっていて、インスタ映えするお店を探すのが楽しみです。お気に入りのカフェがあれば教えてください！

仕事はデザイナーをしていて、主にWebデザインやUI/UXデザインを担当しています。クリエイティブな仕事が大好きで、新しいアイデアを考えるのが得意です。

休日は友達と映画を見に行ったり、美術館巡りをしたりすることが多いです。アートや映画について語り合える人がいたら嬉しいです。

よろしくお願いします！✨`,

  // オンライン状態
  isOnline: true,
  lastActiveAt: new Date(),

  // いいね情報
  likeCount: 42,

  // 詳細情報
  details: {
    height: 160,
    weight: 48,
    bodyType: '普通',
    bloodType: 'O型',
    hometown: '東京都',
    occupation: 'デザイナー',
    education: '美術大学卒業',
    income: '400-500万円',
    familyStructure: '一人暮らし',
    pets: ['なし'],
    languages: ['日本語', '英語'],
    smoking: false,
    drinking: '時々',
    children: 'なし',
    travelPreferences: ['土日'],
    sleepSchedule: '24時頃',
    marriageHistory: 'なし',
    marriageIntention: '真剣に考えている',
    wantChildren: '将来的に欲しい',
  },

  // タグ情報
  tags: [
    { id: 'coffee', name: 'コーヒー好き', imageUrl: 'src/assets/mock-assets/tag-images/coffee.jpg' },
    { id: 'takoparty', name: 'タコパ好き！', imageUrl: 'src/assets/mock-assets/tag-images/takoparty.jpg' },
    { id: 'ramen', name: 'ラーメン愛好家', imageUrl: 'src/assets/mock-assets/tag-images/takoparty.jpg' },
    { id: 'sushi', name: '寿司マニア', imageUrl: 'src/assets/mock-assets/tag-images/coffee.jpg' },
    { id: 'wine', name: 'ワイン好き', imageUrl: 'src/assets/mock-assets/tag-images/party.jpg' },
  ],

  // 本人確認済みフラグ
  isVerified: false,

  // 残数情報
  remainingLikes: 10,
  remainingBoosts: 5,
  remainingPoints: 1000,

  // 会員種別（テスト用に無料会員に設定）
  membershipType: 'free' as const,

  // 作成・更新日時
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
}; 

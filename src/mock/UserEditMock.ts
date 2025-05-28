import { ProfileData } from '@utils/profileDiff';

/**
 * ユーザープロフィール編集画面用のモックデータ
 */
export const mockProfileData: ProfileData = {
  name: '田中太郎',
  age: 25,
  location: '東京都',
  bio: 'こんにちは！趣味は読書と映画鑑賞です。よろしくお願いします。',
  images: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  ],
  tags: [
    { id: '1', name: 'コーヒー好き', imageUrl: '' },
    { id: '2', name: 'ゲームマニア', imageUrl: '' },
    { id: '3', name: 'ライブ大好き', imageUrl: '' },
  ],
  details: {
    height: 170,
    weight: 65,
    bodyType: '普通',
    bloodType: 'A',
    hometown: '東京都',
    occupation: '会社員',
    education: '大学卒業',
    income: '400-500',
    familyStructure: '一人暮らし',
    pets: ['猫'],
    languages: ['日本語', '英語'],
    smoking: false,
    drinking: 'たまに',
    children: 'なし',
    holidayPreferences: ['土日'],
    sleepSchedule: '23:00',
    marriageTimeline: '未定',
    marriageViews: 'お互いを理解し合える関係',
    livingTogether: '結婚後',
    marriageHistory: '独身（結婚経験なし）',
    marriageIntention: '結婚したい',
    wantChildren: '欲しい',
  }
};


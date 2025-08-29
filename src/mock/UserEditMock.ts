import { ProfileData } from '@utils/profileDiff';

/**
 * ユーザープロフィール編集画面用のモックデータ
 */
export const mockProfileData: ProfileData = {
  name: '田中太郎',
  age: 25,
  location: '東京都',
  bio: 'こんにちは！趣味は読書と映画鑑賞です。よろしくお願いします。',
  tags: [
    { id: '1', name: 'コーヒー', imageUrl: '' },
    { id: '2', name: '読書', imageUrl: '' },
    { id: '3', name: '映画', imageUrl: '' },
  ],
  details: {
    height: 170,
    weight: 65,
    bodyType: '普通',
    bloodType: 'A型',
    hometown: '東京都',
    occupation: '会社員',
    education: '大学卒業',
    income: '400万円',
    familyStructure: '一人暮らし',
    pets: ['猫'],
    languages: ['日本語', '英語'],
    smoking: false,
    drinking: 'たまに',
    children: 'なし',
    travelPreferences: ['土日' as const],
    sleepSchedule: '23:00',
    marriageTimeline: '未定',
    marriageViews: 'お互いを理解し合える関係',
    livingTogether: '結婚後',
    marriageHistory: 'なし',
    marriageIntention: 'はい',
    wantChildren: 'はい',
  }
};


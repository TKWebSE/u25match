// 検索画面用のモックデータ
import { User } from '../types/user';

// 検索カテゴリ別のユーザーデータ
export const searchUsersMock: Record<string, User[]> = {
  recommended: generateUsers('recommended', 25),
  online: generateUsers('online', 20),
  nearby: generateUsers('nearby', 18),
  beginner: generateUsers('beginner', 15),
  popular: generateUsers('popular', 22),
  'age18-20': generateUsers('age18-20', 16),
  'age21-25': generateUsers('age21-25', 19),
  student: generateUsers('student', 17),
  working: generateUsers('working', 21),
  sports: generateUsers('sports', 14),
  music: generateUsers('music', 18),
  travel: generateUsers('travel', 13),
};

// ユーザー生成関数
function generateUsers(category: string, count: number): User[] {
  const users: User[] = [];
  const baseNames = [
    '田中', '佐藤', '鈴木', '高橋', '渡辺', '伊藤', '山本', '中村', '小林', '加藤',
    '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '清水', '森',
    '池田', '橋本', '石川', '阿部', '福田', '斎藤', '藤田', '岡田', '中島', '藤原'
  ];

  const locations = [
    '東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', '千葉県', '兵庫県', '福岡県',
    '北海道', '静岡県', '広島県', '茨城県', '京都府', '宮城県', '新潟県', '長野県'
  ];

  const hobbies = [
    '映画鑑賞', '読書', '音楽', 'スポーツ', '料理', '旅行', 'ゲーム', 'アート',
    'ダンス', '写真', 'カフェ巡り', '登山', 'キャンプ', '釣り', 'ジム', 'ヨガ'
  ];

  for (let i = 0; i < count; i++) {
    const nameIndex = i % baseNames.length;
    const locationIndex = Math.floor(Math.random() * locations.length);
    const hobbyIndex = Math.floor(Math.random() * hobbies.length);

    users.push({
      name: `${baseNames[nameIndex]}${i + 1}`,
      age: 18 + Math.floor(Math.random() * 7), // 18-24歳
      location: locations[locationIndex],
      imageUrl: `https://picsum.photos/300/300?random=${category}-${i}`,
      isOnline: category === 'online' ? Math.random() > 0.3 : Math.random() > 0.7,
      lastActiveAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // 過去7日以内
      // 基本的なプロパティのみ使用
    });
  }

  return users;
}


// 全カテゴリのユーザーを取得する関数
export const getAllSearchUsers = (): User[] => {
  return Object.values(searchUsersMock).flat();
};

// 特定のカテゴリのユーザーを取得する関数
export const getUsersByCategory = (category: string): User[] => {
  return searchUsersMock[category] || [];
};

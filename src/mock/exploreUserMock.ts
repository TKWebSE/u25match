// 日本の主要都市リスト
const cities = [
  '東京', '大阪', '名古屋', '福岡', '札幌', '仙台', '横浜', '神戸', '京都', '広島',
  '北九州', '新潟', '千葉', 'さいたま', '静岡', '岡山', '熊本', '鹿児島', '長崎', '金沢'
];

// 日本の名前リスト（男性）
const maleNames = [
  'たけし', 'ひろし', 'けんた', 'ゆうき', 'だいき', 'しょうた', 'りょうた', 'かずき', 'まこと', 'あきら',
  'ともや', 'けんじ', 'ひでお', 'つよし', 'やすし', 'のぶお', 'かずお', 'じゅん', 'たつや', 'まさと',
  'ひろと', 'ゆうと', 'だいすけ', 'しょうご', 'りょうすけ', 'かずと', 'まさき', 'あきと', 'ともき', 'けんご'
];

// 日本の名前リスト（女性）
const femaleNames = [
  'さくら', 'みゆき', 'あやか', 'ゆかり', 'まい', 'はな', 'あい', 'ゆい', 'りん', 'えみ',
  'かおり', 'みき', 'あきこ', 'ゆきこ', 'まゆみ', 'はるか', 'あいか', 'ゆいか', 'りんか', 'えみか',
  'かおりん', 'みきりん', 'あきりん', 'ゆきりん', 'まゆりん', 'はるりん', 'あいりん', 'ゆいりん', 'りんりん', 'えみりん'
];

// ユーザーの型定義
interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  gender: 'male' | 'female';
  createdAt: Date; // 登録日時を追加
}

// ランダムな年齢を生成（18-35歳）
const getRandomAge = () => Math.floor(Math.random() * 18) + 18;

// ランダムな都市を選択
const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];

// ランダムなオンラインステータスを生成
const getRandomLastActiveAt = () => {
  const now = Date.now();
  const randomMinutes = Math.floor(Math.random() * 1440); // 0-24時間
  return new Date(now - randomMinutes * 60 * 1000);
};

// 60人分のユーザーデータを生成
const generateUsers = (): User[] => {
  const users: User[] = [];

  for (let i = 0; i < 60; i++) {
    const isMale = Math.random() > 0.5;
    const names = isMale ? maleNames : femaleNames;
    const name = names[Math.floor(Math.random() * names.length)];
    const age = getRandomAge();
    const location = getRandomCity();
    const lastActiveAt = getRandomLastActiveAt();

    // 登録日時を設定（一番上は今日、他は過去）
    let createdAt: Date;
    if (i === 0) {
      // 一番上に表示されるユーザーは今日登録
      createdAt = new Date();
    } else {
      // 他のユーザーは過去1ヶ月以内に登録
      const daysAgo = Math.floor(Math.random() * 30) + 1; // 1-30日前
      createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
    }

    // ランダムユーザーAPIの画像ID（1-99）
    const imageId = Math.floor(Math.random() * 99) + 1;
    const gender = isMale ? 'men' : 'women';

    users.push({
      name,
      age,
      location,
      imageUrl: `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`,
      isOnline: Math.random() > 0.7, // 30%の確率でオンライン
      lastActiveAt,
      gender: isMale ? 'male' : 'female',
      createdAt,
    });
  }

  return users;
};

export const users = generateUsers();
export type { User };


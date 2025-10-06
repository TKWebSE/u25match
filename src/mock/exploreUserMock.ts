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

// 60人分のユーザーデータを生成（エクスプローラー画面用）
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

// 20人分のリアクション用ユーザーデータを生成
const generateReactionUsers = (): User[] => {
  const reactionUsers: User[] = [];

  for (let i = 0; i < 20; i++) {
    const isMale = Math.random() > 0.5;
    const names = isMale ? maleNames : femaleNames;
    const name = names[Math.floor(Math.random() * names.length)];
    const age = getRandomAge();
    const location = getRandomCity();
    const lastActiveAt = getRandomLastActiveAt();

    // 登録日時を設定（リアクション画面用）
    let createdAt: Date;
    if (i < 3) {
      // 最初の3人は新規ユーザー（1週間以内）
      const daysAgo = Math.floor(Math.random() * 7); // 0-6日前
      createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
    } else {
      // 他のユーザーは過去1ヶ月以内に登録
      const daysAgo = Math.floor(Math.random() * 30) + 7; // 7-36日前
      createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);
    }

    // ランダムユーザーAPIの画像ID（1-99）
    const imageId = Math.floor(Math.random() * 99) + 1;
    const gender = isMale ? 'men' : 'women';

    reactionUsers.push({
      name,
      age,
      location,
      imageUrl: `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`,
      isOnline: Math.random() > 0.6, // 40%の確率でオンライン（リアクション画面では少し高め）
      lastActiveAt,
      gender: isMale ? 'male' : 'female',
      createdAt,
    });
  }

  return reactionUsers;
};

// タブ別の固定ユーザーデータを生成（動作確認・UI確認用）
const generateTabUsers = () => {
  const baseUsers = generateUsers();

  return {
    // おすすめタブ - 上位15人を固定（名前プレフィックス付き）
    recommended: baseUsers.slice(0, 15).map((user, index) => ({
      ...user,
      name: `【おすすめ】${user.name}`,
      isOnline: true, // おすすめは常にオンライン表示
    })),

    // 初心者タブ - 16-30番目のユーザー（新規ユーザー風）
    beginner: baseUsers.slice(15, 30).map((user, index) => ({
      ...user,
      name: `【新規】${user.name}`,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // 1週間以内
    })),

    // オンラインタブ - 31-45番目のユーザー（オンライン状態）
    online: baseUsers.slice(30, 45).map((user, index) => ({
      ...user,
      name: `【オンライン】${user.name}`,
      isOnline: true,
    })),

    // 近くのユーザータブ - 46-60番目のユーザー（近場ユーザー風）
    nearby: baseUsers.slice(45, 60).map((user, index) => ({
      ...user,
      name: `【近場】${user.name}`,
      location: ['東京', '大阪', '名古屋', '横浜', '京都'][index % 5], // 近場の都市に固定
    })),
  };
};

export const users = generateUsers();
export const reactionUsers = generateReactionUsers(); // リアクション画面用の20人分
export const tabUsers = generateTabUsers(); // タブ別ユーザーデータ
export type { User };


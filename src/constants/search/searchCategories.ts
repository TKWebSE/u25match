// 検索カテゴリに関する共有定数と型
// - 画面やモーダルで共通利用するため、ここで定義/集約する
// - 表示順が意味を持つため、配列の並びは変更に注意する
import type { SearchCategory } from '@my-types/app/search';

// プレミアム対象となるカテゴリのキー一覧
// - 判定は利用側で includes を使って行う
// - 定数自体は表示/文言とは独立
export const premiumSearchCategories = ['student', 'working', 'marriage'] as const;
export type PremiumSearchCategory = typeof premiumSearchCategories[number];

// モーダルに表示する基本カテゴリ（表示順固定）
// - 文言/アイコン/プレミアム要否を含む
// - タグ由来カテゴリは別途動的に結合する（本配列には含めない）
export const basicSearchCategories: Readonly<SearchCategory[]> = [
  { key: 'recommended', title: '⭐ おすすめ', icon: 'star', isPremiumRequired: false },
  { key: 'online', title: '🟢 オンライン', icon: 'circle', isPremiumRequired: false },
  { key: 'beginner', title: '🌱 ビギナー', icon: 'new-releases', isPremiumRequired: false },
  { key: 'popular', title: '🔥 人気', icon: 'whatshot', isPremiumRequired: false },
  { key: 'nearby', title: '📍 近くの人', icon: 'location-on', isPremiumRequired: false },
  { key: 'student', title: '🎓 学生', icon: 'school', isPremiumRequired: true },
  { key: 'working', title: '💼 社会人', icon: 'work', isPremiumRequired: true },
  { key: 'marriage', title: '💍 結婚したい', icon: 'favorite', isPremiumRequired: true },
];



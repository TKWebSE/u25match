// src/components/search/common/utils/categoryUtils.ts
// カテゴリ関連のユーティリティ関数

export const getCategoryTitle = (categoryKey: string | null): string => {
  if (!categoryKey) return '検索結果';

  // ユーザータグカテゴリの場合
  if (categoryKey.startsWith('tag-')) {
    return 'あなたのタグで検索';
  }

  // 基本カテゴリのマッピング
  const categoryTitles: { [key: string]: string } = {
    'recommended': '⭐ おすすめ',
    'online': '🟢 オンライン',
    'beginner': '🌱 ビギナー',
    'popular': '🔥 人気',
    'nearby': '📍 近くの人',
    'student': '🎓 学生',
    'working': '💼 社会人',
  };

  return categoryTitles[categoryKey] || '検索結果';
};

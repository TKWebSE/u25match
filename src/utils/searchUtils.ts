// src/utils/searchUtils.ts
// 検索関連のユーティリティ関数

import { myProfileMock } from '@mock/myProfileMock';

export const getCategoryTitle = (categoryKey: string | null): string => {
  if (!categoryKey) return '検索結果';

  // ユーザータグカテゴリの場合
  if (categoryKey.startsWith('tag-')) {
    const tagId = categoryKey.replace('tag-', '');
    const userTag = myProfileMock.tags?.find(tag => tag.id === tagId);
    return userTag ? `🏷️ ${userTag.name}` : 'あなたのタグで検索';
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
    'marriage': '💍 結婚したい',
  };

  return categoryTitles[categoryKey] || '検索結果';
};

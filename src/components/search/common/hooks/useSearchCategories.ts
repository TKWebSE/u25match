// src/components/search/common/hooks/useSearchCategories.ts
// 検索カテゴリを管理するカスタムフック

import { myProfileMock } from '@mock/myProfileMock';
import { useMemo } from 'react';
import { SearchCategory } from '../types';

export const useSearchCategories = () => {
  const searchCategories = useMemo(() => {
    // ユーザーの設定タグから動的にカテゴリを生成
    const getUserTagCategories = (): SearchCategory[] => {
      const userTags = myProfileMock.tags || [];
      return userTags.map((tag, index) => ({
        key: `tag-${tag.id}`,
        title: `🏷️ ${tag.name}好き`,
        icon: 'favorite',
      }));
    };

    // 基本的なカテゴリ（指定された順序）
    const basicCategories: SearchCategory[] = [
      { key: 'recommended', title: '⭐ おすすめ', icon: 'star' },
      { key: 'online', title: '🟢 オンライン', icon: 'circle' },
      { key: 'beginner', title: '🌱 ビギナー', icon: 'new-releases' },
      { key: 'popular', title: '🔥 人気', icon: 'whatshot' },
      { key: 'nearby', title: '📍 近くの人', icon: 'location-on' },
      { key: 'student', title: '🎓 学生', icon: 'school' },
      { key: 'working', title: '💼 社会人', icon: 'work' },
    ];

    // ユーザータグカテゴリと基本カテゴリを結合（ユーザータグを最後に配置）
    return [...basicCategories, ...getUserTagCategories()];
  }, []);

  return { searchCategories };
};

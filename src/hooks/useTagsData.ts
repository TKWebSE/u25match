import { tagCategories, TagCategory, tagDataMap } from '@constants/tagDataMap';
import { useMemo } from 'react';

// タグの型定義
export interface Tag {
  id: string;
  name: string;
  imageUrl: string;
  userCount: number;
  category: string;
}

// 実際のタグデータから動的に生成
const generateTagsFromDataMap = (): Tag[] => {
  return Object.entries(tagDataMap).map(([key, data], index) => ({
    id: key,
    name: data.description,
    imageUrl: '',
    userCount: Math.floor(Math.random() * 200) + 50, // 50-250のランダムな人数
    category: data.category,
  }));
};

// タグデータを管理するカスタムフック
export const useTagsData = () => {
  const { allTags, categorizedTags } = useMemo(() => {
    const all = generateTagsFromDataMap();
    const categorized = Object.keys(tagCategories).reduce((acc, category) => {
      acc[category as TagCategory] = all.filter(tag => tag.category === category);
      return acc;
    }, {} as Record<TagCategory, Tag[]>);
    return { allTags: all, categorizedTags: categorized };
  }, []);

  return { allTags, categorizedTags };
};

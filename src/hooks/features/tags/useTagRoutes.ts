import { useState } from 'react';

export interface TabRoute {
  key: string;
  title: string;
}

// タブルートを管理するカスタムフック
export const useTagRoutes = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState<TabRoute[]>([
    { key: 'all', title: 'すべて' },
    { key: 'food', title: '🍽️ 食べ物' },
    { key: 'hobby', title: '🎮 趣味' },
    { key: 'entertainment', title: '🎵 エンタメ' },
    { key: 'pets', title: '🐾 ペット' },
    { key: 'sports', title: '⚽ スポーツ' },
    { key: 'travel', title: '✈️ 旅行' },
    { key: 'art', title: '🎨 アート' },
    { key: 'tech', title: '💻 テック' },
    { key: 'lifestyle', title: '🌱 ライフ' },
    { key: 'business', title: '💼 ビジネス' },
  ]);

  return { index, setIndex, routes };
};

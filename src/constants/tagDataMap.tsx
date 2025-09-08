// src/constants/tagDataMap.ts

export const tagDataMap = {
  coffee: {
    image: require('@assets/tag-images/coffee.jpg'),
    description: 'コーヒー好き',
    category: 'food',
  },
  takoparty: {
    image: require('@assets/tag-images/takoparty.jpg'),
    description: 'タコパ好き！',
    category: 'food',
  },
  game: {
    image: require('@assets/tag-images/game.jpg'),
    description: 'ゲームマニア',
    category: 'hobby',
  },
  musiclive: {
    image: require('@assets/tag-images/musiclive.jpg'),
    description: 'ライブ大好き',
    category: 'entertainment',
  },
  dog: {
    image: require('@assets/tag-images/dog.jpg'),
    description: '犬大好き',
    category: 'pets',
  },
  cat: {
    image: require('@assets/tag-images/cat.jpg'),
    description: '猫大好き',
    category: 'pets',
  },
} as const;

export type TagKey = keyof typeof tagDataMap;

// カテゴリの定義
export const tagCategories = {
  food: '食べ物・飲み物',
  hobby: '趣味・娯楽',
  entertainment: 'エンターテイメント',
  pets: 'ペット・動物',
} as const;

export type TagCategory = keyof typeof tagCategories; 

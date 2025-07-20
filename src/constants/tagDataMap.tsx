// src/constants/tagData.ts

export const tagDataMap = {
  tag1: {
    image: require('./assets/tag1.png'),
    description: 'スポーツ好き',
  },
  tag2: {
    image: require('./assets/tag2.png'),
    description: '読書好き',
  },
  tag3: {
    image: require('./assets/tag3.png'),
    description: '音楽マニア',
  },
} as const;

export type TagKey = keyof typeof tagDataMap; 

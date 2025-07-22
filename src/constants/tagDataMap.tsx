// src/constants/tagDataMap.ts

export const tagDataMap = {
  coffee: {
    image: require('@assets/tag-images/coffee.jpg'),
    description: 'コーヒー好き',
  },
  takoparty: {
    image: require('@assets/tag-images/takoparty.jpg'),
    description: 'タコパ好き！',
  },
  game: {
    image: require('@assets/tag-images/game.jpg'),
    description: 'ゲームマニア',
  },
  musiclive: {
    image: require('@assets/tag-images/musiclive.jpg'),
    description: 'ライブ大好き',
  },
  dog: {
    image: require('@assets/tag-images/dog.jpg'),
    description: '犬大好き',
  },
  cat: {
    image: require('@assets/tag-images/cat.jpg'),
    description: '猫大好き',
  },
} as const;

export type TagKey = keyof typeof tagDataMap; 

// src/types/tagtype.ts
export type TagKey = 'tag1' | 'tag2' | 'tag3';

export type TagInfo = {
  image: any;
  description: string;
};

export type TagDataMap = {
  [key in TagKey]: TagInfo;
};

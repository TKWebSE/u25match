// src/types/tagtype.ts
import { tagDataMap } from '../constants/tagDataMap';
export type TagKey = [keyof typeof tagDataMap];

export type TagKeys = TagKey[];

export type TagInfo = {
  image: any;
  description: string;
};

export type TagDataMap = {
  [key in TagKey[number]]: TagInfo;
};
// 使ってないファイルだ・・・

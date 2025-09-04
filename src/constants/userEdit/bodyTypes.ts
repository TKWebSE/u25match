/**
 * 体型の定数定義
 * 一般的な体型の分類
 */

export const BODY_TYPES = [
  { code: 'slim', name: '痩せ型' },
  { code: 'normal', name: '普通' },
  { code: 'muscular', name: '筋肉質' },
  { code: 'plump', name: 'ぽっちゃり' },
] as const;

export type BodyTypeCode = typeof BODY_TYPES[number]['code'];
export type BodyTypeName = typeof BODY_TYPES[number]['name'];

/**
 * 体型コードから体型名を取得
 */
export const getBodyTypeName = (code: BodyTypeCode): BodyTypeName | undefined => {
  return BODY_TYPES.find(bt => bt.code === code)?.name;
};

/**
 * 体型名から体型コードを取得
 */
export const getBodyTypeCode = (name: BodyTypeName): BodyTypeCode | undefined => {
  return BODY_TYPES.find(bt => bt.name === name)?.code;
};

/**
 * 体型の選択肢を取得（セレクター用）
 */
export const getBodyTypeOptions = () => {
  return BODY_TYPES.map(bodyType => ({
    label: bodyType.name,
    value: bodyType.code,
  }));
};

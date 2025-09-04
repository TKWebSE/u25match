/**
 * 同居人の定数定義
 * 家族構成や同居人の状況を表すパターン
 */

export const FAMILY_STRUCTURE = [
  { code: 'alone', name: '一人暮らし' },
  { code: 'parents', name: '両親と同居' },
  { code: 'mother', name: '母親と同居' },
  { code: 'father', name: '父親と同居' },
  { code: 'siblings', name: '兄弟姉妹と同居' },
  { code: 'grandparents', name: '祖父母と同居' },
  { code: 'relatives', name: '親戚と同居' },
  { code: 'roommates', name: 'ルームメイトと同居' },
  { code: 'partner', name: 'パートナーと同居' },
  { code: 'other', name: 'その他' },
] as const;

export type FamilyStructureCode = typeof FAMILY_STRUCTURE[number]['code'];
export type FamilyStructureName = typeof FAMILY_STRUCTURE[number]['name'];

/**
 * 同居人コードから同居人名を取得
 */
export const getFamilyStructureName = (code: FamilyStructureCode): FamilyStructureName | undefined => {
  return FAMILY_STRUCTURE.find(fs => fs.code === code)?.name;
};

/**
 * 同居人名から同居人コードを取得
 */
export const getFamilyStructureCode = (name: FamilyStructureName): FamilyStructureCode | undefined => {
  return FAMILY_STRUCTURE.find(fs => fs.name === name)?.code;
};

/**
 * 同居人の選択肢を取得（セレクター用）
 */
export const getFamilyStructureOptions = () => {
  return FAMILY_STRUCTURE.map(familyStructure => ({
    label: familyStructure.name,
    value: familyStructure.code,
  }));
};

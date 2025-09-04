/**
 * ペットの定数定義
 * 飼っているペットの種類を表すパターン
 */

export const PETS = [
  { code: 'dog', name: '犬' },
  { code: 'cat', name: '猫' },
  { code: 'bird', name: '鳥' },
  { code: 'fish', name: '魚' },
  { code: 'hamster', name: 'ハムスター' },
  { code: 'rabbit', name: 'うさぎ' },
  { code: 'reptile', name: '爬虫類' },
  { code: 'other', name: 'その他' },
  { code: 'none', name: 'ペットを飼っていない' },
] as const;

export type PetCode = typeof PETS[number]['code'];
export type PetName = typeof PETS[number]['name'];

/**
 * ペットコードからペット名を取得
 */
export const getPetName = (code: PetCode): PetName | undefined => {
  return PETS.find(pet => pet.code === code)?.name;
};

/**
 * ペット名からペットコードを取得
 */
export const getPetCode = (name: PetName): PetCode | undefined => {
  return PETS.find(pet => pet.name === name)?.code;
};

/**
 * ペットの選択肢を取得（セレクター用）
 */
export const getPetOptions = () => {
  return PETS.map(pet => ({
    label: pet.name,
    value: pet.code,
  }));
};

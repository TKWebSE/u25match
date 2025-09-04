/**
 * 血液型の定数定義
 * 一般的な4種類の血液型
 */

export const BLOOD_TYPES = [
    { code: 'A', name: 'A' },
    { code: 'B', name: 'B' },
    { code: 'AB', name: 'AB' },
    { code: 'O', name: 'O' },
] as const;

export type BloodTypeCode = typeof BLOOD_TYPES[number]['code'];
export type BloodTypeName = typeof BLOOD_TYPES[number]['name'];

/**
 * 血液型コードから血液型名を取得
 */
export const getBloodTypeName = (code: BloodTypeCode): BloodTypeName | undefined => {
    return BLOOD_TYPES.find(bt => bt.code === code)?.name;
};

/**
 * 血液型名から血液型コードを取得
 */
export const getBloodTypeCode = (name: BloodTypeName): BloodTypeCode | undefined => {
    return BLOOD_TYPES.find(bt => bt.name === name)?.code;
};

/**
 * 血液型の選択肢を取得（セレクター用）
 */
export const getBloodTypeOptions = () => {
    return BLOOD_TYPES.map(bloodType => ({
        label: bloodType.name,
        value: bloodType.code,
    }));
};

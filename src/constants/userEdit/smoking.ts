/**
 * 喫煙習慣の定数定義
 * 一般的な喫煙レベル
 */

export const SMOKING_LEVELS = [
    { code: 'never', name: '吸わない' },
    { code: 'former', name: 'やめた' },
    { code: 'sometimes', name: 'たまに' },
    { code: 'regular', name: '吸う' },
] as const;

export type SmokingCode = typeof SMOKING_LEVELS[number]['code'];
export type SmokingName = typeof SMOKING_LEVELS[number]['name'];

/**
 * 喫煙コードから喫煙名を取得
 */
export const getSmokingName = (code: SmokingCode): SmokingName | undefined => {
    return SMOKING_LEVELS.find(sm => sm.code === code)?.name;
};

/**
 * 喫煙名から喫煙コードを取得
 */
export const getSmokingCode = (name: SmokingName): SmokingCode | undefined => {
    return SMOKING_LEVELS.find(sm => sm.name === name)?.code;
};

/**
 * 喫煙の選択肢を取得（セレクター用）
 */
export const getSmokingOptions = () => {
    return SMOKING_LEVELS.map(smoking => ({
        label: smoking.name,
        value: smoking.code,
    }));
};

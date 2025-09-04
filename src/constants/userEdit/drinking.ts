/**
 * 飲酒習慣の定数定義
 * 一般的な飲酒レベル
 */

export const DRINKING_LEVELS = [
    { code: 'never', name: '飲まない' },
    { code: 'rarely', name: 'たまに' },
    { code: 'sometimes', name: '時々' },
    { code: 'often', name: 'よく飲む' },
    { code: 'daily', name: '毎日' },
] as const;

export type DrinkingCode = typeof DRINKING_LEVELS[number]['code'];
export type DrinkingName = typeof DRINKING_LEVELS[number]['name'];

/**
 * 飲酒コードから飲酒名を取得
 */
export const getDrinkingName = (code: DrinkingCode): DrinkingName | undefined => {
    return DRINKING_LEVELS.find(dr => dr.code === code)?.name;
};

/**
 * 飲酒名から飲酒コードを取得
 */
export const getDrinkingCode = (name: DrinkingName): DrinkingCode | undefined => {
    return DRINKING_LEVELS.find(dr => dr.name === name)?.code;
};

/**
 * 飲酒の選択肢を取得（セレクター用）
 */
export const getDrinkingOptions = () => {
    return DRINKING_LEVELS.map(drinking => ({
        label: drinking.name,
        value: drinking.code,
    }));
};

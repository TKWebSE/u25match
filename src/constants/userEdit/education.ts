/**
 * 最終学歴の定数定義
 * 一般的な学歴レベル
 */

export const EDUCATION_LEVELS = [
    { code: 'high_school', name: '高校卒業' },
    { code: 'vocational', name: '専門学校卒業' },
    { code: 'junior_college', name: '短期大学卒業' },
    { code: 'university', name: '大学卒業' },
    { code: 'graduate', name: '大学院卒業' },
    { code: 'other', name: 'その他' },
] as const;

export type EducationCode = typeof EDUCATION_LEVELS[number]['code'];
export type EducationName = typeof EDUCATION_LEVELS[number]['name'];

/**
 * 学歴コードから学歴名を取得
 */
export const getEducationName = (code: EducationCode): EducationName | undefined => {
    return EDUCATION_LEVELS.find(ed => ed.code === code)?.name;
};

/**
 * 学歴名から学歴コードを取得
 */
export const getEducationCode = (name: EducationName): EducationCode | undefined => {
    return EDUCATION_LEVELS.find(ed => ed.name === name)?.code;
};

/**
 * 学歴の選択肢を取得（セレクター用）
 */
export const getEducationOptions = () => {
    return EDUCATION_LEVELS.map(education => ({
        label: education.name,
        value: education.code,
    }));
};

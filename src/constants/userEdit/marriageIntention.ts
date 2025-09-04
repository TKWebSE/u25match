/**
 * 結婚の意思の定数定義
 * 結婚に対する意思
 */

export const MARRIAGE_INTENTION_OPTIONS = [
  { code: 'definitely', name: '絶対に結婚したい' },
  { code: 'want', name: '結婚したい' },
  { code: 'maybe', name: '結婚を考えている' },
  { code: 'undecided', name: 'わからない' },
  { code: 'not_now', name: '今は考えていない' },
  { code: 'never', name: '結婚したくない' },
] as const;

export type MarriageIntentionCode = typeof MARRIAGE_INTENTION_OPTIONS[number]['code'];
export type MarriageIntentionName = typeof MARRIAGE_INTENTION_OPTIONS[number]['name'];

/**
 * 結婚の意思コードから結婚の意思名を取得
 */
export const getMarriageIntentionName = (code: MarriageIntentionCode): MarriageIntentionName | undefined => {
  return MARRIAGE_INTENTION_OPTIONS.find(mi => mi.code === code)?.name;
};

/**
 * 結婚の意思名から結婚の意思コードを取得
 */
export const getMarriageIntentionCode = (name: MarriageIntentionName): MarriageIntentionCode | undefined => {
  return MARRIAGE_INTENTION_OPTIONS.find(mi => mi.name === name)?.code;
};

/**
 * 結婚の意思の選択肢を取得（セレクター用）
 */
export const getMarriageIntentionOptions = () => {
  return MARRIAGE_INTENTION_OPTIONS.map(marriageIntention => ({
    label: marriageIntention.name,
    value: marriageIntention.code,
  }));
};

/**
 * 結婚歴の定数定義
 * 結婚経験の有無
 */

export const MARRIAGE_HISTORY_OPTIONS = [
  { code: 'never', name: '独身（結婚経験なし）' },
  { code: 'divorced', name: '離婚済み' },
  { code: 'widowed', name: '死別' },
  { code: 'separated', name: '別居・別居中' },
] as const;

export type MarriageHistoryCode = typeof MARRIAGE_HISTORY_OPTIONS[number]['code'];
export type MarriageHistoryName = typeof MARRIAGE_HISTORY_OPTIONS[number]['name'];

/**
 * 結婚歴コードから結婚歴名を取得
 */
export const getMarriageHistoryName = (code: MarriageHistoryCode): MarriageHistoryName | undefined => {
  return MARRIAGE_HISTORY_OPTIONS.find(mh => mh.code === code)?.name;
};

/**
 * 結婚歴名から結婚歴コードを取得
 */
export const getMarriageHistoryCode = (name: MarriageHistoryName): MarriageHistoryCode | undefined => {
  return MARRIAGE_HISTORY_OPTIONS.find(mh => mh.name === name)?.code;
};

/**
 * 結婚歴の選択肢を取得（セレクター用）
 */
export const getMarriageHistoryOptions = () => {
  return MARRIAGE_HISTORY_OPTIONS.map(marriageHistory => ({
    label: marriageHistory.name,
    value: marriageHistory.code,
  }));
};

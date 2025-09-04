/**
 * 年収の選択肢を定義
 */

export type IncomeName =
  | '200未満'
  | '200-300'
  | '300-400'
  | '400-500'
  | '500-600'
  | '600-700'
  | '700-800'
  | '800-900'
  | '900-1000'
  | '1000以上'
  | '非公開';

export const INCOME_OPTIONS: { value: IncomeName; label: string }[] = [
  { value: '200未満', label: '200未満' },
  { value: '200-300', label: '200-300' },
  { value: '300-400', label: '300-400' },
  { value: '400-500', label: '400-500' },
  { value: '500-600', label: '500-600' },
  { value: '600-700', label: '600-700' },
  { value: '700-800', label: '700-800' },
  { value: '800-900', label: '800-900' },
  { value: '900-1000', label: '900-1000' },
  { value: '1000以上', label: '1000以上' },
  { value: '非公開', label: '非公開' },
];

/**
 * 年収の選択肢を取得
 * @returns 年収の選択肢配列
 */
export const getIncomeOptions = () => INCOME_OPTIONS;

/**
 * 年収のラベルを取得
 * @param value 年収の値
 * @returns 年収のラベル
 */
export const getIncomeLabel = (value: IncomeName): string => {
  const option = INCOME_OPTIONS.find(option => option.value === value);
  return option ? option.label : value;
};

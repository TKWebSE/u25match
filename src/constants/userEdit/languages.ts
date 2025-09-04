/**
 * 言語の定数定義
 * 話せる言語を表すパターン
 */

export const LANGUAGES = [
  { code: 'japanese', name: '日本語' },
  { code: 'english', name: '英語' },
  { code: 'chinese', name: '中国語' },
  { code: 'korean', name: '韓国語' },
  { code: 'spanish', name: 'スペイン語' },
  { code: 'french', name: 'フランス語' },
  { code: 'german', name: 'ドイツ語' },
  { code: 'italian', name: 'イタリア語' },
  { code: 'portuguese', name: 'ポルトガル語' },
  { code: 'russian', name: 'ロシア語' },
  { code: 'arabic', name: 'アラビア語' },
  { code: 'hindi', name: 'ヒンディー語' },
  { code: 'thai', name: 'タイ語' },
  { code: 'vietnamese', name: 'ベトナム語' },
  { code: 'indonesian', name: 'インドネシア語' },
  { code: 'other', name: 'その他' },
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];
export type LanguageName = typeof LANGUAGES[number]['name'];

/**
 * 言語コードから言語名を取得
 */
export const getLanguageName = (code: LanguageCode): LanguageName | undefined => {
  return LANGUAGES.find(lang => lang.code === code)?.name;
};

/**
 * 言語名から言語コードを取得
 */
export const getLanguageCode = (name: LanguageName): LanguageCode | undefined => {
  return LANGUAGES.find(lang => lang.name === name)?.code;
};

/**
 * 言語の選択肢を取得（セレクター用）
 */
export const getLanguageOptions = () => {
  return LANGUAGES.map(language => ({
    label: language.name,
    value: language.code,
  }));
};

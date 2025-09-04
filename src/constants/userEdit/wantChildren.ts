/**
 * 子供が欲しいかの定数定義
 * 子供に対する希望
 */

export const WANT_CHILDREN_OPTIONS = [
  { code: 'definitely', name: '絶対に欲しい' },
  { code: 'want', name: '欲しい' },
  { code: 'maybe', name: '考えている' },
  { code: 'undecided', name: 'わからない' },
  { code: 'not_now', name: '今は考えていない' },
  { code: 'never', name: '欲しくない' },
] as const;

export type WantChildrenCode = typeof WANT_CHILDREN_OPTIONS[number]['code'];
export type WantChildrenName = typeof WANT_CHILDREN_OPTIONS[number]['name'];

/**
 * 子供が欲しいかコードから子供が欲しいか名を取得
 */
export const getWantChildrenName = (code: WantChildrenCode): WantChildrenName | undefined => {
  return WANT_CHILDREN_OPTIONS.find(wc => wc.code === code)?.name;
};

/**
 * 子供が欲しいか名から子供が欲しいかコードを取得
 */
export const getWantChildrenCode = (name: WantChildrenName): WantChildrenCode | undefined => {
  return WANT_CHILDREN_OPTIONS.find(wc => wc.name === name)?.code;
};

/**
 * 子供が欲しいかの選択肢を取得（セレクター用）
 */
export const getWantChildrenOptions = () => {
  return WANT_CHILDREN_OPTIONS.map(wantChildren => ({
    label: wantChildren.name,
    value: wantChildren.code,
  }));
};

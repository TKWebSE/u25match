/**
 * 子供の有無の定数定義
 */

export type ChildrenName =
  | 'なし'
  | 'あり（同居）'
  | 'あり（別居）'
  | '非公開';

export const CHILDREN_OPTIONS: { value: ChildrenName; label: string }[] = [
  { value: 'なし', label: 'なし' },
  { value: 'あり（同居）', label: 'あり（同居）' },
  { value: 'あり（別居）', label: 'あり（別居）' },
  { value: '非公開', label: '非公開' },
] as const;

import { users } from '@mock/exploreUserMock';
import { useMemo, useState } from 'react';

/**
 * ユーザー情報のインターフェース
 */
interface User {
  name: string;        // ユーザー名
  age: number;         // 年齢
  location: string;    // 居住地
  imageUrl: string;    // プロフィール画像URL
  isOnline: boolean;   // オンライン状態
  lastActiveAt: Date;  // 最終アクティブ日時
}

/**
 * ユーザー検索機能を提供するカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - 検索クエリの状態管理（外部から渡された場合はそれを使用）
 * - ユーザーリストのフィルタリング
 * - 検索結果の状態管理
 * - 検索機能の状態判定
 * 
 * @param externalSearchQuery 外部から渡される検索クエリ（オプション）
 * @returns 検索機能に関連する状態と関数
 * 
 * @example
 * ```typescript
 * // 内部で検索クエリを管理する場合
 * const {
 *   searchQuery,
 *   setSearchQuery,
 *   filteredUsers,
 *   hasSearchResults,
 *   hasSearchQuery,
 * } = useUserSearch();
 * 
 * // 外部から検索クエリを受け取る場合
 * const {
 *   filteredUsers,
 *   hasSearchResults,
 *   hasSearchQuery,
 * } = useUserSearch(externalSearchQuery);
 * ```
 */
export const useUserSearch = (externalSearchQuery?: string) => {
  // 検索クエリの状態管理（外部から渡された場合はそれを使用）
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  // 実際に使用する検索クエリを決定
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSearchQuery !== undefined ? () => { } : setInternalSearchQuery;

  // 検索フィルタリング（メモ化してパフォーマンスを最適化）
  const filteredUsers = useMemo(() => {
    // 検索クエリが空の場合は全ユーザーを返す
    if (!searchQuery.trim()) {
      return users;
    }

    // 検索クエリを小文字に変換
    const query = searchQuery.toLowerCase();

    // 名前、居住地、年齢でフィルタリング
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.location.toLowerCase().includes(query) ||
      user.age.toString().includes(query)
    );
  }, [searchQuery]);

  // 検索結果の有無を判定
  const hasSearchResults = filteredUsers.length > 0;

  // 検索クエリの有無を判定
  const hasSearchQuery = searchQuery.trim().length > 0;

  return {
    searchQuery,        // 現在の検索クエリ
    setSearchQuery,     // 検索クエリを設定する関数（外部から渡された場合は空関数）
    filteredUsers,      // フィルタリングされたユーザーリスト
    hasSearchResults,   // 検索結果があるかどうか
    hasSearchQuery,     // 検索クエリが入力されているかどうか
  };
}; 

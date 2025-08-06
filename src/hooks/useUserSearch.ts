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
 * - 検索クエリの状態管理
 * - ユーザーリストのフィルタリング
 * - 検索結果の状態管理
 * - 検索機能の状態判定
 * 
 * @returns 検索機能に関連する状態と関数
 * 
 * @example
 * ```typescript
 * const {
 *   searchQuery,
 *   setSearchQuery,
 *   filteredUsers,
 *   hasSearchResults,
 *   hasSearchQuery,
 * } = useUserSearch();
 * 
 * // 検索クエリを設定
 * setSearchQuery('田中');
 * 
 * // フィルタリングされたユーザーを表示
 * filteredUsers.map(user => <UserCard key={user.name} user={user} />);
 * ```
 */
export const useUserSearch = () => {
  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState('');

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
    setSearchQuery,     // 検索クエリを設定する関数
    filteredUsers,      // フィルタリングされたユーザーリスト
    hasSearchResults,   // 検索結果があるかどうか
    hasSearchQuery,     // 検索クエリが入力されているかどうか
  };
}; 

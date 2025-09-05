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
  gender: 'male' | 'female'; // 性別
  createdAt: Date;     // 登録日時
}

/**
 * タブの種類を定義
 */
export type ExploreTabType = 'search' | 'recommended' | 'new' | 'tags';

/**
 * ユーザー検索機能を提供するカスタムフック
 * 
 * このフックは以下の責務を持ちます：
 * - 検索クエリの状態管理（外部から渡された場合はそれを使用）
 * - タブに応じたユーザーリストのフィルタリング
 * - 検索結果の状態管理
 * - 検索機能の状態判定
 * 
 * @param externalSearchQuery 外部から渡される検索クエリ（オプション）
 * @param activeTab 現在アクティブなタブ（オプション）
 * @returns 検索機能に関連する状態と関数
 */
export const useUserSearch = (externalSearchQuery?: string, activeTab?: ExploreTabType) => {
  // 検索クエリの状態管理（外部から渡された場合はそれを使用）
  const [internalSearchQuery, setInternalSearchQuery] = useState('');

  // 実際に使用する検索クエリを決定
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalSearchQuery !== undefined ? () => { } : setInternalSearchQuery;

  // タブに応じたフィルタリング（メモ化してパフォーマンスを最適化）
  const filteredUsers = useMemo(() => {
    let filteredData = users;

    // タブに応じたフィルタリング
    if (activeTab) {
      switch (activeTab) {
        case 'search':
          // 検索タブ: 検索クエリに基づくフィルタリング
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filteredData = users.filter(user =>
              user.name.toLowerCase().includes(query) ||
              user.location.toLowerCase().includes(query) ||
              user.age.toString().includes(query)
            );
          }
          break;

        case 'recommended':
          // おすすめタブ: オンラインで最近アクティブなユーザーを優先
          filteredData = users
            .filter(user => user.isOnline)
            .sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime())
            .slice(0, 30); // 上位30人を表示
          break;

        case 'new':
          // 新着タブ: 登録日時順（新しい順）
          filteredData = users
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, 40); // 上位40人を表示
          break;

        case 'tags':
          // タグタブ: 特定のタグを持つユーザーを表示（モックデータでは全ユーザーを表示）
          filteredData = users
            .sort((a, b) => {
              // オンライン状態を優先し、その中で最近アクティブな順
              if (a.isOnline && !b.isOnline) return -1;
              if (!a.isOnline && b.isOnline) return 1;
              return b.lastActiveAt.getTime() - a.lastActiveAt.getTime();
            })
            .slice(0, 40); // 上位40人を表示
          break;

        default:
          // デフォルト: 全ユーザー
          filteredData = users;
      }
    } else {
      // タブが指定されていない場合は検索クエリのみでフィルタリング
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredData = users.filter(user =>
          user.name.toLowerCase().includes(query) ||
          user.location.toLowerCase().includes(query) ||
          user.age.toString().includes(query)
        );
      }
    }

    return filteredData;
  }, [searchQuery, activeTab]);

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

// src/usecases/search/searchByCategory.ts
// カテゴリ検索のユースケース - カテゴリに基づいてユーザーを検索する処理を担当

import { getUsersByCategory } from '@mock/searchMock';
import { User } from '@my-types/app/search';

/**
 * カテゴリに基づいてユーザーを検索するユースケース
 * 
 * フロー:
 * 1. カテゴリキーを受け取る
 * 2. モックデータから該当カテゴリのユーザーを取得
 * 3. ユーザーリストを返す
 * 
 * 用途:
 * - サーチボタンを押してカテゴリを選択した時
 * - カテゴリ別ユーザー一覧を表示する際
 * 
 * @param categoryKey - 検索するカテゴリキー（例: 'student', 'working', 'online'）
 * @returns 該当カテゴリのユーザーリスト
 */
export const searchByCategory = (categoryKey: string): User[] => {
  try {
    // モックデータからカテゴリに基づいてユーザーを取得
    const users = getUsersByCategory(categoryKey);

    return users;

  } catch (error: any) {
    throw new Error(`カテゴリ検索に失敗しました: ${error.message}`);
  }
};


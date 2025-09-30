// src/usecases/chat/getChatList.ts
// チャット一覧取得のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { chatStore } from '@stores/chatStore';

/**
 * チャット一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でチャット一覧取得
 * 3. ストアに反映
 * 4. 結果をUIに返却
 */
export const getChatList = async (): Promise<boolean> => {
  try {
    // 現在のユーザーIDを取得
    const currentUser = authStore.getState().user;
    if (!currentUser) {
      throw new Error('ユーザーが認証されていません');
    }

    // ローディング開始
    chatStore.getState().setLoading(true);
    chatStore.getState().clearError();

    // サービス層でチャット一覧取得
    const response = await serviceRegistry.chat.getChatRooms(currentUser.uid);

    // ストアに反映
    chatStore.getState().setChatList(response.data || []);
    chatStore.getState().setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    chatStore.getState().setLoading(false);
    chatStore.getState().setError(error.message || 'チャット一覧の取得に失敗しました');

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'チャット一覧の取得に失敗しました');
  }
};

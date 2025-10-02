// src/usecases/chat/getChatRooms.ts
// チャットルーム一覧取得のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { chatStore } from '@stores/chatStore';

/**
 * チャットルーム一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でチャットルーム一覧取得
 * 3. ストアに反映
 * 4. 結果をUIに返却
 */
export const getChatRooms = async (): Promise<boolean> => {
  const chatStoreState = chatStore.getState();

  try {
    // 現在のユーザーIDを取得（認証済みユーザーのみが到達可能）
    const currentUser = authStore.getState().user!;

    // ローディング開始
    chatStoreState.setLoading(true);

    // サービス層でチャットルーム一覧取得
    const response = await serviceRegistry.chat.getChatRooms(currentUser.uid);

    // ストアに反映
    chatStoreState.setChatRooms(response.data || []);
    chatStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    chatStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'チャットルーム一覧の取得に失敗しました');
  }
};

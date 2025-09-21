// src/usecases/chat/getChatList.ts
// チャット一覧取得のユースケース

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { chatStore } from '@stores/chatStore';

export interface GetChatListResult {
  success: boolean;
  error?: string;
}

/**
 * チャット一覧を取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でチャット一覧取得
 * 3. ストアに反映
 * 4. 結果をUIに返却
 */
export const getChatList = async (): Promise<GetChatListResult> => {
  try {
    // ローディング開始
    chatStore.getState().setLoading(true);
    chatStore.getState().clearError();

    // サービス層でチャット一覧取得
    const chatList = await serviceRegistry.chat.getChatList();

    // ストアに反映
    chatStore.getState().setChatList(chatList);
    chatStore.getState().setLoading(false);

    return { success: true };

  } catch (error: any) {
    console.error('チャット一覧取得エラー:', error);

    // エラー処理
    chatStore.getState().setLoading(false);
    chatStore.getState().setError(error.message || 'チャット一覧の取得に失敗しました');

    return {
      success: false,
      error: error.message || 'チャット一覧の取得に失敗しました'
    };
  }
};

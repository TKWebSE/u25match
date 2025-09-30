// src/usecases/chat/getMessages.ts
// メッセージ取得のユースケース - ビジネスロジックとストア更新を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { chatStore } from '@stores/chatStore';

/**
 * メッセージ取得に必要なデータ
 */
export interface GetMessagesData {
  chatId: string;  // チャットルームID
}

/**
 * メッセージを取得するユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. サービス層でメッセージ取得
 * 3. ストアにメッセージ一覧を設定
 * 4. 結果をUIに返却
 * 
 * @param data - 取得データ（チャットID）
 * @returns 取得成功フラグ
 */
export const getMessages = async (data: GetMessagesData): Promise<boolean> => {
  const { chatId } = data;

  try {
    // ローディング開始（UIにスピナー表示）
    chatStore.getState().setLoading(true);

    // サービス層でメッセージ取得
    const response = await serviceRegistry.chat.getMessages(chatId);

    // ストアにメッセージ一覧を設定
    chatStore.getState().setMessages(response.data || []);
    chatStore.getState().setLoading(false);

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    chatStore.getState().setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'メッセージの取得に失敗しました');
  }
};

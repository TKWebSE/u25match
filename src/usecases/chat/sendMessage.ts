// src/usecases/chat/sendMessage.ts
// メッセージ送信のユースケース - ビジネスロジックとストア更新を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { chatStore } from '@stores/chatStore';

/**
 * メッセージ送信に必要なデータ
 */
export interface SendMessageData {
  chatId: string;           // チャットルームID
  content: string;          // メッセージ内容
  type?: 'text' | 'image';  // メッセージタイプ（デフォルト: text）
}

/**
 * メッセージを送信するユースケース
 * 
 * フロー:
 * 1. ローディング状態を開始
 * 2. サービス層でメッセージ送信
 * 3. 送信成功時、ストアにメッセージを追加
 * 4. 結果をUIに返却
 * 
 * @param data - 送信データ（チャットID・内容・タイプ）
 * @returns 送信成功フラグ
 */
export const sendMessage = async (data: SendMessageData): Promise<boolean> => {
  const { chatId, content, type = 'text' } = data;
  const chatStoreState = chatStore.getState();

  try {
    // ローディング開始（UIにスピナー表示）
    chatStoreState.setLoading(true);

    // サービス層でメッセージ送信
    const message = await serviceRegistry.chat.sendMessage(chatId, content);

    // ストアにメッセージを追加
    chatStoreState.addMessage({
      ...message,
      type,
      timestamp: new Date(),
    });

    return true;

  } catch (error: any) {
    // エラー時のみ手動でストア更新
    chatStoreState.setLoading(false);

    // エラーを再スローして画面側でトースト表示
    throw new Error(error.message || 'メッセージの送信に失敗しました');
  }
};

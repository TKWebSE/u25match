// src/usecases/chat/sendMessage.ts
// メッセージ送信のユースケース - チャット機能のメッセージ送信を担当

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
 * メッセージ送信処理の結果
 */
export interface SendMessageResult {
  success: boolean;    // 送信成功フラグ
  error?: string;      // エラーメッセージ（失敗時のみ）
}

/**
 * メッセージを送信するユースケース
 * 
 * フロー:
 * 1. サービス層でメッセージ送信
 * 2. 送信成功時、ストアにメッセージを追加
 * 3. 結果をUIに返却
 * 
 * @param data - 送信データ（チャットID・内容・タイプ）
 * @returns 送信結果（成功/失敗とエラーメッセージ）
 */
export const sendMessage = async (data: SendMessageData): Promise<SendMessageResult> => {
  const { chatId, content, type = 'text' } = data;

  try {
    // サービス層でメッセージ送信（引数を修正）
    const message = await serviceRegistry.chat.sendMessage(chatId, content, {
      type,
      timestamp: new Date(),
    });

    // ストアにメッセージを追加
    chatStore.getState().addMessage(message);

    return { success: true };

  } catch (error: any) {
    console.error('メッセージ送信エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    chatStore.getState().setError(error.message || 'メッセージの送信に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'メッセージの送信に失敗しました'
    };
  }
};

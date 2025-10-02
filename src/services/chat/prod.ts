// src/services/main/chat/prod.ts
// 🌐 チャットサービスの本番実装

import { ChatResponse, ChatService } from './types';

export class ProdChatService implements ChatService {
  /**
   * 💬 メッセージを送信（本番）
   * @param chatId チャットID
   * @param message メッセージ内容
   * @returns 送信結果
   */
  async sendMessage(chatId: string, message: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`/api/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        throw new Error(`メッセージの送信に失敗しました: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'メッセージの送信に失敗しました');
    }
  }

  /**
   * 📥 メッセージを取得（本番）
   * @param chatId チャットID
   * @returns メッセージ一覧
   */
  async getMessages(chatId: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`/api/chat/${chatId}/messages`);

      if (!response.ok) {
        throw new Error(`メッセージの取得に失敗しました: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'メッセージの取得に失敗しました');
    }
  }

  /**
   * 🏠 チャットルームを作成（本番）
   * @param participants 参加者ID配列
   * @returns 作成されたチャットルーム
   */
  async createChat(participants: string[]): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participants }),
      });

      if (!response.ok) {
        throw new Error(`チャットの作成に失敗しました: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'チャットの作成に失敗しました');
    }
  }

  /**
   * 📋 チャット一覧を取得（本番）
   * @param userId ユーザーID
   * @returns チャットルーム一覧
   */
  async getChatRooms(userId: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`/api/chat?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`チャットルームの取得に失敗しました: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      throw new Error(error.message || 'チャット一覧の取得に失敗しました');
    }
  }
}

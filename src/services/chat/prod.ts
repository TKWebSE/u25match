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
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
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
        throw new Error(`Failed to get messages: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
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
        throw new Error(`Failed to create chat: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
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
        throw new Error(`Failed to get chat rooms: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

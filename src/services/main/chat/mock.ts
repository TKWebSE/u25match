// src/services/main/chat/mock.ts
// 🎭 チャットサービスのモック実装

import { mockChatMessages } from '../../../mock/chatMock';
import { ChatResponse, ChatService } from './types';

export class MockChatService implements ChatService {
  /**
   * 💬 メッセージを送信（モック）
   * @param chatId チャットID
   * @param message メッセージ内容
   * @returns 送信結果
   */
  async sendMessage(chatId: string, message: string): Promise<ChatResponse> {
    await this.simulateNetworkDelay();
    return {
      success: true,
      data: {
        id: `msg_${Date.now()}`,
        chatId,
        content: message,
        timestamp: new Date(),
      },
    };
  }

  /**
   * 📥 メッセージを取得（モック）
   * @param chatId チャットID
   * @returns メッセージ一覧
   */
  async getMessages(chatId: string): Promise<ChatResponse> {
    await this.simulateNetworkDelay();
    // モックデータから該当するチャットのメッセージを取得
    const messages = mockChatMessages.filter(msg => msg.chatId === chatId);
    return {
      success: true,
      data: messages,
    };
  }

  /**
   * 🏠 チャットルームを作成（モック）
   * @param participants 参加者ID配列
   * @returns 作成されたチャットルーム
   */
  async createChat(participants: string[]): Promise<ChatResponse> {
    await this.simulateNetworkDelay();
    const newChatRoom = {
      id: `chat_${Date.now()}`,
      participants,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return {
      success: true,
      data: newChatRoom,
    };
  }

  /**
   * ⏱️ ネットワーク遅延をシミュレート
   */
  private async simulateNetworkDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, Math.random() * 1000 + 500);
    });
  }
} 

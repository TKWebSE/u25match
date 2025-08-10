// src/services/main/chat/mock.ts
// 🎭 チャットサービスのモック実装

import { mockChatMessages, mockChatRooms } from '../../../mock/chatMock';
import { BaseService } from '../../base/BaseService';
import { ChatResponse, ChatService } from './types';

export class MockChatService extends BaseService implements ChatService {
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
   * 📋 チャット一覧を取得（モック）
   * @param userId ユーザーID
   * @returns チャットルーム一覧
   */
  async getChatRooms(userId: string): Promise<ChatResponse> {
    await this.simulateNetworkDelay();
    // モックデータから該当するユーザーが参加しているチャットルームを取得
    const userChatRooms = mockChatRooms.filter(room =>
      room.participants.includes(userId)
    );
    return {
      success: true,
      data: userChatRooms,
    };
  }
} 

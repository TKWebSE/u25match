// src/services/main/chat/index.ts
// 💬 チャットサービスのコントローラー兼エントリーポイント

import { createChatService } from './factory';

/**
 * 🏭 チャットサービスのインスタンス（シングルトン）
 * ファクトリーに依存性注入の判定を委託
 */
const chatService = createChatService();

/**
 * 🚪 外部API - コントローラー的な役割
 * この層の責任：
 * 1. 外部からの簡潔なインターフェース提供
 * 2. 内部サービスへの橋渡し
 * 3. エラーハンドリング（必要に応じて）
 */

export const sendMessage = (chatId: string, message: string) => {
  return chatService.sendMessage(chatId, message);
};

export const getMessages = (chatId: string) => {
  return chatService.getMessages(chatId);
};

export const createChat = (participants: string[]) => {
  return chatService.createChat(participants);
};

export const getChatRooms = (userId: string) => {
  return chatService.getChatRooms(userId);
};

// 型定義も再エクスポート
export type { ChatMessage, ChatRoom, ChatService } from './types';


// src/services/main/chat/types.ts
// 🎯 チャットサービスの型定義 - 契約書

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'sticker';
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * 🎯 チャットサービスのインターフェース
 * どんな実装も必ずこの機能を提供する約束
 */
export interface ChatService {
  // メッセージを送信
  sendMessage(chatId: string, message: string, senderId?: string): Promise<ChatResponse>;

  // メッセージを取得
  getMessages(chatId: string): Promise<ChatResponse>;

  // チャットルームを作成
  createChat(participants: string[]): Promise<ChatResponse>;

  // チャット一覧を取得
  getChatRooms(userId: string): Promise<ChatResponse>;
} 

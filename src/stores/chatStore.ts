// src/stores/chatStore.ts
// チャット状態管理ストア

import { create } from 'zustand';

/**
 * チャット関連の状態
 */
interface ChatState {
  chatRooms: any[];         // チャットルーム一覧
  currentRoom: any | null;  // 現在のチャットルーム
  messages: any[];          // メッセージ一覧
  isLoading: boolean;       // ローディング状態
}

/**
 * チャット関連のアクション
 */
interface ChatActions {
  setChatRooms: (chatRooms: any[]) => void;
  setCurrentRoom: (room: any | null) => void;
  setMessages: (messages: any[]) => void;
  addMessage: (message: any) => void;
  setLoading: (loading: boolean) => void;
}

type ChatStore = ChatState & ChatActions;

/**
 * チャットストア
 */
export const chatStore = create<ChatStore>((set) => ({
  // 初期状態
  chatRooms: [],
  currentRoom: null,
  messages: [],
  isLoading: false,

  // アクション
  setChatRooms: (chatRooms) => set({ chatRooms }),
  setCurrentRoom: (currentRoom) => set({ currentRoom }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setLoading: (isLoading) => set({ isLoading }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useChatStore = () => chatStore();

// src/stores/chatStore.ts
// チャット状態管理ストア

import { create } from 'zustand';

/**
 * チャット関連の状態
 */
interface ChatState {
  chatList: any[];          // チャット一覧
  currentChat: any | null;  // 現在のチャット
  messages: any[];          // メッセージ一覧
  isLoading: boolean;       // ローディング状態
  error: string | null;     // エラーメッセージ
}

/**
 * チャット関連のアクション
 */
interface ChatActions {
  setChatList: (chatList: any[]) => void;
  setCurrentChat: (chat: any | null) => void;
  setMessages: (messages: any[]) => void;
  addMessage: (message: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type ChatStore = ChatState & ChatActions;

/**
 * チャットストア
 */
export const chatStore = create<ChatStore>((set) => ({
  // 初期状態
  chatList: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  error: null,

  // アクション
  setChatList: (chatList) => set({ chatList }),
  setCurrentChat: (currentChat) => set({ currentChat }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useChatStore = () => chatStore();

// チャットメッセージの状態管理とAPI通信を行うカスタムフック
// - メッセージの取得・送信
// - ローディング状態の管理
// - エラーハンドリング

import { ChatMessage } from "@services/main/chat/types";
import { ServiceRegistry } from "@services/ServiceRegistry";
import { useEffect, useState } from "react";

export const useChatMessages = (chatUid: string, onError?: (error: string) => void) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('🔧 useChatMessages初期化 - chatUid:', chatUid);

  // チャットメッセージを取得
  useEffect(() => {
    if (!chatUid) return;

    const fetchMessages = async () => {
      try {
        console.log('🔍 メッセージ取得開始 - chatUid:', chatUid);
        setLoading(true);

        // useEffect内でchatServiceを取得（依存配列から除外）
        const chatService = ServiceRegistry.getChatService();
        console.log('🔧 chatService:', chatService);

        const response = await chatService.getMessages(chatUid);

        console.log('📨 メッセージ取得レスポンス:', response);

        if (response.success && response.data) {
          console.log('✅ メッセージ取得成功 - 件数:', response.data.length);
          setMessages(response.data);
        } else {
          console.error('❌ メッセージ取得失敗:', response.error);
          onError?.(response.error || 'メッセージの取得に失敗しました');
        }
      } catch (error) {
        console.error("チャットメッセージの取得エラー:", error);
        onError?.("メッセージの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatUid, onError]);

  // メッセージ送信
  const sendMessage = async (content: string, senderId: string) => {
    try {
      const chatService = ServiceRegistry.getChatService();
      const response = await chatService.sendMessage(chatUid, content, senderId);

      if (response.success && response.data) {
        setMessages(prev => [...prev, response.data]);
        return { success: true };
      } else {
        onError?.(response.error || '送信に失敗しました');
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
      onError?.("送信に失敗しました");
      return { success: false, error: "送信に失敗しました" };
    }
  };

  return {
    messages,
    loading,
    sendMessage,
  };
};

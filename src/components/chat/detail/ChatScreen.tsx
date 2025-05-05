import { useStrictAuth } from "@hooks/useStrictAuth";
import { ChatMessage } from "@services/main/chat/types";
import { ServiceRegistry } from "@services/ServiceRegistry";
import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

type ChatContainerProps = {
  chatUid: string;
  onError?: (error: string) => void;
};

const ChatContainer: React.FC<ChatContainerProps> = ({ chatUid, onError }) => {
  // チャットメッセージの状態管理
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  // キーボードの高さを管理（フォーカス時の位置調整用）
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const user = useStrictAuth();
  const chatService = ServiceRegistry.getChatService();

  // キーボードの高さを監視（フォーカス時の位置ずれを防ぐため）
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // チャットメッセージを取得
  useEffect(() => {
    if (!chatUid) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await chatService.getMessages(chatUid);

        if (response.success && response.data) {
          setMessages(response.data);
        } else {
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
  }, [chatUid, chatService, onError]);

  // メッセージ送信処理
  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSending(true);
    try {
      const response = await chatService.sendMessage(chatUid, input, user.uid);

      if (response.success && response.data) {
        // 新しいメッセージをリストに追加
        setMessages(prev => [...prev, response.data]);
        setInput("");
      } else {
        onError?.(response.error || '送信に失敗しました');
      }
    } catch (error) {
      console.error("メッセージ送信エラー:", error);
      onError?.("送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  // ローディング状態の表示
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>メッセージを読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* キーボードの高さ分だけpaddingBottomを調整してテキストフィールドの位置を制御 */}
      <View style={[styles.chatContainer, { paddingBottom: keyboardHeight }]}>
        <ChatList
          messages={messages}
          currentUserId={user.uid}
        />
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          sending={sending}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ChatContainer; 

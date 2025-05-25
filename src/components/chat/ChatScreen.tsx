import { useStrictAuth } from "@hooks/useStrictAuth";
import { ChatMessage } from "@services/main/chat/types";
import { ServiceRegistry } from "@services/ServiceRegistry";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import ChatInput from "./ChatInput";
import ChatList from "./ChatList";

type ChatScreenProps = {
  chatUid: string;
  onError?: (error: string) => void;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chatUid, onError }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useStrictAuth();
  const chatService = ServiceRegistry.getChatService();

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

  // メッセージ送信
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>メッセージを読み込み中...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.chatContainer}>
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
    </KeyboardAvoidingView>
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

export default ChatScreen; 

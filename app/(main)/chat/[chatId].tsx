import { MobileChatContainer } from "@components/chat/mobile";
import { WebChatContainer } from "@components/chat/web";
import { useChatInput } from "@hooks/useChatInput";
import { useChatMessages } from "@hooks/useChatMessages";
import { useKeyboard } from "@hooks/useKeyboard";
import { useStrictAuth } from "@hooks/useStrictAuth";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();
  const user = useStrictAuth();

  console.log('💬 チャット詳細画面 - chatId:', chatId, 'Platform:', Platform.OS);

  const handleError = useCallback((error: string) => {
    Alert.alert("エラー", error);
  }, []);

  // カスタムフックを使用して状態管理
  const { messages, loading, sendMessage } = useChatMessages(chatId as string, handleError);
  const { input, setInput, sending, clearInput, setSendingState } = useChatInput();
  const { keyboardHeight } = useKeyboard();

  // メッセージ送信処理
  const handleSend = async () => {
    if (!input.trim() || sending) return;

    setSendingState(true);
    try {
      const result = await sendMessage(input, user.uid);
      if (result.success) {
        clearInput();
      }
    } finally {
      setSendingState(false);
    }
  };

  // ローディング状態の表示
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>メッセージを読み込み中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // プラットフォームに応じて適切なコンテナを選択
  const ChatContainer = Platform.OS === 'web' ? WebChatContainer : MobileChatContainer;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatContainer
        messages={messages}
        currentUserId={user.uid}
        input={input}
        setInput={setInput}
        sending={sending}
        onSend={handleSend}
        keyboardHeight={keyboardHeight}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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

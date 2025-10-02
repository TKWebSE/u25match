import { MobileChatContainer } from "@components/chat/detail/mobile";
import { MaterialIcons } from '@expo/vector-icons';
import { useStrictAuth } from "@hooks/auth";
import { useKeyboard } from "@hooks/ui";
import { useChatStore } from "@stores/chatStore";
import { getMessages, sendMessage } from "@usecases/chat";
import { showErrorToast } from "@utils/showToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();
  const user = useStrictAuth();
  const router = useRouter();

  const [input, setInput] = useState('');
  const { keyboardHeight } = useKeyboard();
  const { chatList, messages, isLoading } = useChatStore();

  // 現在のチャットルーム情報を取得
  const currentChatRoom = useMemo(() => {
    return chatList.find(room => room.id === chatId);
  }, [chatList, chatId]);

  // 相手のユーザー名（サービス層から取得済み）
  const otherUserName = currentChatRoom?.otherUserName || 'ユーザー';

  // メッセージ取得
  const fetchMessages = useCallback(async () => {
    try {
      await getMessages({ chatId: chatId as string });
    } catch (error: any) {
      showErrorToast(error.message || 'メッセージの取得に失敗しました');
    }
  }, [chatId]);

  // 初回読み込み
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // メッセージ送信処理
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      await sendMessage({ chatId: chatId as string, content: input });
      setInput('');
    } catch (error: any) {
      showErrorToast(error.message || 'メッセージの送信に失敗しました');
    }
  };

  // ローディング状態の表示
  if (isLoading && messages.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>メッセージを読み込み中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* チャットヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{otherUserName}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <MobileChatContainer
        messages={messages}
        currentUserId={user.uid}
        input={input}
        setInput={setInput}
        sending={isLoading}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
});

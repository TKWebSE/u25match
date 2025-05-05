import { MobileChatContainer } from "@components/chat/detail/mobile";
import { MaterialIcons } from '@expo/vector-icons';
import { useChatInput } from "@hooks/useChatInput";
import { useChatMessages } from "@hooks/useChatMessages";
import { useChatRooms } from "@hooks/useChatRooms";
import { useKeyboard } from "@hooks/useKeyboard";
import { useStrictAuth } from "@hooks/useStrictAuth";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();
  const user = useStrictAuth();
  const router = useRouter();

  console.log('💬 チャット詳細画面 (Native) - chatId:', chatId);

  const handleError = useCallback((error: string) => {
    Alert.alert("エラー", error);
  }, []);

  // カスタムフックを使用して状態管理
  const { messages, loading, sendMessage } = useChatMessages(chatId as string, handleError);
  const { input, setInput, sending, clearInput, setSendingState } = useChatInput();
  const { keyboardHeight } = useKeyboard();
  const { chatRooms } = useChatRooms();

  // 現在のチャットルーム情報を取得
  const currentChatRoom = useMemo(() => {
    return chatRooms.find(room => room.id === chatId);
  }, [chatRooms, chatId]);

  // 相手のユーザーIDを取得
  const otherUserId = useMemo(() => {
    if (!currentChatRoom) return null;
    return currentChatRoom.participants.find(id => id !== user.uid);
  }, [currentChatRoom, user.uid]);

  // 相手の名前を取得（モックデータから）
  const otherUserName = useMemo(() => {
    if (!otherUserId) return 'ユーザー';
    // モックデータから相手の名前を取得
    const mockUsers = [
      { id: 'user1', name: '山田太郎' },
      { id: 'user2', name: '佐藤花子' },
      { id: 'user3', name: '田中次郎' },
    ];
    const mockUser = mockUsers.find(u => u.id === otherUserId);
    return mockUser?.name || `ユーザー${otherUserId}`;
  }, [otherUserId]);

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

import { WebChatContainer } from "@components/chat/detail/web";
import { useStrictAuth } from "@hooks/auth";
import { useChatInput, useChatMessages, useChatRooms } from "@hooks/chat";
import { useDrawerState, useKeyboard } from "@hooks/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams();
  const user = useStrictAuth();
  const router = useRouter();

  console.log('💬 チャット詳細画面 (Web) - chatId:', chatId);

  const handleError = useCallback((error: string) => {
    Alert.alert("エラー", error);
  }, []);

  // カスタムフックを使用して状態管理
  const { messages, loading, sendMessage } = useChatMessages(chatId as string, handleError);
  const { input, setInput, sending, clearInput, setSendingState } = useChatInput();
  const { keyboardHeight } = useKeyboard();
  const { chatRooms } = useChatRooms();
  const { isDrawerOpen, availableWidth, availableHeight, effectiveWidth } = useDrawerState();

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

  // ドロワーの状態に応じた動的スタイル
  const dynamicContainerStyle = {
    ...styles.container,
    ...Platform.select({
      web: {
        width: isDrawerOpen ? `${effectiveWidth}px` : '100vw',
        height: isDrawerOpen ? `${availableHeight}px` : '100vh',
        maxWidth: isDrawerOpen ? `${effectiveWidth}px` : 'none',
        maxHeight: isDrawerOpen ? `${availableHeight}px` : 'none',
      } as any,
    }),
  };

  return (
    <View style={dynamicContainerStyle}>
      {/* Web用のチャットヘッダー */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{otherUserName}</Text>
        </View>
      </View>

      <WebChatContainer
        messages={messages}
        currentUserId={user.uid}
        input={input}
        setInput={setInput}
        sending={sending}
        onSend={handleSend}
        keyboardHeight={keyboardHeight}
        isDrawerOpen={isDrawerOpen}
        availableWidth={effectiveWidth}
        availableHeight={availableHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    maxWidth: 1400,
    marginHorizontal: 'auto',
    ...Platform.select({
      web: {
        height: '100vh' as any,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' as any,
        borderRadius: 8,
        overflow: 'hidden' as any,
        '@media (max-width: 768px)': {
          maxWidth: '100%',
          borderRadius: 0,
          height: '100vh',
        } as any,
        '@media (min-width: 1200px)': {
          maxWidth: 1200,
        } as any,
        '@media (min-width: 1600px)': {
          maxWidth: 1400,
        } as any,
      },
    }),
  },
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
    paddingHorizontal: 32,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' as any,
        '@media (max-width: 768px)': {
          paddingHorizontal: 16,
          paddingVertical: 12,
        } as any,
        '@media (min-width: 1200px)': {
          paddingHorizontal: 40,
          paddingVertical: 24,
        } as any,
        '@media (min-width: 1600px)': {
          paddingHorizontal: 48,
          paddingVertical: 28,
        } as any,
      },
    }),
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    ...Platform.select({
      web: {
        '@media (max-width: 768px)': {
          fontSize: 20,
        },
        '@media (min-width: 1200px)': {
          fontSize: 26,
        },
        '@media (min-width: 1600px)': {
          fontSize: 28,
        },
      },
    }),
  },
});

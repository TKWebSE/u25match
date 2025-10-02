import ChatRoomList from '@components/chat/List/multi/ChatRoomList';
import { LoadingState } from '@components/common';
import { CHAT_ROOM_SCREEN_PATH } from '@constants/routes';
import { ChatRoom } from '@services/chat/types';
import { useChatStore } from '@stores/chatStore';
import { colors, spacing } from '@styles/globalStyles';
import { getChatRooms } from '@usecases/chat';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * チャット画面コンポーネント - チャット一覧を表示（Web版）
 * 
 * 機能:
 * - チャットルーム一覧の表示
 * - ローディング状態の管理
 * - エラー状態の表示
 * - プルトゥリフレッシュ機能
 * - チャット詳細画面への遷移
 */
const ChatListScreenWrapper = () => {
  const router = useRouter();
  const { chatRooms, isLoading } = useChatStore();
  const [refreshing, setRefreshing] = useState(false);

  // チャットルーム一覧を取得
  const fetchChatRooms = async () => {
    try {
      await getChatRooms();
    } catch (error: any) {
      showErrorToast(error.message || 'チャットルーム一覧の取得に失敗しました');
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchChatRooms();
  }, []);

  // チャットルームタップ時の処理
  const handleChatPress = (chatRoom: ChatRoom) => {
    // チャット詳細画面に遷移
    router.push(CHAT_ROOM_SCREEN_PATH(chatRoom.id) as any);
  };

  // プルトゥリフレッシュ時の処理
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchChatRooms();
    setRefreshing(false);
  };

  // ローディング状態の表示
  if (isLoading && chatRooms.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingState message="チャットルーム一覧を読み込み中..." />
      </View>
    );
  }

  // メインコンテンツの表示
  return (
    <View style={styles.container}>
      {/* チャットルーム一覧 */}
      <ChatRoomList
        chatRooms={chatRooms}
        onChatPress={handleChatPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  // メインコンテナのスタイル
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});

export default ChatListScreenWrapper;

import ChatRoomList from '@components/chat/List/multi/ChatRoomList';
import { ErrorState } from '@components/common/ErrorState';
import { LoadingState } from '@components/common/LoadingState';
import { CHAT_ROOM_SCREEN_PATH } from '@constants/routes';
import { useChatRooms } from '@hooks/useChatRooms';
import { ChatRoom } from '@services/main/chat/types';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
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
  const { chatRooms, loading, refreshing, error, refreshChatRooms } = useChatRooms();

  // チャットルームタップ時の処理
  const handleChatPress = (chatRoom: ChatRoom) => {
    // チャット詳細画面に遷移
    router.push(CHAT_ROOM_SCREEN_PATH(chatRoom.id) as any);
  };

  // プルトゥリフレッシュ時の処理
  const handleRefresh = () => {
    refreshChatRooms();
  };

  // ローディング状態の表示
  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingState message="チャット一覧を読み込み中..." />
      </View>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <View style={styles.container}>
        <ErrorState
          error={error}
          onRetry={handleRefresh}
        />
      </View>
    );
  }

  // メインコンテンツの表示
  return (
    <View style={styles.container}>
      {/* チャット一覧 */}
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

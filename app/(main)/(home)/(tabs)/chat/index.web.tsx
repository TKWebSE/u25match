import ChatListScreen from '@components/chat/ChatListScreen';
import { ErrorState } from '@components/common/ErrorState';
import { LoadingState } from '@components/common/LoadingState';
import { CHAT_ROOM_SCREEN_PATH } from '@constants/routes';
import { useChatRooms } from '@hooks/useChatRooms';
import { ChatRoom } from '@services/main/chat/types';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// チャット画面コンポーネント - チャット一覧を表示（Web版）
const ChatListScreenWrapper = () => {
  const router = useRouter();
  const { chatRooms, loading, refreshing, error, refreshChatRooms } = useChatRooms();

  const handleChatPress = (chatRoom: ChatRoom) => {
    // チャット詳細画面に遷移
    router.push(CHAT_ROOM_SCREEN_PATH(chatRoom.id) as any);
  };

  const handleRefresh = () => {
    refreshChatRooms();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingState message="チャット一覧を読み込み中..." />
      </View>
    );
  }

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

  return (
    <View style={styles.container}>
      {/* チャット一覧 */}
      <ChatListScreen
        chatRooms={chatRooms}
        onChatPress={handleChatPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});

export default ChatListScreenWrapper;

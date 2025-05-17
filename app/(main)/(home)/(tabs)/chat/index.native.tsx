import ChatRoomList from '@components/chat/ChatRoomList';
import { ErrorState } from '@components/common/ErrorState';
import { LoadingState } from '@components/common/LoadingState';
import { CHAT_ROOM_SCREEN_PATH } from '@constants/routes';
import { useChatRooms } from '@hooks/useChatRooms';
import { ChatRoom } from '@services/main/chat/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// チャット画面コンポーネント - チャット一覧を表示（モバイル版）
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
      <SafeAreaView style={styles.safeArea}>
        <LoadingState message="チャット一覧を読み込み中..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          error={error}
          onRetry={handleRefresh}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* チャット一覧 */}
      <ChatRoomList
        chatRooms={chatRooms}
        onChatPress={handleChatPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default ChatListScreenWrapper;

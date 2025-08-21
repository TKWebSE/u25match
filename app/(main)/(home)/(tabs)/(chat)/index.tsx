import ChatListScreen from '@components/chat/ChatListScreen';
import { ErrorState } from '@components/common/ErrorState';
import { LoadingState } from '@components/common/LoadingState';
import { useChatRooms } from '@hooks/useChatRooms';
import { ChatRoom } from '@services/main/chat/types';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatListScreenWrapper = () => {
  const router = useRouter();
  const { chatRooms, loading, refreshing, error, refreshChatRooms } = useChatRooms();

  const handleChatPress = (chatRoom: ChatRoom) => {
    console.log('🖱️ チャットタップ:', chatRoom);
    // チャット詳細画面に遷移
    console.log('🚀 遷移先:', chatRoom.id);
    router.push(`/chat/${chatRoom.id}`);
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
    <SafeAreaView style={styles.safeArea}>
      {/* チャット一覧 */}
      <ChatListScreen
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

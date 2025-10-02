import ChatRoomList from '@components/chat/List/multi/ChatRoomList';
import { LoadingState } from '@components/common';
import { CHAT_ROOM_SCREEN_PATH } from '@constants/routes';
import { ChatRoom } from '@services/chat/types';
import { useChatStore } from '@stores/chatStore';
import { getChatList } from '@usecases/chat';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * チャット画面コンポーネント - チャット一覧を表示（モバイル版）
 * 
 * 機能:
 * - チャットルーム一覧の表示
 * - ローディング状態の管理
 * - エラー状態の表示
 * - プルトゥリフレッシュ機能
 * - チャット詳細画面への遷移
 * - SafeAreaViewによる安全エリア対応
 */
const ChatListScreenWrapper = () => {
  const router = useRouter();
  const { chatList, isLoading } = useChatStore();
  const [refreshing, setRefreshing] = useState(false);

  // チャット一覧を取得
  const fetchChatList = async () => {
    try {
      await getChatList();
    } catch (error: any) {
      showErrorToast(error.message || 'チャット一覧の取得に失敗しました');
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchChatList();
  }, []);

  // チャットルームタップ時の処理
  const handleChatPress = (chatRoom: ChatRoom) => {
    // チャット詳細画面に遷移
    router.push(CHAT_ROOM_SCREEN_PATH(chatRoom.id) as any);
  };

  // プルトゥリフレッシュ時の処理
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchChatList();
    setRefreshing(false);
  };

  // ローディング状態の表示
  if (isLoading && chatList.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingState message="チャット一覧を読み込み中..." />
      </SafeAreaView>
    );
  }

  // メインコンテンツの表示
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* チャット一覧 */}
      <ChatRoomList
        chatRooms={chatList}
        onChatPress={handleChatPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  // SafeAreaViewのスタイル（モバイル用）
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

export default ChatListScreenWrapper;

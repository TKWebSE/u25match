// チャットルーム一覧を表示するコンポーネント
// - チャットルームのリスト表示
// - プルトゥリフレッシュ機能
// - 空状態の表示
// - チャット詳細画面への遷移

import { useStrictAuth } from '@hooks/useStrictAuth';
import { ChatRoom } from '@services/main/chat/types';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import EmptyChatMessage from '../detail/EmptyChatMessage';
import ChatListItem from './ChatListItem';

// チャットルームリストのプロパティ型定義
interface ChatRoomListProps {
  chatRooms: ChatRoom[];                    // 表示するチャットルームの配列
  onChatPress: (chatRoom: ChatRoom) => void; // チャットルームタップ時の処理
  onRefresh?: () => void;                   // プルトゥリフレッシュ時の処理
  refreshing?: boolean;                     // リフレッシュ状態
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  chatRooms,
  onChatPress,
  onRefresh,
  refreshing = false,
}) => {
  const user = useStrictAuth();

  // 各チャットルームアイテムのレンダリング関数
  const renderChatItem = ({ item }: { item: ChatRoom }) => (
    <ChatListItem
      chatRoom={item}
      currentUserId={user.uid}
      onPress={onChatPress}
    />
  );

  // 空状態の表示コンポーネント
  const renderEmptyComponent = () => (
    <EmptyChatMessage
      title="チャットがありません"
      subtitle="新しいチャットを開始してみましょう"
      warning=""
    />
  );

  // アイテム間の区切り線
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 78, // アバターの幅 + マージン
  },
});

export default ChatRoomList;

import { useStrictAuth } from '@hooks/useStrictAuth';
import { ChatRoom } from '@services/main/chat/types';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import ChatListItem from './ChatListItem';
import EmptyChatMessage from './EmptyChatMessage';

interface ChatListScreenProps {
  chatRooms: ChatRoom[];
  onChatPress: (chatRoom: ChatRoom) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const ChatListScreen: React.FC<ChatListScreenProps> = ({
  chatRooms,
  onChatPress,
  onRefresh,
  refreshing = false,
}) => {
  const user = useStrictAuth();

  const renderChatItem = ({ item }: { item: ChatRoom }) => (
    <ChatListItem
      chatRoom={item}
      currentUserId={user.uid}
      onPress={onChatPress}
    />
  );

  const renderEmptyComponent = () => (
    <EmptyChatMessage
      title="チャットがありません"
      subtitle="新しいチャットを開始してみましょう"
      warning=""
    />
  );

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

export default ChatListScreen;

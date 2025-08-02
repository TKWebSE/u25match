import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatMessage from "./ChatMessage";
import EmptyChatMessage from "./EmptyChatMessage";

export type ChatMessageType = {
  id: string;
  text: string;
  createdAt: any;
  senderId: string;
  senderName?: string;
};

type ChatListProps = {
  messages: ChatMessageType[];
  currentUserId: string;
  onContentSizeChange?: () => void;
  onScrollToEnd?: () => void;
};

const ChatList: React.FC<ChatListProps> = ({
  messages,
  currentUserId,
  onContentSizeChange,
  onScrollToEnd
}) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // 新しいメッセージが来たら下までスクロール
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleContentSizeChange = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    onContentSizeChange?.();
  };

  const renderMessage = ({ item }: { item: ChatMessageType }) => {
    const isMe = item.senderId === currentUserId;
    const createdAt = item.createdAt?.toDate ? item.createdAt.toDate() : null;

    return (
      <ChatMessage
        text={item.text}
        createdAt={createdAt}
        senderName={item.senderName}
        isMe={isMe}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
      contentContainerStyle={[
        styles.contentContainer,
        messages.length === 0 && styles.emptyContentContainer
      ]}
      onContentSizeChange={handleContentSizeChange}
      ListEmptyComponent={EmptyChatMessage}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    paddingBottom: 80,
    flexGrow: 1,
  },
  emptyContentContainer: {
    justifyContent: 'center',
  },
});

export default ChatList; 

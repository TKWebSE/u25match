import { ChatMessage as ChatMessageType } from "@services/main/chat/types";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatMessageComponent from "./ChatMessage";
import EmptyChatMessage from "./EmptyChatMessage";

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
    const createdAt = item.timestamp;

    return (
      <ChatMessageComponent
        text={item.content}
        createdAt={createdAt}
        senderName={item.senderId === currentUserId ? '自分' : '相手'}
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

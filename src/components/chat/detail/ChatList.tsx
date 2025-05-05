import { mockUsers } from "@mock/chatMock";
import { ChatMessage as ChatMessageType } from "@services/main/chat/types";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import ChatMessageComponent from "./ChatMessage";
import DateSeparator from "./DateSeparator";
import EmptyChatMessage from "./EmptyChatMessage";

// チャットリストのプロパティ型定義
type ChatListProps = {
  messages: ChatMessageType[];        // 表示するメッセージの配列
  currentUserId: string;              // 現在のユーザーID（自分のメッセージ判定用）
  onContentSizeChange?: () => void;   // コンテンツサイズ変更時のコールバック
  onScrollToEnd?: () => void;         // スクロール終了時のコールバック
};

const ChatList: React.FC<ChatListProps> = ({
  messages,
  currentUserId,
  onContentSizeChange,
  onScrollToEnd
}) => {
  const flatListRef = useRef<FlatList>(null);

  // メッセージリストに日付セパレーターを挿入する関数
  const createMessagesWithDateSeparators = () => {
    if (messages.length === 0) return [];

    // メッセージを時系列順（古い順）にソート
    const sortedMessages = [...messages].sort((a, b) => {
      if (!a.timestamp || !b.timestamp) return 0;
      return a.timestamp.getTime() - b.timestamp.getTime();
    });

    const items: any[] = [];
    let lastDate: string | null = null;

    sortedMessages.forEach((message, index) => {
      const messageDate = message.timestamp ? message.timestamp.toDateString() : null;

      // 日付が変わった場合、日付セパレーターを追加
      if (messageDate && messageDate !== lastDate) {
        items.push({
          type: 'dateSeparator',
          id: `date_${messageDate}`,
          date: message.timestamp
        });
        lastDate = messageDate;
      }

      // メッセージを追加
      items.push({
        type: 'message',
        id: message.id,
        message: message
      });
    });

    return items;
  };

  // 新しいメッセージが追加されたときに自動で下までスクロール
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  // コンテンツサイズが変更されたときの処理
  const handleContentSizeChange = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
    onContentSizeChange?.();
  };

  // 各アイテム（メッセージまたは日付セパレーター）のレンダリング関数
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'dateSeparator') {
      return <DateSeparator date={item.date} />;
    }

    // メッセージの場合
    const message = item.message;
    const isMe = message.senderId === currentUserId;
    const createdAt = message.timestamp;

    // 相手のユーザー情報を取得してアバターURLを設定
    const otherUser = mockUsers.find((user: any) => user.id === message.senderId);
    const otherUserImageUrl = otherUser?.avatar;

    return (
      <ChatMessageComponent
        text={message.content}
        createdAt={createdAt}
        isMe={isMe}
        otherUserImageUrl={otherUserImageUrl}
      />
    );
  };

  const itemsWithSeparators = createMessagesWithDateSeparators();

  return (
    <FlatList
      ref={flatListRef}
      data={itemsWithSeparators}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
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
  // メッセージリストのコンテナスタイル
  contentContainer: {
    padding: 12,
    paddingBottom: 100, // テキストフィールドの高さ分の余白を追加
    flexGrow: 1,
  },
  // メッセージが空の場合のコンテナスタイル
  emptyContentContainer: {
    justifyContent: 'center',
  },
});

export default ChatList; 

// Web用チャット画面のレイアウトコンテナ
// - 最大幅制限と中央寄せ
// - Web向けの余白調整
// - キーボード対応は不要
// - モダンなWeb UIデザイン

import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import ChatInput from "../multi/ChatInput";
import ChatList from "../multi/ChatList";

type ChatContainerProps = {
  messages: any[];
  currentUserId: string;
  input: string;
  setInput: (text: string) => void;
  sending: boolean;
  onSend: () => void;
  keyboardHeight: number;
};

const WebChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  currentUserId,
  input,
  setInput,
  sending,
  onSend,
  keyboardHeight,
}) => {
  return (
    <View style={styles.container}>
      {/* Web用のレイアウト（キーボード対応は不要） */}
      <View style={styles.chatArea}>
        <View style={styles.messagesContainer}>
          <ChatList
            messages={messages}
            currentUserId={currentUserId}
          />
        </View>
        <View style={styles.inputContainer}>
          <ChatInput
            value={input}
            onChangeText={setInput}
            onSend={onSend}
            sending={sending}
            disabled={false}
            placeholder="メッセージを入力してください..."
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    ...Platform.select({
      web: {
        display: 'flex',
        flexDirection: 'column',
      },
    }),
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...Platform.select({
      web: {
        height: 'calc(100vh - 80px)' as any, // ヘッダー分を除く
        '@media (max-width: 768px)': {
          height: 'calc(100vh - 70px)',
        } as any,
      },
    }),
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#fff",
    ...Platform.select({
      web: {
        overflow: 'hidden',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e0e0e0',
      },
    }),
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
});

export default WebChatContainer;

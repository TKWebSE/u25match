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
        height: '100%',
      },
    }),
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...Platform.select({
      web: {
        height: 'calc(100vh - 80px)',
        '@media (max-width: 768px)': {
          height: 'calc(100vh - 70px)',
        },
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
        borderColor: '#e8e8e8',
        position: 'relative',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #e8e8e8, transparent)',
        },
      },
    }),
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.06)',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        '@media (max-width: 768px)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
      },
    }),
  },
});

export default WebChatContainer;

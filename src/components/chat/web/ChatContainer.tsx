// Web用チャット画面のレイアウトコンテナ
// - 最大幅制限と中央寄せ
// - Web向けの余白調整
// - キーボード対応は不要

import React from "react";
import { StyleSheet, View } from "react-native";
import ChatInput from "../ChatInput";
import ChatList from "../ChatList";

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
      <View style={styles.chatContainer}>
        <ChatList
          messages={messages}
          currentUserId={currentUserId}
        />
        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={onSend}
          sending={sending}
          disabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    maxWidth: 800, // Web用の最大幅制限
    marginHorizontal: "auto", // 中央寄せ
  },
  chatContainer: {
    flex: 1,
    padding: 16, // Web用の余白
  },
});

export default WebChatContainer;

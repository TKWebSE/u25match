// チャット画面のレイアウトコンテナ（共通版）
// - ChatListとChatInputを配置
// - キーボード対応のレイアウト調整

import React from "react";
import { StyleSheet, View } from "react-native";
import ChatInput from "../web/ChatInput.web";
import ChatList from "./ChatList";

type ChatContainerProps = {
  messages: any[];
  currentUserId: string;
  input: string;
  setInput: (text: string) => void;
  sending: boolean;
  onSend: () => void;
  keyboardHeight: number;
};

const ChatContainer: React.FC<ChatContainerProps> = ({
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
      <View style={[styles.chatContainer, { paddingBottom: keyboardHeight }]}>
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
  },
  chatContainer: {
    flex: 1,
  },
});

export default ChatContainer;

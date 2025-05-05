// モバイル用チャット画面のレイアウトコンテナ
// - キーボード表示時の位置調整
// - モバイル向けの最適化されたレイアウト

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

const MobileChatContainer: React.FC<ChatContainerProps> = ({
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
      {/* モバイル用のキーボード対応レイアウト */}
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

export default MobileChatContainer;

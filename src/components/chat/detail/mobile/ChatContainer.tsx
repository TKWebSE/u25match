/**
 * モバイル用チャット画面のレイアウトコンテナ
 * 
 * 機能:
 * - キーボード表示時の位置調整
 * - モバイル向けの最適化されたレイアウト
 * - チャットリストと入力フィールドの配置
 * - キーボード高さに応じた動的レイアウト調整
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import ChatInput from "../multi/ChatInput";
import ChatList from "../multi/ChatList";

// プロパティの型定義
type ChatContainerProps = {
  messages: any[];                    // チャットメッセージの配列
  currentUserId: string;              // 現在のユーザーID
  input: string;                      // 入力中のテキスト
  setInput: (text: string) => void;   // 入力テキストの更新関数
  sending: boolean;                   // 送信中フラグ
  onSend: () => void;                 // 送信処理の関数
  keyboardHeight: number;             // キーボードの高さ
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
        {/* チャットメッセージリスト */}
        <ChatList
          messages={messages}
          currentUserId={currentUserId}
        />
        {/* チャット入力フィールド */}
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

// スタイル定義
const styles = StyleSheet.create({
  // メインコンテナのスタイル
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // チャットコンテナのスタイル（キーボード対応）
  chatContainer: {
    flex: 1,
  },
});

export default MobileChatContainer;



import React from "react";
import { StyleSheet, Text, View } from "react-native";

// チャットメッセージのプロパティ型定義
type ChatMessageProps = {
  text: string;                    // メッセージの内容
  createdAt?: Date | null;         // 送信日時
  senderName?: string;             // 送信者名（現在は使用していない）
  isMe?: boolean;                  // 自分のメッセージかどうか
  otherUserImageUrl?: string;      // 相手の画像URL（現在は使用していない）
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  createdAt,
  senderName,
  isMe = false,
  otherUserImageUrl,
}) => {
  return (
    <View
      style={[
        styles.bubbleContainer,
        isMe ? styles.bubbleRight : styles.bubbleLeft, // 自分のメッセージは右寄せ、相手は左寄せ
      ]}
    >
      {/* 相手のメッセージの場合のみアバターを表示 */}
      {!isMe && (
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
      )}

      {/* チャットバブル */}
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        <View style={styles.bubbleContent}>
          <Text style={[styles.messageText, isMe && styles.myMessageText]}>{text}</Text>
        </View>
      </View>

      {/* 送信時間（バブルの下側に表示） */}
      <Text style={[styles.timeText, isMe ? styles.timeTextLeft : styles.timeTextLeft]}>
        {createdAt
          ? createdAt instanceof Date
            ? createdAt.toLocaleTimeString() // 日付を時間形式で表示
            : ""
          : ""}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // メッセージ全体のコンテナ（横並びレイアウト）
  bubbleContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },

  // 相手のメッセージ用レイアウト（左寄せ）
  bubbleLeft: {
    justifyContent: "flex-start",
  },

  // 自分のメッセージ用レイアウト（右寄せ）
  bubbleRight: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },

  // チャットバブルの基本スタイル
  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 8,
  },

  // バブル内のコンテンツエリア
  bubbleContent: {
    flex: 1,
  },

  // 相手のアバターコンテナ
  avatarContainer: {
    marginRight: 8,
    justifyContent: 'center',
  },

  // 相手のアバター（現在はグレーの円）
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
  },

  // 自分のメッセージバブル（緑色）
  myBubble: {
    backgroundColor: "#DCF8C6", // LINE風の緑色
    alignSelf: "flex-end",
  },

  // 相手のメッセージバブル（グレー）
  otherBubble: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },

  // 送信者名（現在は使用していない）
  senderName: {
    fontSize: 10,
    color: "#888",
    marginBottom: 2,
  },

  // メッセージテキスト
  messageText: {
    fontSize: 16,
    color: "#222",
  },

  // 送信時間の基本スタイル
  timeText: {
    fontSize: 10,
    color: "#aaa",
    marginTop: 8,        // バブルとの間隔
    alignSelf: "flex-end", // 右寄せ
  },

  // 右寄せ用の時間スタイル（現在は使用していない）
  timeTextRight: {
    alignSelf: "flex-end",
    marginLeft: 8,
  },

  // 左寄せ用の時間スタイル（現在は使用していない）
  timeTextLeft: {
    alignSelf: "flex-start",
    marginRight: 8,
  },

  // 自分のメッセージテキスト（黒文字）
  myMessageText: {
    color: "#222", // 緑色の背景で見やすい黒文字
  },

  // 自分のメッセージの送信者名（現在は使用していない）
  mySenderName: {
    color: "#222", // 緑色の背景で見やすい黒文字
  },
});

export default ChatMessage;

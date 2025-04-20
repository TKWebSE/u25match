import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// チャットメッセージのプロパティ型定義
type ChatMessageProps = {
  text: string;                    // メッセージの内容
  createdAt?: Date | null;         // 送信日時
  isMe?: boolean;                  // 自分のメッセージかどうか
  otherUserImageUrl?: string;      // 相手の画像URL（現在は使用していない）
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  createdAt,
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
          {otherUserImageUrl ? (
            <Image source={{ uri: otherUserImageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
        </View>
      )}

      {/* チャットバブルと送信時間を横並びで表示 */}
      <View style={[
        styles.bubbleAndTimeContainer,
        isMe && styles.myBubbleAndTimeContainer // 自分のメッセージ用のスタイル
      ]}>
        {/* 自分のメッセージの場合は時分を左側に表示 */}
        {isMe && (
          <Text style={styles.timeTextRight}>
            {createdAt
              ? createdAt instanceof Date
                ? `${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}` // 時:分形式で表示
                : ""
              : ""}
          </Text>
        )}

        <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
          <View style={styles.bubbleContent}>
            <Text style={[styles.messageText, isMe && styles.myMessageText]}>{text}</Text>
          </View>
        </View>

        {/* 相手のメッセージの場合は時分を右側に表示 */}
        {!isMe && (
          <Text style={styles.timeTextLeft}>
            {createdAt
              ? createdAt instanceof Date
                ? `${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}` // 時:分形式で表示
                : ""
              : ""}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // メッセージ全体のコンテナ（横並びレイアウト）
  bubbleContainer: {
    flexDirection: "row",
    marginVertical: 6,
    paddingHorizontal: 16,
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
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 8,
  },

  // バブル内のコンテンツエリア
  bubbleContent: {
    flex: 1,
  },

  // バブルと送信時間のコンテナ
  bubbleAndTimeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "75%",
  },

  // 自分のメッセージ用のバブルと時間コンテナ（時分表示スペースを確保）
  myBubbleAndTimeContainer: {
    maxWidth: "84%",
    alignSelf: "flex-end",
    marginRight: 20,
  },

  // 相手のアバターコンテナ
  avatarContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },

  // 相手のアバター（現在はグレーの円）
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
  },

  // 自分のメッセージバブル（ブルー）
  myBubble: {
    backgroundColor: "#2196F3",
    alignSelf: "flex-end",
    marginRight: 20,
  },

  // 相手のメッセージバブル（グレー）
  otherBubble: {
    backgroundColor: "#f1f3f4",
    alignSelf: "flex-start",
  },

  // メッセージテキスト
  messageText: {
    fontSize: 16,
    color: "#222",
    lineHeight: 20,
  },

  // 右寄せ用の時間スタイル（自分のメッセージ - 左側に表示）
  timeTextRight: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
    marginRight: 8,
  },

  // 左寄せ用の時間スタイル（相手のメッセージ - 右側に表示）
  timeTextLeft: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
    marginLeft: 8,
  },

  // 自分のメッセージテキスト（白文字）
  myMessageText: {
    color: "#fff",
  },

  // 自分のメッセージの送信者名（現在は使用していない）
  mySenderName: {
    color: "#222",
  },
});

export default ChatMessage;

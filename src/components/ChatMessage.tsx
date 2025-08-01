

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ChatMessageProps = {
  text: string;
  createdAt?: Date | null;
  senderName?: string;
  isMe?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  createdAt,
  senderName,
  isMe = false,
}) => {
  return (
    <View
      style={[
        styles.bubbleContainer,
        isMe ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        <Text style={styles.senderName}>{isMe ? "自分" : senderName || "相手"}</Text>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timeText}>
          {createdAt
            ? createdAt instanceof Date
              ? createdAt.toLocaleTimeString()
              : ""
            : ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  bubbleLeft: {
    justifyContent: "flex-start",
  },
  bubbleRight: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  myBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherBubble: {
    backgroundColor: "#eee",
    alignSelf: "flex-start",
  },
  senderName: {
    fontSize: 10,
    color: "#888",
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#222",
  },
  timeText: {
    fontSize: 10,
    color: "#aaa",
    alignSelf: "flex-end",
    marginTop: 2,
  },
});

export default ChatMessage;

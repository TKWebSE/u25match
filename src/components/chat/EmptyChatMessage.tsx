import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyChatMessageProps = {
  title?: string;
  subtitle?: string;
  warning?: string;
};

const EmptyChatMessage: React.FC<EmptyChatMessageProps> = ({
  title = "まだメッセージがありません",
  subtitle = "メッセージを送信して会話を始めましょう！",
  warning = "※ チャットは1週間で自動的に削除されます"
}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
      <Text style={styles.emptyWarning}>{warning}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
  },
  emptyWarning: {
    fontSize: 12,
    color: "#ff6b6b",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default EmptyChatMessage; 

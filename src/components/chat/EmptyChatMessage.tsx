// 空状態を表示するコンポーネント
// - メッセージがない場合の表示
// - チャットルームがない場合の表示
// - カスタマイズ可能なタイトル、サブタイトル、警告文

import React from "react";
import { StyleSheet, Text, View } from "react-native";

// 空状態メッセージのプロパティ型定義
type EmptyChatMessageProps = {
  title?: string;    // メインタイトル
  subtitle?: string; // サブタイトル
  warning?: string;  // 警告文
};

const EmptyChatMessage: React.FC<EmptyChatMessageProps> = ({
  title = "まだメッセージがありません",
  subtitle = "メッセージを送信して会話を始めましょう！",
  warning = "※ チャットは1週間で自動的に削除されます"
}) => {
  return (
    <View style={styles.emptyContainer}>
      {/* メインタイトル */}
      <Text style={styles.emptyTitle}>{title}</Text>
      {/* サブタイトル */}
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
      {/* 警告文 */}
      <Text style={styles.emptyWarning}>{warning}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // 空状態コンテナのスタイル
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  // メインタイトルのスタイル
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  // サブタイトルのスタイル
  emptySubtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
  },
  // 警告文のスタイル
  emptyWarning: {
    fontSize: 12,
    color: "#ff6b6b",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default EmptyChatMessage; 

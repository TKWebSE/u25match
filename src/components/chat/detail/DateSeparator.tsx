// 日付セパレーターコンポーネント
// - LINEのような日付の境目を表示
// - メッセージリスト内で日付が変わったときに表示

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DateSeparatorProps = {
  date: Date; // 表示する日付
};

const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  // 日付をフォーマット（例：2024年1月15日）
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 今日かどうかを判定
    const today = new Date();
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    // 昨日かどうかを判定
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate();

    if (isToday) {
      return "今日";
    } else if (isYesterday) {
      return "昨日";
    } else {
      return `${year}年${month}月${day}日`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.dateText}>{formatDate(date)}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  // 日付セパレーターのコンテナ
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  // 左右の線
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  // 日付テキスト
  dateText: {
    fontSize: 12,
    color: "#999",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 8,
  },
});

export default DateSeparator;

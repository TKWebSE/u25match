// src/components/common/LoadingScreen.tsx
// 共通ローディング画面コンポーネント - 各レイアウトで使用される統一されたローディング表示

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingScreenProps {
  message?: string; // ローディングメッセージ（オプション）
  color?: string;   // インジケーターの色（オプション）
}

/**
 * 統一されたローディング画面コンポーネント
 * @param message - 表示するメッセージ（デフォルト: "読み込み中..."）
 * @param color - インジケーターの色（デフォルト: "#007AFF"）
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "読み込み中...",
  color = "#007AFF"
}) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

// src/components/common/LoadingState.tsx
// ローディング状態を表示する共通コンポーネント

import { colors } from '@styles/globalStyles';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingStateProps {
  message?: string; // ローディングメッセージ（デフォルト: '読み込み中...'）
  color?: string;   // ローディングインジケーターの色（デフォルト: colors.primary）
}

/**
 * ローディング状態を表示するコンポーネント
 * - 中央にActivityIndicatorとメッセージを表示
 * - カスタマイズ可能なメッセージと色
 * - 全画面表示用のレイアウト
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = '読み込み中...',
  color = colors.primary
}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ローディングコンテナのスタイル
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  // ローディングメッセージのスタイル
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
}); 

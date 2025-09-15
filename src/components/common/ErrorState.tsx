import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  error: string | null;          // エラーメッセージ
  onRetry: () => void;          // 再試行ボタンのハンドラー
  fallbackMessage?: string;     // デフォルトメッセージ
}

/**
 * エラー状態表示コンポーネント
 * エラーメッセージと再試行ボタンを表示
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  fallbackMessage = 'データが見つかりません'
}) => {
  return (
    <View style={styles.errorContainer}>
      {/* エラーメッセージ表示 */}
      <Text style={styles.errorText}>{error || fallbackMessage}</Text>

      {/* 再試行ボタン */}
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>再試行</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    // シャドウ効果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 

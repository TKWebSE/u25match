// src/components/common/ErrorState.tsx
// エラー状態表示コンポーネント

import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showBackButton?: boolean;
}

/**
 * エラー状態を表示するコンポーネント
 * 
 * @param message - エラーメッセージ（デフォルト: 'エラーが発生しました'）
 * @param onRetry - リトライボタンが押された時の処理（指定しない場合は戻るボタンのみ）
 * @param showBackButton - 戻るボタンを表示するか（デフォルト: true）
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'エラーが発生しました',
  onRetry,
  showBackButton = true,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonContainer}>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>再試行</Text>
          </TouchableOpacity>
        )}

        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#34C759',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

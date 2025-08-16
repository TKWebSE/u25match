import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 推奨ユーザーが存在しない場合の空状態表示コンポーネント
 * すべてのカードをめくった後や、表示するカードがない場合に表示される
 */
export const EmptyRecommendationsState: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>今日のオススメは終了です</Text>
        <Text style={styles.emptySubtitle}>明日また新しいオススメをお届けします</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

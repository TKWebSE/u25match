import { colors, spacing, typography } from '@styles/globalStyles';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 推奨ユーザーが存在しない場合の空状態表示コンポーネント
 * すべてのカードをめくった後や、表示するカードがない場合に表示される
 */
export const EmptyRecommendationsState: React.FC = () => {
  // explore画面への遷移
  const handleExploreNavigation = () => {
    try {
      router.push('../../explore' as any);
    } catch (error) {
      // フォールバック: 絶対パスで試行
      try {
        router.push('/(main)/explore' as any);
      } catch (fallbackError) {
        console.error('explore画面への遷移でエラーが発生しました:', fallbackError);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>今日のオススメは終了です</Text>
        <Text style={styles.emptySubtitle}>明日また新しいオススメをお届けします</Text>

        {/* explore画面への遷移ボタン（モバイル版のみ） */}
        <TouchableOpacity style={styles.exploreButton} onPress={handleExploreNavigation}>
          <Text style={styles.exploreButtonText}>🔍 他のユーザーを探す</Text>
        </TouchableOpacity>
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
  exploreButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    minWidth: 200,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: colors.background,
    fontSize: typography.lg,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

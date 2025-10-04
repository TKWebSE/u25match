import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// タブの設定
const TAB_CONFIG = {
  recommended: { label: 'おすすめ', icon: '⭐' },
  beginner: { label: 'ビギナー', icon: '🌱' },
  online: { label: 'オンライン', icon: '🟢' },
  nearby: { label: '近くの人', icon: '📍' },
} as const;

interface ExploreSectionHeaderProps {
  activeTab: 'recommended' | 'beginner' | 'online' | 'nearby';
  userCount: number;
}

/**
 * 探索セクションヘッダーコンポーネント
 * タブ名とユーザー数を表示
 */
const ExploreSectionHeader: React.FC<ExploreSectionHeaderProps> = ({
  activeTab,
  userCount
}) => {
  const config = TAB_CONFIG[activeTab];

  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {config.icon} {config.label}
      </Text>
      <Text style={styles.sectionSubtitle}>
        {userCount}人のユーザー
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ExploreSectionHeader;

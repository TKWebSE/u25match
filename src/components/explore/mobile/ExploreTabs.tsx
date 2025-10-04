import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// タブの設定
const TAB_CONFIG = {
  recommended: { label: 'おすすめ', icon: '⭐' },
  beginner: { label: 'ビギナー', icon: '🌱' },
  online: { label: 'オンライン', icon: '🟢' },
  nearby: { label: '近くの人', icon: '📍' },
} as const;

interface ExploreTabsProps {
  activeTab: 'recommended' | 'beginner' | 'online' | 'nearby';
  onTabPress: (tab: 'recommended' | 'beginner' | 'online' | 'nearby') => void;
}

/**
 * Native版探索タブコンポーネント
 * モバイル向けのタブUIを提供
 */
const ExploreTabs: React.FC<ExploreTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {Object.entries(TAB_CONFIG).map(([tabKey, config]) => {
        const isActive = activeTab === tabKey;
        return (
          <TouchableOpacity
            key={tabKey}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(tabKey as 'recommended' | 'beginner' | 'online' | 'nearby')}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{config.icon}</Text>
            <Text style={[
              styles.tabText,
              isActive && styles.activeTabText,
            ]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: colors.primary + '15', // 15% opacity
    borderWidth: 1,
    borderColor: colors.primary,
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default ExploreTabs;

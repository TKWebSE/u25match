import { ExploreTabType } from '@hooks/features/search';
import { colors } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// タブの設定
const TAB_CONFIG = {
  recommended: { label: 'おすすめ' },
  beginner: { label: 'ビギナー' },
  online: { label: 'オンライン' },
  nearby: { label: '近くの人' },
} as const;

interface ExploreTabsProps {
  activeTab: ExploreTabType;
  onTabPress: (tab: ExploreTabType) => void;
}

/**
 * シンプルなタブコンポーネント
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
            onPress={() => onTabPress(tabKey as ExploreTabType)}
            activeOpacity={0.7}
          >
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
    paddingVertical: 8,
    marginVertical: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#606060',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default ExploreTabs;

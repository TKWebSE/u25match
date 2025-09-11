// src/components/search/web/ReactionTabs.tsx
// リアクションタブコンポーネント

import { ReactionTabType } from '@/src/my-types/search';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ReactionTabsProps {
  activeTab: ReactionTabType;
  onTabPress: (tab: ReactionTabType) => void;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'likes' && styles.activeTab
        ]}
        onPress={() => onTabPress('likes')}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'likes' && styles.activeTabText
        ]}>
          💕 いいね
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'footprints' && styles.activeTab
        ]}
        onPress={() => onTabPress('footprints')}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'footprints' && styles.activeTabText
        ]}>
          👣 足あと
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.base,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
  },
});

export default ReactionTabs;

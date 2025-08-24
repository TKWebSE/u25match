import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';
  onTabPress: (tab: 'likes' | 'footprints') => void;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
        onPress={() => onTabPress('likes')}
      >
        <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>
          ❤️ いいね
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'footprints' && styles.activeTab]}
        onPress={() => onTabPress('footprints')}
      >
        <Text style={[styles.tabText, activeTab === 'footprints' && styles.activeTabText]}>
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
    margin: spacing.lg,
    marginBottom: spacing.base,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
  },
});

export default ReactionTabs;

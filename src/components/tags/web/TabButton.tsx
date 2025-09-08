import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 80,
    marginHorizontal: 4,
    // Web特有のスタイル
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    ':hover': {
      backgroundColor: colors.gray100,
    },
  },
  activeTabButton: {
    backgroundColor: colors.primary + '20',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activeTabButtonText: {
    color: colors.primary,
    fontWeight: '700',
  },
});

export default TabButton;

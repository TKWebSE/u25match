import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  message: string;
  showSearchMessage?: boolean;
  searchQuery?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  showSearchMessage = false,
  searchQuery = ''
}) => {
  if (showSearchMessage && searchQuery.trim()) {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>
          「{searchQuery}」に一致するユーザーが見つかりませんでした
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noResultsContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing['4xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default EmptyState; 

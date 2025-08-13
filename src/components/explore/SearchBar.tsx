import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "名前、地域、年齢で検索..."
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchIconContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={onSearchChange}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    ...shadows.base,
  },
  searchIconContainer: {
    marginRight: spacing.base,
  },
  searchIcon: {
    fontSize: typography.lg,
    color: colors.textSecondary,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.lg,
    color: colors.textPrimary,
  },
});

export default SearchBar; 

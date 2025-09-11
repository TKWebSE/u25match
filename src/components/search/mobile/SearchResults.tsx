// src/components/search/mobile/SearchResults.tsx
// 検索結果表示コンポーネント

import { User as SearchUser } from '@/src/my-types/search';
import { colors, spacing } from '@styles/globalStyles';
import { getCategoryTitle } from '@utils/searchUtils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserGrid from './UserGrid';

interface SearchResultsProps {
  selectedCategory: string | null;
  searchResults: SearchUser[];
  onCardPress: (user: SearchUser) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  selectedCategory,
  searchResults,
  onCardPress,
}) => {

  return (
    <View style={styles.searchResultsContainer}>
      {/* 検索結果ヘッダー */}
      <View style={styles.searchResultsHeader}>
        <Text style={styles.searchResultsTitle}>
          {getCategoryTitle(selectedCategory)}
        </Text>
      </View>

      {/* 検索結果 */}
      <UserGrid
        users={searchResults}
        onCardPress={onCardPress}
        emptyMessage="このカテゴリにはユーザーがいません"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default SearchResults;

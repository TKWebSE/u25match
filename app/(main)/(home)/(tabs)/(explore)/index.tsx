import EmptyState from '@components/EmptyState';
import SearchBar from '@components/SearchBar';
import UserCard from '@components/UserCard';
import { useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing, typography } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

const ExploreScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch();

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/(main)/profile/${userId}`);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={handleCardPress} />
  );

  const renderEmptyComponent = () => {
    if (hasSearchQuery && !hasSearchResults) {
      return (
        <EmptyState
          message=""
          showSearchMessage={true}
          searchQuery={searchQuery}
        />
      );
    }

    if (!hasSearchQuery && !hasSearchResults) {
      return <EmptyState message="ユーザーが見つかりません" />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ユーザーを探す</Text>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
    padding: spacing.xl,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  listContainer: {
    padding: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ExploreScreen; 

import CustomHeader from '@components/common/CustomHeader';
import EmptyState from '@components/common/EmptyState';
import SearchBar from '@components/explore/SearchBar';
import UserCard from '@components/explore/UserCard';
import { useUserSearch } from '@hooks/useUserSearch';
import { useSidebar } from '@layouts/WebLayout';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const { width } = useWindowDimensions();
  const { isSidebarOpen } = useSidebar(); // ドロワーの状態を取得（Web環境でのみ使用）

  // 極端に小さな画面でのエラーを防ぐ
  const safeWidth = Math.max(width, 320); // 最小320pxを確保

  // 列数を計算してkeyとして使用（ドロワーの状態も考慮）
  const columnCount = (() => {
    // 画面幅に基づいて列数を決定
    if (safeWidth <= 570) {
      return 1; // 480×837のトグルデバイスシミュレーション
    } else if (safeWidth <= 960) {
      // ドロワーの状態に応じて列数を調整（Web環境）
      return isSidebarOpen ? 2 : 3; // ドロワー開で2列、閉で3列
    } else if (safeWidth <= 1200) {
      // ドロワーの状態に応じて列数を調整（Web環境）
      return isSidebarOpen ? 3 : 4; // ドロワー開で3列、閉で4列
    } else {
      // ドロワーの状態に応じて列数を調整（Web環境）
      return isSidebarOpen ? 3 : 4; // ドロワー開で3列、閉で4列
    }
  })();
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
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="探す" />

      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          numColumns={columnCount}
          key={`flatlist-${columnCount}-${isSidebarOpen ? 'open' : 'closed'}`} // ドロワーの状態もkeyに含める
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.lg,
    paddingHorizontal: spacing.xl, // 左右に余分なスペースを追加
    paddingRight: spacing.xl + spacing.xl + spacing.xl + spacing.base, // 右側により多くのスペースを追加
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ExploreScreen; 

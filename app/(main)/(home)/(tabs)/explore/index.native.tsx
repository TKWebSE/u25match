import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import ExploreTabs from '@components/explore/ExploreTabs';
import UserCard from '@components/explore/UserCard';
import { getProfilePath } from '@constants/routes';
import { ExploreTabType, useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

// 探索画面コンポーネント - ユーザー検索・探索機能（モバイル版）
const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<ExploreTabType>('search');

  // カードレイアウト情報を取得
  const cardLayout = useCardLayout(cardListWidth);

  // モバイルではローカル状態を使用
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const {
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch(localSearchQuery, activeTab);

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: ExploreTabType) => {
    setActiveTab(tab);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={handleCardPress} layout={cardLayout} />
  );

  const renderEmptyComponent = () => {
    if (hasSearchQuery && !hasSearchResults) {
      return (
        <EmptyState
          message=""
          showSearchMessage={true}
          searchQuery={localSearchQuery}
        />
      );
    }

    if (!hasSearchQuery && !hasSearchResults) {
      return <EmptyState message="ユーザーが見つかりません" />;
    }

    return null;
  };

  // モバイル環境用のFlatList
  const renderMobileList = () => (
    <FlatList
      data={filteredUsers}
      renderItem={renderUserItem}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={cardLayout.columnCount}
      key={`flatlist-${cardLayout.columnCount}`}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyComponent}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* タブエリア */}
        <ExploreTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
          cardListWidth={cardListWidth}
        />

        {/* カードリストエリアの幅を計測 */}
        <View
          style={styles.cardListArea}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setCardListWidth(width);
          }}
        >
          {/* モバイル環境用のFlatList */}
          {renderMobileList()}
        </View>
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
  },
  cardListArea: {
    flex: 1,
  },
});

export default ExploreScreen;

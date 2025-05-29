import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { SearchBar } from '@components/explore';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import ExploreTabs from '@components/explore/ExploreTabs';
import UserSwipeSection from '@components/explore/mobile/UserSwipeSection';
import { getProfilePath } from '@constants/routes';
import { MaterialIcons } from '@expo/vector-icons';
import { useCardSize } from '@hooks/useCardSize';
import { ExploreTabType, useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// User型はUnifiedUserCardからインポート済み

// 探索画面コンポーネント - ユーザー検索・探索機能（モバイル版）
const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(300); // 初期値を設定

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<ExploreTabType>('search');

  // カードレイアウト情報を取得
  const cardLayout = useCardLayout(cardListWidth);

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');
  const swiperCardSize = useCardSize('swiper');

  // モバイルではローカル状態を使用
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch(localSearchQuery, activeTab);

  // デバッグ用ログ
  const screenWidth = Dimensions.get('window').width;
  console.log('ExploreScreen Debug:', {
    activeTab,
    filteredUsersLength: filteredUsers.length,
    hasSearchResults,
    hasSearchQuery,
    cardListWidth,
    screenWidth,
    calculatedCardWidth: (screenWidth - spacing.lg * 2 - spacing.sm) / 2
  });

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: ExploreTabType) => {
    setActiveTab(tab);
  };

  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setLocalSearchQuery(query);
  };

  // 検索フィールドを開く（フォーカスを当てる）
  const handleOpenSearch = () => {
    setIsSearchVisible(true);
    setIsSearchFocused(true);
  };

  // 検索フィールドのフォーカス状態を管理
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // フォーカスが外れたら検索フィールドを非表示にする
    setTimeout(() => {
      setIsSearchVisible(false);
      setLocalSearchQuery('');
    }, 100);
  };

  // 統一カードを使用したレンダリング
  const renderUserItem = ({ item, index }: { item: User; index: number }) => {
    return (
      <UnifiedUserCard
        key={`${item.name}-${index}`}
        user={item}
        onPress={handleCardPress}
        size={gridCardSize}
        layout="grid"
      />
    );
  };

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

  // 検索タブ用のグリッドレイアウト
  const renderSearchGrid = () => {
    // 検索クエリがあるが結果がない場合
    if (hasSearchQuery && !hasSearchResults) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState
            message=""
            showSearchMessage={true}
            searchQuery={localSearchQuery}
          />
        </View>
      );
    }

    // 検索結果がある場合はグリッドレイアウトで表示
    if (filteredUsers.length > 0) {
      return (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      );
    }

    // デフォルトでEmptyStateを表示
    return (
      <View style={styles.emptyStateContainer}>
        <EmptyState message="ユーザーを検索してみましょう" />
      </View>
    );
  };

  // その他のタブ用のスワイパーセクション
  const renderOtherTabsCarousel = () => (
    <>
      <UserSwipeSection
        title="おすすめユーザー"
        subtitle={filteredUsers.length + "人のユーザー"}
        users={filteredUsers}
        onCardPress={handleCardPress}
      />
      <UserSwipeSection
        title="新着ユーザー"
        subtitle={filteredUsers.length + "人のユーザー"}
        users={filteredUsers}
        onCardPress={handleCardPress}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* 検索バー（検索タブがアクティブで検索が表示されている時） */}
        {activeTab === 'search' && isSearchVisible && (
          <View style={styles.searchContainer}>
            <SearchBar
              onSearch={handleSearch}
              isVisible={isSearchVisible}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onClose={() => {
                setIsSearchVisible(false);
                setIsSearchFocused(false);
                setLocalSearchQuery('');
              }}
              autoFocus={true}
            />
          </View>
        )}

        {/* タブエリア（検索フィールドが表示されている時は非表示） */}
        {!(activeTab === 'search' && isSearchVisible) && (
          <ExploreTabs
            activeTab={activeTab}
            onTabPress={handleTabPress}
            cardListWidth={cardListWidth}
          />
        )}

        {/* カードリストエリアの幅を計測 */}
        <View style={styles.cardListArea}>
          {activeTab === 'search' ? (
            // 検索タブの場合はグリッドレイアウト
            renderSearchGrid()
          ) : (
            // その他のタブの場合はスワイパーセクション
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {renderOtherTabsCarousel()}
            </ScrollView>
          )}
        </View>

        {/* 検索タブがアクティブな時だけ表示するFAB */}
        {activeTab === 'search' && (
          <TouchableOpacity
            style={styles.fab}
            onPress={handleOpenSearch}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="search"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}
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
  searchContainer: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  listContainer: {
    padding: spacing.lg,
  },
  cardListArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl, // スクロール時の下部パディング
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: spacing.sm,
  },
  // 統一カードコンポーネントを使用するため、カード関連のスタイルは削除
  fab: {
    position: 'absolute',
    bottom: 20, // 下タブの少し上に配置
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C63FF', // 下タブと同じ色
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default ExploreScreen;

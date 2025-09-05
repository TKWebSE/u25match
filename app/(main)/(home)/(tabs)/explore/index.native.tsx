import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { SearchBar } from '@components/explore';
import TodaysRecommendationBanner from '@components/explore/TodaysRecommendationBanner';
import UserSwipeSection from '@components/explore/mobile/UserSwipeSection';
import { getProfilePath, RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { MaterialIcons } from '@expo/vector-icons';
import { useCardSize } from '@hooks/useCardSize';
import { useTodaysRecommendation } from '@hooks/useTodaysRecommendation';
import { useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

// 探索画面コンポーネント - ユーザー検索・探索機能（モバイル版）
const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(300); // 初期値を設定

  // タブの状態管理
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'search', title: '検索' },
    { key: 'recommendations', title: 'おすすめ' },
    { key: 'nearby', title: '近くの人' },
  ]);

  // カードレイアウト情報を削除（不要になったため）

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');
  const swiperCardSize = useCardSize('swiper');

  // モバイルではローカル状態を使用
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 今日のおすすめバナーの状態管理
  const { isVisible: showTodaysRecommendation, dismissBanner } = useTodaysRecommendation();

  // 現在のタブに応じたユーザー検索
  const getCurrentTab = (index: number) => {
    switch (index) {
      case 0: return 'search';
      case 1: return 'recommended';
      case 2: return 'nearby';
      default: return 'search';
    }
  };

  const currentTab = getCurrentTab(index);
  const {
    filteredUsers,
    hasSearchResults,
    hasSearchQuery
  } = useUserSearch(localSearchQuery, currentTab);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

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

  // 統一カードを使用したレンダリング（メモ化）
  const renderUserItem = useCallback(({ item, index }: { item: User; index: number }) => {
    return (
      <UnifiedUserCard
        key={`${item.name}-${index}`}
        user={item}
        onPress={handleCardPress}
        size={gridCardSize}
        layout="grid"
      />
    );
  }, [gridCardSize, handleCardPress]);

  // 検索タブのレンダリング
  const renderSearchTab = useCallback(() => {
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

    if (filteredUsers.length > 0) {
      return (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item, index) => `search-${item.name}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          // パフォーマンス最適化
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
          getItemLayout={(data, index) => ({
            length: gridCardSize.height,
            offset: gridCardSize.height * Math.floor(index / 2),
            index,
          })}
        />
      );
    }

    return (
      <View style={styles.emptyStateContainer}>
        <EmptyState message="ユーザーを検索してみましょう" />
      </View>
    );
  }, [filteredUsers, hasSearchQuery, hasSearchResults, localSearchQuery, renderUserItem, gridCardSize]);

  // おすすめタブのレンダリング
  const renderRecommendationsTab = useCallback(() => {
    if (filteredUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState message="おすすめユーザーが見つかりません" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <UserSwipeSection
          title="おすすめユーザー"
          subtitle={`${filteredUsers.length}人のユーザー`}
          users={filteredUsers}
          onCardPress={handleCardPress}
        />
      </ScrollView>
    );
  }, [filteredUsers, handleCardPress]);

  // 近くの人タブのレンダリング
  const renderNearbyTab = useCallback(() => {
    if (filteredUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState message="近くにユーザーが見つかりません" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <UserSwipeSection
          title="近くの人"
          subtitle={`${filteredUsers.length}人のユーザー`}
          users={filteredUsers}
          onCardPress={handleCardPress}
        />
      </ScrollView>
    );
  }, [filteredUsers, handleCardPress]);

  // シーン定義
  const renderScene = SceneMap({
    search: renderSearchTab,
    recommendations: renderRecommendationsTab,
    nearby: renderNearbyTab,
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* 今日のおすすめバナー */}
        {showTodaysRecommendation && (
          <TodaysRecommendationBanner
            onPress={() => {
              router.push(RECOMMENDATIONS_SCREEN_PATH as any);
            }}
            onClose={dismissBanner}
            visible={showTodaysRecommendation}
          />
        )}

        {/* 検索バー（検索タブがアクティブで検索が表示されている時） */}
        {index === 0 && isSearchVisible && (
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

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          animationEnabled={true}
          swipeEnabled={true}
          lazy={false}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              tabStyle={styles.tabStyle}
              indicatorStyle={styles.tabIndicator}
              activeColor={colors.primary}
              inactiveColor={colors.textSecondary}
              scrollEnabled={false}
              pressColor="transparent"
              pressOpacity={0.8}
              indicatorContainerStyle={styles.indicatorContainer}
            />
          )}
        />

        {/* 検索タブがアクティブな時だけ表示するFAB */}
        {index === 0 && (
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
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    position: 'relative',
  },
  tabStyle: {
    paddingVertical: 12,
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,
  },
  scrollContainer: {
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
    backgroundColor: colors.primary, // 下タブと同じ色
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

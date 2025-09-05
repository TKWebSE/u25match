import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { SearchBar } from '@components/explore';
import ExploreTabs from '@components/explore/ExploreTabs';
import TodaysRecommendationBanner from '@components/explore/TodaysRecommendationBanner';
import UserSwipeSection from '@components/explore/mobile/UserSwipeSection';
import { getProfilePath, RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { MaterialIcons } from '@expo/vector-icons';
import { useCardSize } from '@hooks/useCardSize';
import { useTodaysRecommendation } from '@hooks/useTodaysRecommendation';
import { ExploreTabType, useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

// 探索画面コンポーネント - ユーザー検索・探索機能（モバイル版）
const ExploreScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測
  const [cardListWidth, setCardListWidth] = useState(300); // 初期値を設定

  // タブの状態管理（ExploreTabs用）
  const [activeTab, setActiveTab] = useState<ExploreTabType>('search');

  // タブの表示/非表示制御
  const tabTranslateY = useRef(new Animated.Value(0)).current;
  const [isTabVisible, setIsTabVisible] = useState(true);

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
  const currentTab = activeTab;
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
    // タブを上に隠す
    hideTabs();
  };

  // 検索フィールドのフォーカス状態を管理
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    // タブを上に隠す
    hideTabs();
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    // タブを表示に戻す
    showTabs();
    // フォーカスが外れたら検索フィールドを非表示にする
    setTimeout(() => {
      setIsSearchVisible(false);
      setLocalSearchQuery('');
    }, 100);
  };

  // タブを隠すアニメーション
  const hideTabs = () => {
    if (isTabVisible) {
      setIsTabVisible(false);
      Animated.timing(tabTranslateY, {
        toValue: -60, // タブの高さ分上に移動
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // タブを表示するアニメーション
  const showTabs = () => {
    if (!isTabVisible) {
      setIsTabVisible(true);
      Animated.timing(tabTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
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

  // 新着タブのレンダリング
  const renderNewTab = useCallback(() => {
    if (filteredUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState message="新着ユーザーが見つかりません" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <UserSwipeSection
          title="新着ユーザー"
          subtitle={`${filteredUsers.length}人のユーザー`}
          users={filteredUsers}
          onCardPress={handleCardPress}
        />
      </ScrollView>
    );
  }, [filteredUsers, handleCardPress]);

  // タグタブのレンダリング
  const renderTagsTab = useCallback(() => {
    if (filteredUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState message="タグを持つユーザーが見つかりません" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <UserSwipeSection
          title="タグユーザー"
          subtitle={`${filteredUsers.length}人のユーザー`}
          users={filteredUsers}
          onCardPress={handleCardPress}
        />
      </ScrollView>
    );
  }, [filteredUsers, handleCardPress]);


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
                // タブを表示に戻す
                showTabs();
              }}
              autoFocus={true}
            />
          </View>
        )}

        {/* カスタムタブコンポーネント */}
        <Animated.View
          style={{
            transform: [{ translateY: tabTranslateY }],
          }}
        >
          <ExploreTabs
            activeTab={activeTab}
            onTabPress={setActiveTab}
            cardListWidth={cardListWidth}
          />
        </Animated.View>

        {/* タブコンテンツ */}
        <View style={styles.tabContent}>
          {activeTab === 'search' && renderSearchTab()}
          {activeTab === 'recommended' && renderRecommendationsTab()}
          {activeTab === 'new' && renderNewTab()}
          {activeTab === 'tags' && renderTagsTab()}
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
  tabContent: {
    flex: 1,
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

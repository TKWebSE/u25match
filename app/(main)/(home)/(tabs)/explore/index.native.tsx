import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { SearchBar } from '@components/explore';
import TodaysRecommendationBanner from '@components/explore/TodaysRecommendationBanner';
import UserSwipeSection from '@components/explore/mobile/UserSwipeSection';
import { getProfilePath, RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { useCardSize } from '@hooks/useCardSize';
import { useTodaysRecommendation } from '@hooks/useTodaysRecommendation';
import { useUserSearch } from '@hooks/useUserSearch';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

// 探索画面コンポーネント - ユーザー検索・探索機能（モバイル版）
const ExploreScreen = () => {
  const router = useRouter();


  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');
  const swiperCardSize = useCardSize('swiper');

  // モバイルではローカル状態を使用
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 今日のおすすめバナーの状態管理
  const { isVisible: showTodaysRecommendation, dismissBanner } = useTodaysRecommendation();

  // 各カテゴリのユーザー検索
  const {
    filteredUsers: searchUsers,
    hasSearchResults: hasSearchResults,
    hasSearchQuery: hasSearchQuery
  } = useUserSearch(localSearchQuery, 'search');

  const {
    filteredUsers: recommendedUsers
  } = useUserSearch('', 'recommended');

  const {
    filteredUsers: onlineUsers
  } = useUserSearch('', 'online');

  const {
    filteredUsers: nearbyUsers
  } = useUserSearch('', 'nearby');

  const {
    filteredUsers: beginnerUsers
  } = useUserSearch('', 'beginner');

  const {
    filteredUsers: popularUsers
  } = useUserSearch('', 'popular');

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

  // メインコンテンツのレンダリング
  const renderMainContent = () => {
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

    if (hasSearchQuery && searchUsers.length > 0) {
      return (
        <ScrollView style={styles.scrollContainer}>
          <UserSwipeSection
            title="検索結果"
            subtitle={`${searchUsers.length}人のユーザー`}
            users={searchUsers}
            onCardPress={handleCardPress}
          />
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        {/* おすすめユーザー */}
        <UserSwipeSection
          title="⭐ おすすめ"
          subtitle={`${recommendedUsers.length}人のユーザー`}
          users={recommendedUsers}
          onCardPress={handleCardPress}
          isHighlighted={true}
        />

        {/* オンラインユーザー */}
        <UserSwipeSection
          title="🟢 オンライン"
          subtitle={`${onlineUsers.length}人のユーザー`}
          users={onlineUsers}
          onCardPress={handleCardPress}
        />

        {/* ビギナーユーザー */}
        <UserSwipeSection
          title="🌱 ビギナー"
          subtitle={`${beginnerUsers.length}人の新規ユーザー`}
          users={beginnerUsers}
          onCardPress={handleCardPress}
        />

        {/* 人気ユーザー */}
        <UserSwipeSection
          title="🔥 人気"
          subtitle={`${popularUsers.length}人の人気ユーザー`}
          users={popularUsers}
          onCardPress={handleCardPress}
        />

        {/* 近くの人 */}
        <UserSwipeSection
          title="📍 近くの人"
          subtitle={`${nearbyUsers.length}人のユーザー`}
          users={nearbyUsers}
          onCardPress={handleCardPress}
        />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ロゴヘッダー */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>💕</Text>
            <Text style={styles.logo}>u25match</Text>
          </View>
        </View>

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

        {/* 検索バー */}
        {isSearchVisible && (
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

        {/* メインコンテンツ */}
        {renderMainContent()}
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'lowercase',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.sm, // スクロール時の下部パディングをさらに縮小
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
});

export default ExploreScreen;

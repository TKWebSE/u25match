import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { SearchBar } from '@components/explore';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/ui';
import { useExploreStore } from '@stores/exploreStore';
import { colors, spacing } from '@styles/globalStyles';
import { getUserList } from '@usecases/explore';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 探索画面コンポーネント - ユーザー検索・探索機能
const ExploreScreen = () => {
  const router = useRouter();

  // ストアの状態管理
  const { users, isLoading, hasMore, activeTab, currentPage, switchTab } = useExploreStore();

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // ローカル状態
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 初回読み込み
  const fetchInitialUsers = async () => {
    try {
      await getUserList({
        page: 1,
        limit: 30,
        filters: { tab: activeTab }
      });
    } catch (error: any) {
      showErrorToast(error.message || 'ユーザー一覧の取得に失敗しました');
    }
  };

  // 追加読み込み（無限スクロール用）
  const loadMoreUsers = async () => {
    if (!hasMore || isLoading) return;

    try {
      await getUserList({
        page: currentPage + 1,
        limit: 30,
        filters: { tab: activeTab }
      });
    } catch (error: any) {
      showErrorToast(error.message || '追加データの取得に失敗しました');
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchInitialUsers();
  }, [activeTab]);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // 検索ハンドラー（一時的に無効化）
  const handleSearch = (query: string) => {
    setLocalSearchQuery(query);
    // TODO: 検索機能は後で実装
  };

  // タブ切り替えハンドラー
  const handleTabChange = (tab: 'recommended' | 'beginner' | 'online' | 'nearby') => {
    switchTab(tab);
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


  // メインコンテンツのレンダリング
  const renderMainContent = () => {
    // ローディング状態
    if (isLoading && users.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>ユーザーを読み込み中...</Text>
        </View>
      );
    }

    // 検索結果がない場合（一時的に無効化）
    if (localSearchQuery && users.length === 0) {
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

    // メインコンテンツ
    return (
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UnifiedUserCard
            user={item}
            onPress={handleCardPress}
            size={gridCardSize}
            layout="grid"
          />
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              ⭐ {activeTab === 'recommended' ? 'おすすめ' :
                activeTab === 'beginner' ? 'ビギナー' :
                  activeTab === 'online' ? 'オンライン' :
                    '近くの人'}
            </Text>
            <Text style={styles.sectionSubtitle}>
              {users.length}人のユーザー
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          isLoading && users.length > 0 ? (
            <View style={styles.loadingFooter}>
              <Text style={styles.loadingFooterText}>読み込み中...</Text>
            </View>
          ) : null
        )}
        showsVerticalScrollIndicator={false}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loadingFooter: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  loadingFooterText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  // 統一カードコンポーネントを使用するため、カード関連のスタイルは削除
});

export default ExploreScreen;

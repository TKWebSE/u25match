import { colors, spacing, typography } from '@styles/globalStyles';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  UIManager,
  useWindowDimensions,
  View
} from 'react-native';
import InteractiveUserCard from './InteractiveUserCard';

// AndroidでLayoutAnimationを有効化
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  tags?: string[];
  verified?: boolean;
  distance?: number;
  mutualFriends?: number;
}

interface InfiniteUserListProps {
  users: User[];
  onLoadMore: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  hasMore: boolean;
  onUserPress: (user: User) => void;
  onUserLike: (user: User) => void;
  onUserPass: (user: User) => void;
  onUserSuperLike: (user: User) => void;
  searchQuery: string;
  filters: any;
}

const ITEMS_PER_PAGE = 20;
const LOAD_MORE_THRESHOLD = 5;

const InfiniteUserList: React.FC<InfiniteUserListProps> = ({
  users,
  onLoadMore,
  onRefresh,
  isLoading,
  hasMore,
  onUserPress,
  onUserLike,
  onUserPass,
  onUserSuperLike,
  searchQuery,
  filters
}) => {
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // 列数を計算
  const columnCount = useMemo(() => {
    if (width <= 570) return 1;
    if (width <= 960) return 2;
    if (width <= 1200) return 3;
    return 4;
  }, [width]);

  // フィルタリングとソート
  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = [...users];

    // 検索クエリでフィルタリング
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query) ||
        user.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        user.age.toString().includes(query)
      );
    }

    // フィルター適用
    if (filters) {
      // 年齢範囲
      if (filters.ageRange && (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 65)) {
        filteredUsers = filteredUsers.filter(user =>
          user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1]
        );
      }

      // 地域
      if (filters.location && filters.location.length > 0) {
        filteredUsers = filteredUsers.filter(user =>
          filters.location.includes(user.location)
        );
      }

      // オンラインのみ
      if (filters.onlineOnly) {
        filteredUsers = filteredUsers.filter(user => user.isOnline);
      }

      // 認証済みのみ
      if (filters.verifiedOnly) {
        filteredUsers = filteredUsers.filter(user => user.verified);
      }

      // タグ
      if (filters.tags && filters.tags.length > 0) {
        filteredUsers = filteredUsers.filter(user =>
          user.tags && filters.tags.some((tag: string) => user.tags!.includes(tag))
        );
      }
    }

    // ソート
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filteredUsers.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
          break;
        case 'popular':
          // 仮想的な人気度（オンライン状態、認証済み、共通の友達数など）
          filteredUsers.sort((a, b) => {
            const scoreA = (a.isOnline ? 10 : 0) + (a.verified ? 5 : 0) + (a.mutualFriends || 0);
            const scoreB = (b.isOnline ? 10 : 0) + (b.verified ? 5 : 0) + (b.mutualFriends || 0);
            return scoreB - scoreA;
          });
          break;
        case 'distance':
          filteredUsers.sort((a, b) => (a.distance || 999) - (b.distance || 999));
          break;
        case 'relevance':
          // 検索クエリとの関連度でソート
          if (searchQuery.trim()) {
            filteredUsers.sort((a, b) => {
              const relevanceA = calculateRelevance(a, searchQuery);
              const relevanceB = calculateRelevance(b, searchQuery);
              return relevanceB - relevanceA;
            });
          }
          break;
      }
    }

    return filteredUsers;
  }, [users, searchQuery, filters]);

  // 関連度計算
  const calculateRelevance = (user: User, query: string): number => {
    let score = 0;
    const lowerQuery = query.toLowerCase();

    if (user.name.toLowerCase().includes(lowerQuery)) score += 10;
    if (user.location.toLowerCase().includes(lowerQuery)) score += 8;
    if (user.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 6;
    if (user.age.toString().includes(lowerQuery)) score += 4;

    return score;
  };

  // リフレッシュ処理
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  // さらに読み込み処理
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  }, [onLoadMore, loadingMore, hasMore]);

  // ユーザーカードのレンダリング
  const renderUserItem = useCallback(({ item, index }: { item: User; index: number }) => (
    <InteractiveUserCard
      user={item}
      onPress={onUserPress}
      onLike={onUserLike}
      onPass={onUserPass}
      onSuperLike={onUserSuperLike}
    />
  ), [onUserPress, onUserLike, onUserPass, onUserSuperLike]);

  // 空の状態表示
  const renderEmptyComponent = useCallback(() => {
    if (searchQuery.trim() || (filters && Object.keys(filters).length > 0)) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>検索結果がありません</Text>
          <Text style={styles.emptySubtitle}>
            検索条件を変更するか、フィルターをリセットしてください
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>ユーザーが見つかりません</Text>
        <Text style={styles.emptySubtitle}>
          しばらく待ってから再度お試しください
        </Text>
      </View>
    );
  }, [searchQuery, filters]);

  // フッター（ローディング表示）
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.footerText}>読み込み中...</Text>
      </View>
    );
  }, [loadingMore]);

  // セパレーター
  const renderSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), []);

  // キー抽出
  const keyExtractor = useCallback((item: User) => item.id, []);

  // スクロール位置の監視
  const handleScroll = useCallback(
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    ),
    []
  );

  // スクロール位置をトップに戻す
  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  // レイアウトアニメーション
  const handleLayoutAnimation = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // 検索やフィルター変更時にレイアウトアニメーション
  React.useEffect(() => {
    handleLayoutAnimation();
  }, [filteredAndSortedUsers.length, handleLayoutAnimation]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredAndSortedUsers}
        renderItem={renderUserItem}
        keyExtractor={keyExtractor}
        numColumns={columnCount}
        key={`flatlist-${columnCount}`}
        columnWrapperStyle={columnCount > 1 ? styles.row : undefined}
        contentContainerStyle={[
          styles.listContainer,
          filteredAndSortedUsers.length === 0 && styles.emptyListContainer
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={ITEMS_PER_PAGE}
        getItemLayout={(data, index) => ({
          length: 200, // カードの高さ
          offset: 200 * index,
          index,
        })}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingRight: spacing.xl + spacing.xl + spacing.xl + spacing.base,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'] * 2,
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  footerText: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
});

export default InfiniteUserList;

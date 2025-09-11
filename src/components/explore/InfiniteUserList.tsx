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

/**
 * ユーザー情報のインターフェース
 * 探索画面で表示されるユーザーの基本情報を定義
 */
interface User {
  id: string;                    // ユニークID
  name: string;                  // ユーザー名
  age: number;                   // 年齢
  location: string;              // 居住地
  imageUrl: string;              // プロフィール画像URL
  isOnline: boolean;             // オンライン状態
  lastActiveAt: Date;            // 最終アクティブ時刻
  tags?: string[];               // タグ（趣味・興味など）
  verified?: boolean;            // 認証済みかどうか
  distance?: number;             // 距離（km）
  mutualFriends?: number;        // 共通の友達数
}

/**
 * InfiniteUserListコンポーネントのプロパティ
 * 無限スクロール可能なユーザーリストの設定とイベントハンドラーを定義
 */
interface InfiniteUserListProps {
  users: User[];                           // 表示するユーザーリスト
  onLoadMore: () => void;                 // さらに読み込み時のコールバック
  onRefresh: () => void;                  // リフレッシュ時のコールバック
  isLoading: boolean;                     // 初期読み込み中かどうか
  hasMore: boolean;                       // さらに読み込むデータがあるかどうか
  onUserPress: (user: User) => void;      // ユーザーカードタップ時のコールバック
  onUserLike: (user: User) => void;       // いいねボタンタップ時のコールバック
  onUserPass: (user: User) => void;       // パスボタンタップ時のコールバック
  onUserSuperLike: (user: User) => void;  // スーパーライクボタンタップ時のコールバック
  searchQuery: string;                    // 検索クエリ
  filters: any;                           // フィルター設定
}

// 定数定義
const ITEMS_PER_PAGE = 20;        // 1ページあたりのアイテム数
const LOAD_MORE_THRESHOLD = 5;    // さらに読み込みを開始する閾値（残りアイテム数）

/**
 * 無限スクロール可能なユーザーリストコンポーネント
 * 
 * 主な機能：
 * - レスポンシブなグリッドレイアウト（画面幅に応じて列数が変わる）
 * - 無限スクロール（ページネーション）
 * - プルトゥリフレッシュ
 * - 検索・フィルタリング機能
 * - ソート機能
 * - レイアウトアニメーション
 * 
 * @param props - コンポーネントのプロパティ
 * @returns JSX要素
 */
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
  // 画面幅を取得（レスポンシブレイアウト用）
  const { width } = useWindowDimensions();

  // 状態管理
  const [refreshing, setRefreshing] = useState(false);      // リフレッシュ中かどうか
  const [loadingMore, setLoadingMore] = useState(false);    // さらに読み込み中かどうか

  // 参照
  const flatListRef = useRef<FlatList>(null);               // FlatListの参照
  const scrollY = useRef(new Animated.Value(0)).current;    // スクロール位置のアニメーション値

  // レスポンシブな列数を計算
  // 画面幅に応じて1〜4列のグリッドレイアウトを決定
  const columnCount = useMemo(() => {
    if (width <= 570) return 1;      // モバイル: 1列
    if (width <= 960) return 2;      // タブレット: 2列
    if (width <= 1200) return 3;     // デスクトップ小: 3列
    return 4;                        // デスクトップ大: 4列
  }, [width]);

  // フィルタリングとソート処理
  // 検索クエリとフィルター条件に基づいてユーザーリストを絞り込み・並び替え
  const filteredAndSortedUsers = useMemo(() => {
    let filteredUsers = [...users];

    // 検索クエリでフィルタリング
    // 名前、居住地、タグ、年齢で部分一致検索
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||                    // 名前で検索
        user.location.toLowerCase().includes(query) ||               // 居住地で検索
        user.tags?.some(tag => tag.toLowerCase().includes(query)) || // タグで検索
        user.age.toString().includes(query)                          // 年齢で検索
      );
    }

    // フィルター条件を適用
    if (filters) {
      // 年齢範囲フィルター
      if (filters.ageRange && (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 65)) {
        filteredUsers = filteredUsers.filter(user =>
          user.age >= filters.ageRange[0] && user.age <= filters.ageRange[1]
        );
      }

      // 地域フィルター
      if (filters.location && filters.location.length > 0) {
        filteredUsers = filteredUsers.filter(user =>
          filters.location.includes(user.location)
        );
      }

      // オンライン状態フィルター
      if (filters.onlineOnly) {
        filteredUsers = filteredUsers.filter(user => user.isOnline);
      }

      // 認証済みユーザーのみフィルター
      if (filters.verifiedOnly) {
        filteredUsers = filteredUsers.filter(user => user.verified);
      }

      // タグフィルター（指定されたタグのいずれかを含むユーザー）
      if (filters.tags && filters.tags.length > 0) {
        filteredUsers = filteredUsers.filter(user =>
          user.tags && filters.tags.some((tag: string) => user.tags!.includes(tag))
        );
      }
    }

    // ソート処理
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          // 最新アクティブ順（最終アクティブ時刻の降順）
          filteredUsers.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
          break;
        case 'popular':
          // 人気度順（オンライン状態、認証済み、共通の友達数でスコア計算）
          filteredUsers.sort((a, b) => {
            const scoreA = (a.isOnline ? 10 : 0) + (a.verified ? 5 : 0) + (a.mutualFriends || 0);
            const scoreB = (b.isOnline ? 10 : 0) + (b.verified ? 5 : 0) + (b.mutualFriends || 0);
            return scoreB - scoreA;
          });
          break;
        case 'distance':
          // 距離順（近い順）
          filteredUsers.sort((a, b) => (a.distance || 999) - (b.distance || 999));
          break;
        case 'relevance':
          // 関連度順（検索クエリとの一致度でソート）
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

  /**
   * 検索クエリとの関連度を計算
   * 名前、居住地、タグ、年齢の一致度に基づいてスコアを算出
   * 
   * @param user - ユーザー情報
   * @param query - 検索クエリ
   * @returns 関連度スコア（高いほど関連度が高い）
   */
  const calculateRelevance = (user: User, query: string): number => {
    let score = 0;
    const lowerQuery = query.toLowerCase();

    if (user.name.toLowerCase().includes(lowerQuery)) score += 10;        // 名前一致: 10点
    if (user.location.toLowerCase().includes(lowerQuery)) score += 8;     // 居住地一致: 8点
    if (user.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) score += 6; // タグ一致: 6点
    if (user.age.toString().includes(lowerQuery)) score += 4;             // 年齢一致: 4点

    return score;
  };

  // プルトゥリフレッシュ処理
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  // 無限スクロール時の追加読み込み処理
  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  }, [onLoadMore, loadingMore, hasMore]);

  // ユーザーカードのレンダリング関数
  const renderUserItem = useCallback(({ item, index }: { item: User; index: number }) => (
    <InteractiveUserCard
      user={item}
      onPress={onUserPress}
      onLike={onUserLike}
      onPass={onUserPass}
      onSuperLike={onUserSuperLike}
    />
  ), [onUserPress, onUserLike, onUserPass, onUserSuperLike]);

  // 空の状態表示コンポーネント
  // 検索結果がない場合やユーザーが見つからない場合の表示
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

  // フッター（追加読み込み中の表示）
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.footerText}>読み込み中...</Text>
      </View>
    );
  }, [loadingMore]);

  // アイテム間のセパレーター
  const renderSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), []);

  // リストアイテムのキー抽出関数
  const keyExtractor = useCallback((item: User) => item.id, []);

  // スクロール位置の監視（アニメーション用）
  const handleScroll = useCallback(
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    ),
    []
  );

  // スクロール位置をトップに戻す関数
  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  // レイアウトアニメーションの設定
  const handleLayoutAnimation = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // 検索やフィルター変更時にレイアウトアニメーションを実行
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
        numColumns={columnCount}                                    // レスポンシブな列数
        key={`flatlist-${columnCount}`}                            // 列数変更時の再レンダリング
        columnWrapperStyle={columnCount > 1 ? styles.row : undefined} // 複数列時のラッパースタイル
        contentContainerStyle={[
          styles.listContainer,
          filteredAndSortedUsers.length === 0 && styles.emptyListContainer
        ]}
        showsVerticalScrollIndicator={false}                       // 垂直スクロールバー非表示
        showsHorizontalScrollIndicator={false}                     // 水平スクロールバー非表示
        ListEmptyComponent={renderEmptyComponent}                  // 空の状態表示
        ListFooterComponent={renderFooter}                         // フッター（ローディング表示）
        ItemSeparatorComponent={renderSeparator}                   // アイテム間のセパレーター
        refreshControl={                                           // プルトゥリフレッシュ
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}                              // 無限スクロール
        onEndReachedThreshold={0.1}                                // 読み込み開始の閾値
        onScroll={handleScroll}                                    // スクロールイベント
        scrollEventThrottle={16}                                   // スクロールイベントの頻度
        removeClippedSubviews={true}                               // パフォーマンス最適化
        maxToRenderPerBatch={10}                                   // バッチあたりの最大レンダリング数
        windowSize={10}                                            // レンダリングウィンドウサイズ
        initialNumToRender={ITEMS_PER_PAGE}                        // 初期レンダリング数
        getItemLayout={(data, index) => ({                         // アイテムレイアウト（パフォーマンス向上）
          length: 200, // カードの高さ
          offset: 200 * index,
          index,
        })}
        maintainVisibleContentPosition={{                          // コンテンツ位置の維持
          minIndexForVisible: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // 親コンテナをフルサイズに
  },
  listContainer: {
    padding: spacing.lg,        // 基本パディング
    paddingHorizontal: spacing.xl,  // 水平パディング
    paddingRight: spacing.xl + spacing.xl + spacing.xl + spacing.base, // 右側の追加パディング
  },
  emptyListContainer: {
    flex: 1,                    // 空の状態で中央配置
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'] * 2, // 垂直パディング
  },
  row: {
    justifyContent: 'space-between', // 複数列時のアイテム配置
  },
  separator: {
    height: spacing.sm,         // アイテム間のスペース
  },
  emptyContainer: {
    alignItems: 'center',       // 空の状態の中央配置
    paddingVertical: spacing['2xl'],
  },
  emptyTitle: {
    fontSize: typography.xl,    // 空の状態のタイトル
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.base,  // 空の状態のサブタイトル
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',       // ローディング表示のレイアウト
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  footerText: {
    fontSize: typography.base,  // ローディングテキスト
    color: colors.textSecondary,
  },
});

export default InfiniteUserList;

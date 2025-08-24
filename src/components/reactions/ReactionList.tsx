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
import ReactionCard from './ReactionCard';

// AndroidでLayoutAnimationを有効化
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// リアクション情報の型定義
interface Reaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'like' | 'super_like' | 'pass' | 'footprint';
  timestamp: Date;
  message?: string;
}

// ユーザー情報の型定義
interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt?: Date; // 登録日（新規ユーザー判定用）
}

// レイアウト情報の型定義（エクスプローラー画面と同じ）
interface CardLayout {
  cardWidth: number;
  cardHeight: number;
  imageHeight: number;
  cardGap: number;
  sideMargin: number;
  containerWidth: number;
  // 新しいグリッドレイアウト用のプロパティ
  columnCount: number;
  gridTemplateColumns?: string;
  gridGap?: string;
  mainContentAvailableWidth: number;
  drawerWidth: number;
}

interface ReactionListProps {
  reactions: Reaction[];
  users: User[];
  onReactionPress: (reaction: Reaction, user: User) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
  cardLayout: CardLayout; // カードレイアウト情報を追加
}

const ITEMS_PER_PAGE = 20;
const LOAD_MORE_THRESHOLD = 5;

const ReactionList: React.FC<ReactionListProps> = ({
  reactions,
  users,
  onReactionPress,
  onRefresh,
  refreshing = false,
  emptyMessage = 'リアクションがありません',
  cardLayout,
}) => {
  const { width } = useWindowDimensions();
  const [loadingMore, setLoadingMore] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // 列数を計算（エクスプローラー画面と同じ）
  const columnCount = useMemo(() => {
    if (width <= 570) return 1;
    if (width <= 960) return 2;
    if (width <= 1200) return 3;
    return 4;
  }, [width]);

  // リアクションカードのレンダリング
  const renderReactionCard = useCallback(({ item }: { item: Reaction }) => {
    // どちらのタブでも、リアクションを送ったユーザーのIDを使用
    // いいね: 他のユーザーから自分へのリアクション
    // 足あと: 他のユーザーが自分のプロフィールに残した足あと
    const targetUserId = item.fromUserId;

    // リアクションに対応するユーザーを検索
    const user = users.find(u => u.name === `user${targetUserId.slice(-1)}`) || users[0];

    return (
      <ReactionCard
        reaction={item}
        user={user}
        onPress={() => onReactionPress(item, user)}
        layout={cardLayout}
      />
    );
  }, [users, onReactionPress, cardLayout]);

  // 空の状態表示
  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💫</Text>
      <Text style={styles.emptyTitle}>まだリアクションがありません</Text>
      <Text style={styles.emptyMessage}>{emptyMessage}</Text>
    </View>
  ), [emptyMessage]);

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
  const keyExtractor = useCallback((item: Reaction) => item.id, []);

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

  // 列数変更時にレイアウトアニメーション
  React.useEffect(() => {
    handleLayoutAnimation();
  }, [columnCount, handleLayoutAnimation]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={reactions}
        renderItem={renderReactionCard}
        keyExtractor={keyExtractor}
        numColumns={cardLayout.columnCount} // カードレイアウトから列数を取得
        key={`flatlist-${cardLayout.columnCount}`}
        columnWrapperStyle={cardLayout.columnCount > 1 ? styles.row : undefined}
        contentContainerStyle={[
          styles.listContainer,
          reactions.length === 0 && styles.emptyListContainer
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          ) : undefined
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={ITEMS_PER_PAGE}
        getItemLayout={(data, index) => ({
          length: cardLayout.cardHeight + spacing.sm, // カードの高さ + マージン
          offset: (cardLayout.cardHeight + spacing.sm) * index,
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
    paddingHorizontal: spacing.lg,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.xl,
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

export default ReactionList;

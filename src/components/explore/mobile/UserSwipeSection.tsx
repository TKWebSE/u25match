import UnifiedUserCard, { User } from '@components/common/UnifiedUserCard';
import { useCardSize } from '@hooks/useCardSize';
import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// User型はUnifiedUserCardからインポート済み

// UserSwipeSectionのProps型定義
interface UserSwipeSectionProps {
  title: string;
  subtitle: string;
  users: User[];
  onCardPress: (user: User) => void;
}

/**
 * ユーザーカードスワイプセクションコンポーネント
 * タイトルと横スクロールでユーザーカードを表示
 */
const UserSwipeSection: React.FC<UserSwipeSectionProps> = ({
  title,
  subtitle,
  users,
  onCardPress
}) => {
  // 統一カードサイズを取得
  const cardSize = useCardSize('swiper');

  // カードのスペーシング設定
  const CARD_SPACING = cardSize.width + spacing.lg * 2;

  // スクロール位置の変更を監視
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / CARD_SPACING);
  };

  // 統一カードを使用したレンダリング
  const renderCard = (user: User, index: number) => {
    return (
      <UnifiedUserCard
        key={`${user.name}-${index}`}
        user={user}
        onPress={onCardPress}
        size={cardSize}
        layout="swiper"
      />
    );
  };

  if (users.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>ユーザーが見つかりません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* セクションタイトル */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* ユーザーカードスワイプエリア */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          decelerationRate={0.92}
          onScroll={handleScroll}
          scrollEventThrottle={1}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
          overScrollMode="always"
          scrollEnabled={true}
          directionalLockEnabled={true}
          alwaysBounceHorizontal={true}
          alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={false}
          scrollsToTop={false}
        >
          {users.map((user, index) => renderCard(user, index))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  carouselContainer: {
    height: 400, // 固定の高さでエラーを回避
    marginTop: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  // 統一カードコンポーネントを使用するため、カード関連のスタイルは削除
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: typography.lg,
    color: colors.textSecondary,
  },
});

export default UserSwipeSection;

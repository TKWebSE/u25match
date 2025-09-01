import { colors, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 画面サイズを取得
const { width: screenWidth } = Dimensions.get('window');

// ユーザー情報の型定義
interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt?: Date;
}

// カルーセルのProps型定義
interface UserCarouselProps {
  users: User[];
  onCardPress: (user: User) => void;
}

/**
 * スマホ用ユーザーカードカルーセルコンポーネント
 * 横スクロールでユーザーカードを表示
 */
const UserCarousel: React.FC<UserCarouselProps> = ({ users, onCardPress }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // カードのサイズ設定
  const CARD_WIDTH = screenWidth * 0.6; // 画面幅の60%（小さく）
  const CARD_HEIGHT = CARD_WIDTH * 1.1; // 縦横比1.1（Webと同様の比率）
  const CARD_MARGIN = spacing.lg;
  const CARD_SPACING = CARD_WIDTH + CARD_MARGIN * 2;

  // スクロール位置の変更を監視
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / CARD_SPACING);
    setCurrentIndex(index);
  };

  // 特定のカードにスクロール
  const scrollToCard = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * CARD_SPACING,
      animated: true,
    });
  };

  // 新規ユーザー判定
  const isNewUser = (user: User) => {
    if (!user.createdAt) return false;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return user.createdAt > oneWeekAgo;
  };

  // オンラインステータス判定
  const getOnlineStatusDisplay = (user: User) => {
    const isOnline = getOnlineStatus(user.lastActiveAt) === '🟢 オンライン';
    return { isOnline, icon: getOnlineStatusIcon(user.lastActiveAt) };
  };

  // カードレンダリング
  const renderCard = (user: User, index: number) => {
    const { isOnline, icon } = getOnlineStatusDisplay(user);
    const isNew = isNewUser(user);

    return (
      <TouchableOpacity
        key={`${user.name}-${index}`}
        style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
        onPress={() => onCardPress(user)}
        activeOpacity={0.9}
      >
        {/* 画像エリア */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />

          {/* NEWラベル */}
          {isNew && (
            <View style={styles.newLabel}>
              <Text style={styles.newLabelText}>NEW</Text>
            </View>
          )}

          {/* カード情報オーバーレイ */}
          <View style={styles.cardOverlay}>
            <View style={styles.userInfo}>
              <View style={styles.ageContainer}>
                <Text style={styles.ageOnlineIndicator}>{icon}</Text>
                <Text style={styles.userName}>{user.age}歳 </Text>
                <Text style={styles.userName}>{user.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
      {/* カルーセルタイトル */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>おすすめユーザー</Text>
        <Text style={styles.subtitle}>{users.length}人のユーザー</Text>
      </View>

      {/* ユーザーカードスワイプエリア */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollViewRef}
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
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
  card: {
    marginRight: spacing.lg,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  onlineDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: spacing.xs / 2,
    backgroundColor: colors.white,
  },
  onlineText: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: '600',
  },
  newLabel: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: '#FF6B6B',
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  newLabelText: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: 'bold',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderBottomLeftRadius: spacing.lg,
    borderBottomRightRadius: spacing.lg,
    padding: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ageOnlineIndicator: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.white,
  },
  locationContainer: {
    alignItems: 'flex-end',
  },
  userLocation: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
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

export default UserCarousel;

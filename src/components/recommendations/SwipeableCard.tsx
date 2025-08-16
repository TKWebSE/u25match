import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;
const ROTATION_ANGLE = 10;

interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  bio: string;
  tags: string[];
  isOnline: boolean;
  lastActiveAt: Date;
}

interface SwipeableCardProps {
  user: User;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  isActive?: boolean;
  cardIndex: number;
  currentIndex: number;
  onAnimationComplete?: (direction: 'left' | 'right') => void;
}

export interface SwipeableCardRef {
  animateCard: (direction: 'left' | 'right') => void;
}

const SwipeableCard = React.forwardRef<SwipeableCardRef, SwipeableCardProps>(({
  user,
  onLike,
  onPass,
  isActive = true,
  cardIndex,
  currentIndex,
  onAnimationComplete
}, ref) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const [imageError, setImageError] = useState(false);

  const isActiveCard = isActive;

  // ボタン操作時のアニメーション関数
  const animateCard = (direction: 'left' | 'right') => {
    if (!isActiveCard) return;

    const targetX = direction === 'right' ? screenWidth * 1.5 : -screenWidth * 1.5;
    const rotateValue = direction === 'right' ? ROTATION_ANGLE : -ROTATION_ANGLE;

    Animated.parallel([
      Animated.timing(pan.x, {
        toValue: targetX,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(pan.y, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotation, {
        toValue: rotateValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (direction === 'right') {
        onLike(user.id);
        onAnimationComplete?.('right');
      } else {
        onPass(user.id);
        onAnimationComplete?.('left');
      }
    });
  };

  // 外部からアニメーションを実行できるように関数を公開
  React.useImperativeHandle(ref, () => ({
    animateCard,
  }));

  // 画像エラー時の処理
  const handleImageError = () => {
    setImageError(true);
  };

  // 画像読み込み成功時の処理
  const handleImageLoad = () => {
    setImageError(false);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        if (!isActive) return false;
        return isActiveCard;
      },
      onPanResponderGrant: () => {
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        if (!isActiveCard) return;

        // スワイプの範囲を制限（画面幅の2倍以内）
        const maxSwipeDistance = screenWidth * 2;
        const clampedDx = Math.max(-maxSwipeDistance, Math.min(maxSwipeDistance, gesture.dx));
        const clampedDy = Math.max(-maxSwipeDistance, Math.min(maxSwipeDistance, gesture.dy));

        pan.setValue({ x: clampedDx, y: clampedDy });

        // 回転アニメーション（制限付き）
        const rotateValue = Math.max(-ROTATION_ANGLE, Math.min(ROTATION_ANGLE, clampedDx / screenWidth * ROTATION_ANGLE));
        rotation.setValue(rotateValue);

        // スケールアニメーション（制限付き）
        const scaleValue = Math.max(0.8, Math.min(1.2, 1 - Math.abs(clampedDx) / screenWidth * 0.2));
        scale.setValue(scaleValue);
      },
      onPanResponderRelease: (_, gesture) => {
        if (!isActiveCard) return;

        pan.flattenOffset();

        if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
          // スワイプ成功
          const direction = gesture.dx > 0 ? 1 : -1;
          const targetX = direction * screenWidth * 1.5;

          Animated.parallel([
            Animated.timing(pan.x, {
              toValue: targetX,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start(() => {
            if (direction > 0) {
              onLike(user.id);
            } else {
              onPass(user.id);
            }
          });
        } else {
          // スワイプ失敗、元の位置に戻る
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
            }),
            Animated.spring(rotation, {
              toValue: 0,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  // カードの初期アニメーション
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    scale.setValue(1);
    opacity.setValue(1);
    rotation.setValue(0);

    Animated.spring(scale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: false,
    }).start();
  }, [user.id]);

  const cardStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { scale: scale },
      {
        rotate: rotation.interpolate({
          inputRange: [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
          outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
        }),
      },
    ],
    opacity: opacity,
  };

  const likeOpacity = pan.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = pan.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, cardStyle]}
        {...(isActive ? panResponder.panHandlers : {})}
      >
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.image}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        {/* 画像読み込みエラー時のフォールバック */}
        {imageError && (
          <View style={styles.imageFallback}>
            <Text style={styles.fallbackText}>画像を読み込めませんでした</Text>
          </View>
        )}

        {/* オンラインインジケーター */}
        {user.isOnline && (
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>オンライン</Text>
          </View>
        )}

        {/* カード情報オーバーレイ */}
        <View style={styles.cardOverlay}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user.name}, {user.age}歳
            </Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>

          <Text style={styles.bio} numberOfLines={3}>
            {user.bio}
          </Text>

          <View style={styles.tagsContainer}>
            {user.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Like/Pass オーバーレイ */}
        <Animated.View style={[styles.likeOverlay, { opacity: likeOpacity }]}>
          <View style={styles.likeBadge}>
            <Text style={styles.likeText}>LIKE</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.passOverlay, { opacity: passOpacity }]}>
          <View style={styles.passBadge}>
            <Text style={styles.passText}>PASS</Text>
          </View>
        </Animated.View>

        {/* カード全体の色オーバーレイ */}
        <Animated.View style={[styles.colorOverlay, { opacity: likeOpacity }]}>
          <View style={styles.greenTint} />
        </Animated.View>

        <Animated.View style={[styles.colorOverlay, { opacity: passOpacity }]}>
          <View style={styles.redTint} />
        </Animated.View>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: Math.min(screenWidth - spacing.lg * 2, 640),
    height: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
  },
  fallbackText: {
    color: colors.textSecondary,
    fontSize: typography.base,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    top: spacing.base,
    right: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginRight: spacing.xs,
  },
  onlineText: {
    color: colors.white,
    fontSize: typography.sm,
    fontWeight: '600',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: spacing.lg,
  },
  userInfo: {
    marginBottom: spacing.sm,
  },
  userName: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: typography.sm,
    marginRight: spacing.xs,
  },
  location: {
    fontSize: typography.base,
    color: colors.white,
    fontWeight: '600',
  },
  bio: {
    fontSize: typography.base,
    color: colors.white,
    marginBottom: spacing.base,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  tagText: {
    color: colors.white,
    fontSize: typography.sm,
    fontWeight: '600',
  },
  likeOverlay: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.xl,
    transform: [{ rotate: '-30deg' }],
  },
  likeBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.base,
    borderWidth: 3,
    borderColor: colors.white,
  },
  likeText: {
    color: colors.white,
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passOverlay: {
    position: 'absolute',
    top: spacing.xl,
    right: spacing.xl,
    transform: [{ rotate: '30deg' }],
  },
  passBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.base,
    borderWidth: 3,
    borderColor: colors.white,
  },
  passText: {
    color: colors.white,
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  greenTint: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  redTint: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
  },
});

export default SwipeableCard;

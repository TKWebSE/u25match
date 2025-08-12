import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

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

interface InteractiveUserCardProps {
  user: User;
  onPress: (user: User) => void;
  onLike: (user: User) => void;
  onPass: (user: User) => void;
  onSuperLike: (user: User) => void;
}

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.25;
const ROTATION_ANGLE = 10;

const InteractiveUserCard: React.FC<InteractiveUserCardProps> = ({
  user,
  onPress,
  onLike,
  onPass,
  onSuperLike
}) => {
  const { width } = useWindowDimensions();
  const [isLiked, setIsLiked] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  // アニメーション値
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // カードの状態
  const [cardState, setCardState] = useState<'idle' | 'swiping' | 'liked' | 'passed'>('idle');

  // 最小カードサイズを定義
  const MIN_CARD_WIDTH = 140;
  const MIN_IMAGE_HEIGHT = 105;

  // 極端に小さな画面でのエラーを防ぐ
  const safeWidth = Math.max(width, 320);

  // 画面サイズに応じて列数とカードサイズを動的に調整
  const getResponsiveLayout = () => {
    const availableWidth = Math.max(safeWidth - 48, 280);

    let columns;
    if (safeWidth <= 570) {
      columns = 1;
    } else if (safeWidth <= 960) {
      columns = 2;
    } else if (safeWidth <= 1200) {
      columns = 3;
    } else {
      columns = 4;
    }

    const cardWidth = Math.max(availableWidth / columns, MIN_CARD_WIDTH);
    const imageHeight = Math.max(cardWidth * 0.75, MIN_IMAGE_HEIGHT);

    return {
      columns,
      cardWidth,
      imageHeight,
    };
  };

  const layout = getResponsiveLayout();
  const cardWidth = layout.cardWidth;
  const imageHeight = layout.imageHeight;

  const onlineStatus = getOnlineStatus(user.lastActiveAt);
  const onlineStatusIcon = getOnlineStatusIcon(user.lastActiveAt);
  const isOnline = onlineStatus === '🟢 オンライン';

  // スワイプジェスチャーの処理
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY, velocityX, velocityY } = event.nativeEvent;

      // スワイプの方向と速度を判定
      const isRightSwipe = translationX > SWIPE_THRESHOLD || velocityX > 500;
      const isLeftSwipe = translationX < -SWIPE_THRESHOLD || velocityX < -500;
      const isUpSwipe = translationY < -SWIPE_THRESHOLD || velocityY < -500;

      if (isRightSwipe) {
        handleLike();
      } else if (isLeftSwipe) {
        handlePass();
      } else if (isUpSwipe) {
        handleSuperLike();
      } else {
        // 元の位置に戻す
        resetCard();
      }
    }
  };

  const handleLike = () => {
    setCardState('liked');
    setIsLiked(true);
    onLike(user);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: screenWidth * 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: ROTATION_ANGLE,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePass = () => {
    setCardState('passed');
    setIsPassed(true);
    onPass(user);

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -screenWidth * 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: -ROTATION_ANGLE,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSuperLike = () => {
    onSuperLike(user);
    // スーパーライクの特別なアニメーション
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetCard = () => {
    setCardState('idle');
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(rotation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  };

  // カードの回転とスケールを計算
  const cardRotation = rotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
  });

  const cardScale = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // スワイプ中のリアルタイム回転
  const swipeRotation = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
    extrapolate: 'clamp',
  });

  const styles = StyleSheet.create({
    card: {
      width: cardWidth,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.lg,
      marginLeft: spacing.xs,
      marginRight: 0,
      ...shadows.base,
      overflow: 'hidden',
      position: 'relative',
    },
    imageContainer: {
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: imageHeight,
      resizeMode: 'cover',
    },
    onlineIndicator: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.online,
      borderWidth: 3,
      borderColor: colors.white,
    },
    verifiedBadge: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
      backgroundColor: colors.primary,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      padding: spacing.base,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      marginBottom: spacing.xs,
    },
    userName: {
      fontSize: typography.base,
      fontWeight: typography.semibold,
      color: colors.textPrimary,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      fontSize: typography.xs,
      marginRight: 3,
    },
    userLocation: {
      fontSize: typography.base,
      color: colors.textSecondary,
    },
    onlineStatusIcon: {
      fontSize: typography.sm,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
    tag: {
      backgroundColor: colors.primary + '20',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
    },
    tagText: {
      fontSize: typography.xs,
      color: colors.primary,
      fontWeight: '500',
    },
    distanceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    distanceText: {
      fontSize: typography.xs,
      color: colors.textTertiary,
      marginLeft: spacing.xs,
    },
    mutualFriendsInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    mutualFriendsText: {
      fontSize: typography.xs,
      color: colors.textTertiary,
      marginLeft: spacing.xs,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.gray300,
    },
    actionButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    passButton: {
      backgroundColor: colors.error + '20',
    },
    superLikeButton: {
      backgroundColor: colors.warning + '20',
    },
    likeButton: {
      backgroundColor: colors.success + '20',
    },
    actionIcon: {
      fontSize: 20,
    },
    passIcon: {
      color: colors.error,
    },
    superLikeIcon: {
      color: colors.warning,
    },
    likeIcon: {
      color: colors.success,
    },
    swipeIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.base,
      borderRadius: borderRadius.lg,
      opacity: 0,
    },
    swipeIndicatorText: {
      color: colors.white,
      fontSize: typography.lg,
      fontWeight: 'bold',
    },
  });

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX },
                { translateY },
                { rotate: cardState === 'idle' ? swipeRotation : cardRotation },
                { scale: cardScale },
              ],
              opacity,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => onPress(user)}
            activeOpacity={0.9}
            style={{ flex: 1 }}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />
              {isOnline && <View style={styles.onlineIndicator} />}
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                </View>
              )}
            </View>

            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.onlineStatusIcon}>
                  {onlineStatusIcon}
                </Text>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.age}歳
                </Text>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.userLocation} numberOfLines={1}>
                    {user.location}
                  </Text>
                </View>
              </View>

              {user.tags && user.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {user.tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {user.distance && (
                <View style={styles.distanceInfo}>
                  <Ionicons name="location" size={12} color={colors.textTertiary} />
                  <Text style={styles.distanceText}>{user.distance}km</Text>
                </View>
              )}

              {user.mutualFriends && user.mutualFriends > 0 && (
                <View style={styles.mutualFriendsInfo}>
                  <Ionicons name="people" size={12} color={colors.textTertiary} />
                  <Text style={styles.mutualFriendsText}>
                    {user.mutualFriends}人の共通の友達
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.passButton]}
              onPress={handlePass}
            >
              <Ionicons name="close" size={20} style={[styles.actionIcon, styles.passIcon]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.superLikeButton]}
              onPress={handleSuperLike}
            >
              <Ionicons name="star" size={20} style={[styles.actionIcon, styles.superLikeIcon]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton]}
              onPress={handleLike}
            >
              <Ionicons name="heart" size={20} style={[styles.actionIcon, styles.likeIcon]} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default InteractiveUserCard;

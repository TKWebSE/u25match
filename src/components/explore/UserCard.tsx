import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt?: Date; // 登録日を追加
}

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { width } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const newLabelAnim = useRef(new Animated.Value(0)).current; // NEWラベル用のアニメーション

  // カードサイズを固定（画面幅に関係なく一定のサイズ）
  const cardWidth = 320; // 固定幅320px（160 * 2）
  const cardHeight = 400; // 固定高さ400px（下部分を縮小）
  const imageHeight = 256; // 固定画像高さ256px（128 * 2）

  const onlineStatus = getOnlineStatus(user.lastActiveAt);
  const onlineStatusIcon = getOnlineStatusIcon(user.lastActiveAt);
  const isOnline = onlineStatus === '🟢 オンライン';

  // 登録1週間以内かどうかを判定
  const isNewUser = () => {
    if (!user.createdAt) return false;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return user.createdAt > oneWeekAgo;
  };

  useEffect(() => {
    // 控えめなエントランスアニメーション
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // NEWラベルのアニメーション（新規ユーザーの場合のみ）
    if (isNewUser()) {
      Animated.sequence([
        Animated.timing(newLabelAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.spring(newLabelAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
          delay: 200, // カードのアニメーション後に開始
        }),
      ]).start();
    }
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  };

  const handlePress = () => {
    // タップ時の視覚的フィードバック
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 200,
        friction: 6,
      }),
    ]).start();

    // 元のonPressを実行
    onPress(user);
  };

  const styles = StyleSheet.create({
    card: {
      width: cardWidth,
      height: cardHeight,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.base,
      marginLeft: spacing.xs,
      marginRight: 0, // 右側のマージンを削除
      ...shadows.base,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      height: imageHeight,
    },
    cardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    onlineIndicator: {
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.online,
      borderWidth: 2,
      borderColor: colors.white,
    },
    newLabel: {
      position: 'absolute',
      top: spacing.xs,
      left: spacing.xs,
      backgroundColor: '#FF6B6B', // 目立つ赤色
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.sm,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    newLabelText: {
      color: colors.white,
      fontSize: typography.xs,
      fontWeight: typography.bold,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    cardContent: {
      padding: spacing.sm,
      flex: 1,
      justifyContent: 'space-between',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    userName: {
      fontSize: typography.lg, // 年齢を大きく表示
      fontWeight: typography.semibold,
      color: colors.textPrimary,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      fontSize: typography.xs,
      marginRight: 2,
    },
    userLocation: {
      fontSize: typography.base, // 住所を大きく表示
      fontWeight: typography.medium,
      color: colors.textSecondary,
    },
    onlineStatusIcon: {
      fontSize: typography.xs,
    },
    onlineStatusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />
          {isOnline && <View style={styles.onlineIndicator} />}
          {isNewUser() && (
            <Animated.View
              style={[
                styles.newLabel,
                {
                  opacity: newLabelAnim,
                  transform: [{
                    translateY: newLabelAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [8, 0],
                    })
                  }],
                },
              ]}
            >
              <Text style={styles.newLabelText}>NEW</Text>
            </Animated.View>
          )}
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.userName} numberOfLines={1}>
              {user.age}歳
            </Text>
            <View style={styles.onlineStatusContainer}>
              <Text style={styles.onlineStatusIcon}>
                {onlineStatusIcon}
              </Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <View style={styles.locationIconContainer}>
              <Text style={styles.locationIcon}>📍</Text>
            </View>
            <Text style={styles.userLocation} numberOfLines={1}>
              {user.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;

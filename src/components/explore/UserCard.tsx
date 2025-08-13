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

  // 最小カードサイズを定義
  const MIN_CARD_WIDTH = 140; // 最小カード幅
  const MIN_IMAGE_HEIGHT = 168; // 最小画像高さ（140 * 1.2）- 縦長最適化

  // 極端に小さな画面でのエラーを防ぐ
  const safeWidth = Math.max(width, 320); // 最小320pxを確保

  // 画面サイズに応じて列数とカードサイズを動的に調整
  const getResponsiveLayout = () => {
    const availableWidth = Math.max(safeWidth - 48, 280); // 最小幅を確保

    // 画面幅に基づいて列数を決定
    let columns;
    if (safeWidth <= 570) {
      columns = 1; // 480×837のトグルデバイスシミュレーション
    } else if (safeWidth <= 960) {
      columns = 2; // 570px超
    } else if (safeWidth <= 1200) {
      columns = 3; // 960px超
    } else {
      columns = 4; // 最大4列
    }

    const cardWidth = Math.max(availableWidth / columns, MIN_CARD_WIDTH); // 最小カード幅を確保
    const imageHeight = Math.max(cardWidth * 1.2, MIN_IMAGE_HEIGHT); // 縦長最適化（1.2のアスペクト比）

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
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.lg,
      marginLeft: spacing.xs,
      marginRight: 0, // 右側のマージンを削除
      ...shadows.base,
      overflow: 'hidden',
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
    newLabel: {
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
      backgroundColor: '#FF6B6B', // 目立つ赤色
      paddingHorizontal: spacing.lg, // 横のパディングをさらに増加
      paddingVertical: spacing.base, // 縦のパディングをさらに増加
      borderRadius: borderRadius.base, // 角丸を少し大きく
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3, // 影を少し強く
      },
      shadowOpacity: 0.3, // 影の透明度を上げる
      shadowRadius: 4.65, // 影の範囲を広げる
      elevation: 8, // Androidの影を強く
      borderWidth: 2, // 白い境界線を追加
      borderColor: '#FFFFFF',
    },
    newLabelText: {
      color: colors.white,
      fontSize: typography.base, // フォントサイズをさらに大きく
      fontWeight: typography.bold,
      textAlign: 'center',
      letterSpacing: 0.5, // 文字間隔を少し広げる
    },
    cardContent: {
      padding: spacing.base,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
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
      fontWeight: typography.semibold, // 年齢と同じ太さに変更
      color: colors.textPrimary, // 年齢と同じ濃さに変更
    },
    onlineStatusIcon: {
      fontSize: typography.sm,
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
                      outputRange: [10, 0],
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
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;

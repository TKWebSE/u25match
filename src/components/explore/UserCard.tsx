import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import { isWeb } from '@utils/platform';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

// レイアウト情報の型定義
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

// UserCardコンポーネントのProps型定義
interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
  layout: CardLayout;
}

/**
 * ユーザーカードコンポーネント
 * エクスプローラ画面でユーザー情報を表示するカード
 */
const UserCard: React.FC<UserCardProps> = ({ user, onPress, layout }) => {
  // アニメーション用の値
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const newLabelAnim = useRef(new Animated.Value(0)).current;

  // レイアウト情報を分割代入
  const { cardWidth, cardHeight, imageHeight, gridTemplateColumns, gridGap } = layout;

  // Web環境でのグリッドスタイル
  const webGridStyle = isWeb ? {
    width: cardWidth,
    height: cardHeight,
    // CSS Gridの設定（親コンテナで使用）
    gridTemplateColumns,
    gridGap,
  } : {};

  // オンラインステータスの取得
  const onlineStatusIcon = getOnlineStatusIcon(user.lastActiveAt);
  const isOnline = getOnlineStatus(user.lastActiveAt) === '🟢 オンライン';

  /**
   * 登録1週間以内の新規ユーザーかどうかを判定
   * @returns {boolean} 新規ユーザーの場合true
   */
  const isNewUser = () => {
    if (!user.createdAt) return false;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return user.createdAt > oneWeekAgo;
  };

  // コンポーネントマウント時のアニメーション初期化
  useEffect(() => {
    // カードのエントランスアニメーション
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
          delay: 200, // カードアニメーション後に開始
        }),
      ]).start();
    }
  }, []);

  // タッチ開始時のアニメーション
  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // タッチ終了時のアニメーション
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  };

  // カードタップ時の処理
  const handlePress = () => {
    // タップ時の視覚的フィードバックアニメーション
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

    // 親コンポーネントのonPressを実行
    onPress(user);
  };

  // スタイル定義
  const styles = StyleSheet.create({
    // カード全体のスタイル
    card: {
      width: cardWidth,
      height: cardHeight,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      ...shadows.base,
      overflow: 'hidden',
    },
    // 画像コンテナのスタイル
    imageContainer: {
      position: 'relative',
      height: imageHeight,
    },
    // カード画像のスタイル
    cardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    // オンラインインジケーター（緑の丸）
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
    // オンラインインジケーターの緑の丸
    onlineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.online,
      marginRight: spacing.xs,
    },
    // オンラインインジケーターのテキスト
    onlineText: {
      color: colors.white,
      fontSize: typography.sm,
      fontWeight: '600',
    },
    // NEWラベルのスタイル
    newLabel: {
      position: 'absolute',
      top: spacing.xs,
      left: spacing.xs,
      backgroundColor: '#FF6B6B',
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
    // NEWラベルのテキストスタイル
    newLabelText: {
      color: colors.white,
      fontSize: typography.xs,
      fontWeight: typography.bold,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    // カードコンテンツエリアのスタイル
    cardContent: {
      padding: spacing.sm,
      flex: 1,
      justifyContent: 'space-between',
    },
    // 情報行のレイアウト
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    // ユーザー情報（年齢と住所）のコンテナ
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    // 年齢テキストのスタイル
    ageText: {
      fontSize: typography.lg,
      fontWeight: typography.semibold,
      color: colors.textPrimary,
    },
    // 住所コンテナのスタイル
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    // 住所アイコン（📍）のスタイル
    locationIcon: {
      fontSize: typography.xs,
    },
    // 住所テキストのスタイル
    locationText: {
      fontSize: typography.base,
      fontWeight: typography.medium,
      color: colors.textSecondary,
    },
    // オンラインステータスコンテナのスタイル
    onlineStatusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // オンラインステータスアイコンのスタイル
    onlineStatusIcon: {
      fontSize: typography.xs,
    },
    // カード情報オーバーレイのスタイル
    cardOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: spacing.lg,
    },
    // オーバーレイ内のユーザー情報コンテナ
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    // オーバーレイ内のユーザー名
    userName: {
      fontSize: typography.xl,
      fontWeight: 'bold',
      color: colors.white,
      marginBottom: spacing.xs,
    },
    // オーバーレイ内のユーザー住所
    userLocation: {
      fontSize: typography.xl,
      color: colors.white,
      fontWeight: 'bold',
    },
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* 画像エリア */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />
          {/* オンラインインジケーター */}
          {isOnline && (
            <View style={styles.onlineIndicator}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>オンライン</Text>
            </View>
          )}
          {/* NEWラベル（新規ユーザーの場合のみ表示） */}
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

          {/* カード情報オーバーレイ */}
          <View style={styles.cardOverlay}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user.age}歳
              </Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.userLocation}>{user.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* カード情報エリア（削除） */}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default UserCard;

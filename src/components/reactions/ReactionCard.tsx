import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import { isWeb } from '@utils/platform';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

// ReactionCardコンポーネントのProps型定義
interface ReactionCardProps {
  reaction: Reaction;
  user: User;
  onPress: () => void;
  layout: CardLayout;
}

/**
 * リアクションカードコンポーネント
 * エクスプローラ画面のUserCardと同じスタイルでリアクション情報を表示するカード
 */
const ReactionCard: React.FC<ReactionCardProps> = ({ reaction, user, onPress, layout }) => {
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

  /**
   * リアクションタイプに応じたアイコンを取得
   * @returns {string} リアクションアイコン
   */
  const getReactionIcon = () => {
    switch (reaction.type) {
      case 'like':
        return '❤️';
      case 'super_like':
        return '⭐';
      case 'pass':
        return '👋';
      case 'footprint':
        return '👣';
      default:
        return '💫';
    }
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
    onPress();
  };

  // スタイル定義（エクスプローラー画面のUserCardと完全に同じ）
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
      paddingHorizontal: spacing.base,
      paddingVertical: spacing.sm,
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
      fontSize: typography.base,
      fontWeight: typography.bold,
      textAlign: 'center',
      letterSpacing: 0.3,
    },
    // リアクションインジケーターのスタイル
    reactionIndicator: {
      position: 'absolute',
      top: spacing.xs,
      left: spacing.xs,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      paddingHorizontal: spacing.base,
      paddingVertical: spacing.sm,
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
    // リアクションインジケーターのテキストスタイル
    reactionIndicatorText: {
      color: colors.white,
      fontSize: typography.base,
      fontWeight: typography.bold,
      textAlign: 'center',
      letterSpacing: 0.3,
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
    // オーバーレイ内のユーザー住所コンテナ
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // オーバーレイ内のユーザー住所アイコン
    locationIcon: {
      fontSize: typography.xl,
      marginRight: spacing.xs,
    },
    // 年齢コンテナのスタイル
    ageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    // 年齢オンラインインジケーターのスタイル
    ageOnlineIndicator: {
      fontSize: typography.base,
      marginRight: spacing.xs,
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
              <View style={styles.ageContainer}>
                {/* 年齢の左側にオンラインステータス表示（絵文字アイコン） */}
                <Text style={styles.ageOnlineIndicator}>
                  {getOnlineStatusIcon(user.lastActiveAt)}
                </Text>
                <Text style={styles.userName}>
                  {user.age}歳
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.userLocation}>{user.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ReactionCard;

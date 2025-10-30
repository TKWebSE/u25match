import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from '../../../styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '../../../utils/getOnlineStatus';

// ユーザー情報の型定義
interface User {
  name: string;
  gender: 'male' | 'female' | 'other'; // 性別
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt?: Date; // 登録日（新規ユーザー判定用）
}

// カードサイズの型定義
interface CardSize {
  width: number;
  height: number;
}

// レイアウトタイプ
type LayoutType = 'grid' | 'swiper';

// UnifiedUserCardコンポーネントのProps型定義
interface UnifiedUserCardProps {
  user: User;
  onPress: (user: User) => void;
  size: CardSize;
  layout: LayoutType;
}

/**
 * 統一されたユーザーカードコンポーネント
 * エクスプローラー、リアクション、その他の画面で使用する統一カード
 */
const UnifiedUserCard: React.FC<UnifiedUserCardProps> = ({
  user,
  onPress,
  size,
  layout
}) => {
  // アニメーション用の値
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const newLabelAnim = useRef(new Animated.Value(0)).current;

  // オンラインステータスの取得
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

  // レイアウトに応じたマージン設定
  const getMarginStyle = () => {
    if (layout === 'grid') {
      return {
        marginBottom: spacing.sm,
      };
    }
    return {
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
    };
  };

  // スタイル定義
  const styles = StyleSheet.create({
    // カード全体のスタイル
    card: {
      width: size.width,
      height: size.height,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      ...getMarginStyle(),
      ...shadows.base,
      overflow: 'hidden',
    },
    // 画像コンテナのスタイル
    imageContainer: {
      position: 'relative',
      height: '100%',
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
      borderRadius: 20,
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
    // カード情報オーバーレイのスタイル
    cardOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: spacing.xs, // 元のサイズから半分に縮小
    },
    // オーバーレイ内のユーザー情報コンテナ
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    // 年齢コンテナのスタイル
    ageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    // 年齢オンラインインジケーターのスタイル
    ageOnlineIndicator: {
      fontSize: typography.sm,
      marginRight: spacing.xs,
    },
    // オーバーレイ内のユーザー名（年齢）
    userName: {
      fontSize: typography.base,
      fontWeight: 'bold',
      color: colors.white,
    },
    // オーバーレイ内のユーザー住所コンテナ
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    // オーバーレイ内のユーザー住所
    userLocation: {
      fontSize: typography.base,
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

export default UnifiedUserCard;
export type { CardSize, LayoutType, User };


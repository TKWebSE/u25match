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

/**
 * ユーザー情報のインターフェース
 * インタラクティブなユーザーカードで表示されるユーザーの基本情報を定義
 */
interface User {
  id: string;                    // ユニークID
  name: string;                  // ユーザー名
  age: number;                   // 年齢
  location: string;              // 居住地
  imageUrl: string;              // プロフィール画像URL
  isOnline: boolean;             // オンライン状態
  lastActiveAt: Date;            // 最終アクティブ時刻
  tags?: string[];               // タグ（趣味・興味など）
  verified?: boolean;            // 認証済みかどうか
  distance?: number;             // 距離（km）
  mutualFriends?: number;        // 共通の友達数
}

/**
 * InteractiveUserCardコンポーネントのプロパティ
 * スワイプジェスチャー対応のユーザーカードの設定とイベントハンドラーを定義
 */
interface InteractiveUserCardProps {
  user: User;                           // 表示するユーザー情報
  onPress: (user: User) => void;        // カードタップ時のコールバック
  onLike: (user: User) => void;         // いいね時のコールバック
  onPass: (user: User) => void;         // パス時のコールバック
  onSuperLike: (user: User) => void;    // スーパーライク時のコールバック
}

// 定数定義
const { width: screenWidth } = Dimensions.get('window');  // 画面幅を取得
const SWIPE_THRESHOLD = screenWidth * 0.25;               // スワイプ判定の閾値（画面幅の25%）
const ROTATION_ANGLE = 10;                                // カードの回転角度（度）

/**
 * インタラクティブなユーザーカードコンポーネント
 * 
 * 主な機能：
 * - スワイプジェスチャー（右：いいね、左：パス、上：スーパーライク）
 * - レスポンシブなカードサイズ（画面幅に応じて動的調整）
 * - アニメーション（スワイプ、回転、スケール、フェード）
 * - オンライン状態表示
 * - 認証バッジ表示
 * - タグ表示
 * - アクションボタン（いいね、パス、スーパーライク）
 * 
 * @param props - コンポーネントのプロパティ
 * @returns JSX要素
 */
const InteractiveUserCard: React.FC<InteractiveUserCardProps> = ({
  user,
  onPress,
  onLike,
  onPass,
  onSuperLike
}) => {
  // 画面幅を取得（レスポンシブレイアウト用）
  const { width } = useWindowDimensions();

  // カードの状態管理
  const [isLiked, setIsLiked] = useState(false);      // いいね状態
  const [isPassed, setIsPassed] = useState(false);    // パス状態

  // アニメーション値の定義
  const translateX = useRef(new Animated.Value(0)).current;  // X軸移動
  const translateY = useRef(new Animated.Value(0)).current;  // Y軸移動
  const scale = useRef(new Animated.Value(1)).current;       // スケール
  const rotation = useRef(new Animated.Value(0)).current;    // 回転
  const opacity = useRef(new Animated.Value(1)).current;     // 透明度

  // カードの状態管理
  const [cardState, setCardState] = useState<'idle' | 'swiping' | 'liked' | 'passed'>('idle');

  // 最小カードサイズの定義
  const MIN_CARD_WIDTH = 140;        // 最小カード幅
  const MIN_IMAGE_HEIGHT = 105;      // 最小画像高さ

  // 極端に小さな画面でのエラーを防ぐための安全な幅
  const safeWidth = Math.max(width, 320);

  /**
   * レスポンシブなレイアウト計算
   * 画面幅に応じて列数とカードサイズを動的に調整
   * 
   * @returns レイアウト情報（列数、カード幅、画像高さ）
   */
  const getResponsiveLayout = () => {
    const availableWidth = Math.max(safeWidth - 48, 280);

    // 画面幅に応じた列数の決定
    let columns;
    if (safeWidth <= 570) {
      columns = 1;      // モバイル: 1列
    } else if (safeWidth <= 960) {
      columns = 2;      // タブレット: 2列
    } else if (safeWidth <= 1200) {
      columns = 3;      // デスクトップ小: 3列
    } else {
      columns = 4;      // デスクトップ大: 4列
    }

    // カードサイズの計算（最小サイズを保証）
    const cardWidth = Math.max(availableWidth / columns, MIN_CARD_WIDTH);
    const imageHeight = Math.max(cardWidth * 0.75, MIN_IMAGE_HEIGHT);

    return {
      columns,
      cardWidth,
      imageHeight,
    };
  };

  // レスポンシブレイアウトの適用
  const layout = getResponsiveLayout();
  const cardWidth = layout.cardWidth;
  const imageHeight = layout.imageHeight;

  // オンライン状態の取得と表示
  const onlineStatus = getOnlineStatus(user.lastActiveAt);
  const onlineStatusIcon = getOnlineStatusIcon(user.lastActiveAt);
  const isOnline = onlineStatus === '🟢 オンライン';

  // スワイプジェスチャーのイベント処理
  // リアルタイムでカードの位置を更新
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  /**
   * スワイプジェスチャーの状態変更処理
   * ジェスチャー終了時にスワイプの方向と速度を判定してアクションを実行
   * 
   * @param event - ジェスチャーイベント
   */
  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY, velocityX, velocityY } = event.nativeEvent;

      // スワイプの方向と速度を判定
      const isRightSwipe = translationX > SWIPE_THRESHOLD || velocityX > 500;    // 右スワイプ（いいね）
      const isLeftSwipe = translationX < -SWIPE_THRESHOLD || velocityX < -500;   // 左スワイプ（パス）
      const isUpSwipe = translationY < -SWIPE_THRESHOLD || velocityY < -500;     // 上スワイプ（スーパーライク）

      if (isRightSwipe) {
        handleLike();        // いいね処理
      } else if (isLeftSwipe) {
        handlePass();        // パス処理
      } else if (isUpSwipe) {
        handleSuperLike();   // スーパーライク処理
      } else {
        resetCard();         // 元の位置に戻す
      }
    }
  };

  /**
   * いいね処理
   * カードを右にスワイプして画面外に移動させるアニメーション
   */
  const handleLike = () => {
    setCardState('liked');
    setIsLiked(true);
    onLike(user);

    // 並列アニメーション：右移動、回転、フェードアウト
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: screenWidth * 1.5,    // 画面右端を超えて移動
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: ROTATION_ANGLE,       // 時計回りに回転
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,                    // フェードアウト
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * パス処理
   * カードを左にスワイプして画面外に移動させるアニメーション
   */
  const handlePass = () => {
    setCardState('passed');
    setIsPassed(true);
    onPass(user);

    // 並列アニメーション：左移動、回転、フェードアウト
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -screenWidth * 1.5,   // 画面左端を超えて移動
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: -ROTATION_ANGLE,      // 反時計回りに回転
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,                    // フェードアウト
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * スーパーライク処理
   * カードを上にスワイプした時の特別なアニメーション（スケール効果）
   */
  const handleSuperLike = () => {
    onSuperLike(user);

    // スーパーライクの特別なアニメーション：スケールアップ→ダウン
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,              // 少し拡大
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,                // 元のサイズに戻す
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * カードを元の位置にリセット
   * スワイプが閾値に達しなかった場合に元の位置に戻すアニメーション
   */
  const resetCard = () => {
    setCardState('idle');

    // 並列スプリングアニメーション：元の位置に戻す
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,                // X位置をリセット
        useNativeDriver: true,
        tension: 100,              // バネの張力
        friction: 8,               // 摩擦係数
      }),
      Animated.spring(translateY, {
        toValue: 0,                // Y位置をリセット
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(rotation, {
        toValue: 0,                // 回転をリセット
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();
  };

  // アニメーション値の補間計算
  // カードの回転角度を計算（-1から1の範囲を角度に変換）
  const cardRotation = rotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
  });

  // カードのスケールを計算（0から1の範囲をスケール値に変換）
  const cardScale = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  // スワイプ中のリアルタイム回転計算
  // スワイプの距離に応じてカードを回転させる
  const swipeRotation = translateX.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
    extrapolate: 'clamp',  // 範囲外の値をクランプ
  });

  // スタイル定義
  const styles = StyleSheet.create({
    card: {
      width: cardWidth,                    // レスポンシブなカード幅
      backgroundColor: colors.surface,     // カードの背景色
      borderRadius: borderRadius.lg,       // 角丸
      marginBottom: spacing.lg,            // 下マージン
      marginLeft: spacing.xs,              // 左マージン
      marginRight: 0,                      // 右マージン
      ...shadows.base,                     // シャドウ効果
      overflow: 'hidden',                  // はみ出しを隠す
      position: 'relative',                // 相対位置（絶対位置の子要素用）
    },
    imageContainer: {
      position: 'relative',              // 画像コンテナの相対位置
    },
    cardImage: {
      width: '100%',                     // 画像の幅（カード幅に合わせる）
      height: imageHeight,               // レスポンシブな画像高さ
      resizeMode: 'cover',               // 画像のリサイズモード
    },
    onlineIndicator: {
      position: 'absolute',              // オンラインインジケーターの絶対位置
      top: spacing.sm,                   // 上からの位置
      right: spacing.sm,                 // 右からの位置
      width: 16,                         // インジケーターの幅
      height: 16,                        // インジケーターの高さ
      borderRadius: 8,                   // 円形にする
      backgroundColor: colors.online,    // オンライン色
      borderWidth: 3,                    // 境界線の幅
      borderColor: colors.white,         // 境界線の色
    },
    verifiedBadge: {
      position: 'absolute',              // 認証バッジの絶対位置
      top: spacing.sm,                   // 上からの位置
      left: spacing.sm,                  // 左からの位置
      backgroundColor: colors.primary,   // プライマリー色
      borderRadius: 12,                  // 角丸
      width: 24,                         // バッジの幅
      height: 24,                        // バッジの高さ
      justifyContent: 'center',          // 中央揃え（縦）
      alignItems: 'center',              // 中央揃え（横）
    },
    cardContent: {
      padding: spacing.base,             // カードコンテンツのパディング
    },
    infoRow: {
      flexDirection: 'row',              // 横並びレイアウト
      alignItems: 'center',              // 中央揃え（縦）
      gap: spacing.sm,                   // 要素間のスペース
      marginBottom: spacing.xs,          // 下マージン
    },
    userName: {
      fontSize: typography.base,         // ユーザー名のフォントサイズ
      fontWeight: typography.semibold,   // フォントウェイト
      color: colors.textPrimary,         // テキスト色
    },
    locationContainer: {
      flexDirection: 'row',              // 横並びレイアウト
      alignItems: 'center',              // 中央揃え（縦）
    },
    locationIcon: {
      fontSize: typography.xs,           // 位置アイコンのサイズ
      marginRight: 3,                    // 右マージン
    },
    userLocation: {
      fontSize: typography.base,         // 居住地のフォントサイズ
      color: colors.textSecondary,       // セカンダリテキスト色
    },
    onlineStatusIcon: {
      fontSize: typography.sm,           // オンライン状態アイコンのサイズ
    },
    tagsContainer: {
      flexDirection: 'row',              // 横並びレイアウト
      flexWrap: 'wrap',                  // 折り返し許可
      gap: spacing.xs,                   // タグ間のスペース
      marginTop: spacing.xs,             // 上マージン
    },
    tag: {
      backgroundColor: colors.primary + '20',  // プライマリー色の20%透明度
      paddingHorizontal: spacing.sm,     // 横パディング
      paddingVertical: spacing.xs,       // 縦パディング
      borderRadius: borderRadius.sm,     // 角丸
    },
    tagText: {
      fontSize: typography.xs,           // タグテキストのサイズ
      color: colors.primary,             // プライマリー色
      fontWeight: '500',                 // フォントウェイト
    },
    distanceInfo: {
      flexDirection: 'row',              // 横並びレイアウト
      alignItems: 'center',              // 中央揃え（縦）
      marginTop: spacing.xs,             // 上マージン
    },
    distanceText: {
      fontSize: typography.xs,           // 距離テキストのサイズ
      color: colors.textTertiary,        // ターシャリテキスト色
      marginLeft: spacing.xs,            // 左マージン
    },
    mutualFriendsInfo: {
      flexDirection: 'row',              // 横並びレイアウト
      alignItems: 'center',              // 中央揃え（縦）
      marginTop: spacing.xs,             // 上マージン
    },
    mutualFriendsText: {
      fontSize: typography.xs,           // 共通の友達テキストのサイズ
      color: colors.textTertiary,        // ターシャリテキスト色
      marginLeft: spacing.xs,            // 左マージン
    },
    actionButtons: {
      flexDirection: 'row',              // 横並びレイアウト
      justifyContent: 'space-around',    // 均等配置
      paddingVertical: spacing.sm,       // 縦パディング
      borderTopWidth: 1,                 // 上境界線の幅
      borderTopColor: colors.gray300,    // 上境界線の色
    },
    actionButton: {
      width: 40,                         // ボタンの幅
      height: 40,                        // ボタンの高さ
      borderRadius: 20,                  // 円形ボタン
      justifyContent: 'center',          // 中央揃え（縦）
      alignItems: 'center',              // 中央揃え（横）
    },
    passButton: {
      backgroundColor: colors.error + '20',  // エラー色の20%透明度
    },
    superLikeButton: {
      backgroundColor: colors.warning + '20',  // 警告色の20%透明度
    },
    likeButton: {
      backgroundColor: colors.success + '20',  // 成功色の20%透明度
    },
    actionIcon: {
      fontSize: 20,                      // アクションアイコンのサイズ
    },
    passIcon: {
      color: colors.error,               // パスアイコンの色
    },
    superLikeIcon: {
      color: colors.warning,             // スーパーライクアイコンの色
    },
    likeIcon: {
      color: colors.success,             // いいねアイコンの色
    },
    swipeIndicator: {
      position: 'absolute',              // スワイプインジケーターの絶対位置
      top: '50%',                        // 上から50%
      left: '50%',                       // 左から50%
      transform: [{ translateX: -50 }, { translateY: -50 }],  // 中央配置
      backgroundColor: colors.primary,   // プライマリー色
      paddingHorizontal: spacing.lg,     // 横パディング
      paddingVertical: spacing.base,     // 縦パディング
      borderRadius: borderRadius.lg,     // 角丸
      opacity: 0,                        // 初期状態は非表示
    },
    swipeIndicatorText: {
      color: colors.white,               // テキスト色
      fontSize: typography.lg,           // フォントサイズ
      fontWeight: 'bold',                // フォントウェイト
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

import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { isWeb } from '@utils/platform';
import React, { useState } from 'react';
import { Animated, Image, Text } from 'react-native';

/**
 * ユーザーアバターのプロパティ
 */
interface UserAvatarProps {
  /** ユーザーの画像URL配列 */
  images?: (string | null)[] | undefined;
  /** ユーザーのメールアドレス（フォールバック用） */
  email?: string;
  /** アバターのサイズ */
  size?: number;
}

/**
 * ユーザーアバターコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - ユーザー画像の表示（1枚目）
 * - 画像がない場合のフォールバック表示
 * - アバターサイズの管理
 * - ホバーアニメーション（Web版）
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  images = [],
  email,
  size = 50
}) => {
  // アニメーション値の初期化
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isHovered, setIsHovered] = useState(false);

  // ユーザー画像がある場合は1枚目を表示
  const hasUserImage = images && images.length > 0;
  const userImageUrl = hasUserImage && images[0] ? images[0] : null;

  // ホバー開始時のアニメーション
  const handleHoverIn = () => {
    if (isWeb) {
      setIsHovered(true);
      Animated.timing(scaleAnim, {
        toValue: 1.1, // 10%拡大
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // ホバー終了時のアニメーション
  const handleHoverOut = () => {
    if (isWeb) {
      setIsHovered(false);
      Animated.timing(scaleAnim, {
        toValue: 1, // 元のサイズに戻る
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // アバターのスタイルを動的に生成
  const avatarStyle = {
    ...SettingsStyles.avatar,
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  // アニメーション付きアバタースタイル
  const animatedAvatarStyle = {
    ...avatarStyle,
    transform: [{ scale: scaleAnim }],
  };

  // アバターテキストのスタイルを動的に生成
  const avatarTextStyle = {
    ...SettingsStyles.avatarText,
    fontSize: size * 0.4, // サイズに応じてフォントサイズを調整
  };

  if (hasUserImage && userImageUrl) {
    // ユーザー画像がある場合
    return (
      <Animated.View
        style={animatedAvatarStyle}
        {...(isWeb && {
          onMouseEnter: handleHoverIn,
          onMouseLeave: handleHoverOut,
        })}
      >
        <Image
          source={{ uri: userImageUrl }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          resizeMode="cover"
        />
      </Animated.View>
    );
  } else {
    // ユーザー画像がない場合：グレーの人型アイコン
    return (
      <Animated.View
        style={[animatedAvatarStyle, { backgroundColor: '#9CA3AF' }]}
        {...(isWeb && {
          onMouseEnter: handleHoverIn,
          onMouseLeave: handleHoverOut,
        })}
      >
        <Text style={avatarTextStyle}>
          👤
        </Text>
      </Animated.View>
    );
  }
}; 

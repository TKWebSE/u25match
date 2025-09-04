import { MobileLikeButton } from '@components/profile/MobileLikeButton';
import { WebLikeButton } from '@components/profile/detail/WebLikeButton';
import React, { useEffect, useState } from 'react';
import { Animated, Platform } from 'react-native';

interface LikeButtonProps {
  onPress: () => void;    // いいねボタンが押された時の処理
  liked?: boolean;         // いいね済みかどうか（trueの場合は非表示）
}

/**
 * いいねボタンコンポーネント
 * プラットフォームに応じてWeb版またはモバイル版を表示
 * 
 * @param onPress - いいねボタンが押された時の処理
 * @param liked - いいね済みかどうか（デフォルト: false）
 */
export const LikeButton: React.FC<LikeButtonProps> = ({ onPress, liked = false }) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [shouldRender, setShouldRender] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // いいね済みになった時のフェードアウトアニメーション
  useEffect(() => {
    // アニメーション中はliked状態を無視
    if (liked && !isAnimating) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // 800msでゆっくりフェードアウト
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false); // アニメーション完了後にレンダリング停止
      });
    } else if (!liked) {
      // いいねが解除された場合は即座に表示
      fadeAnim.setValue(1);
      setShouldRender(true);
      setIsAnimating(false);
    }
  }, [liked, fadeAnim, isAnimating]);

  // ボタン押下時の処理
  const handlePress = () => {
    setIsAnimating(true); // アニメーション開始

    // ボタン押下の瞬間からフェードアウトを開始
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600, // パーティクルアニメーションと同じ時間
      useNativeDriver: true,
    }).start(() => {
      setShouldRender(false);
    });

    // アニメーション完了後にonPressを呼び出し
    setTimeout(() => {
      onPress();
      setIsAnimating(false);
    }, 1000); // パーティクルアニメーション完了後
  };

  // レンダリング停止中は何も表示しない
  if (!shouldRender) {
    return null;
  }

  // プラットフォームに応じて適切なコンポーネントを返す
  if (Platform.OS === 'web') {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <WebLikeButton onPress={handlePress} />
      </Animated.View>
    );
  } else {
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <MobileLikeButton onPress={handlePress} />
      </Animated.View>
    );
  }
};

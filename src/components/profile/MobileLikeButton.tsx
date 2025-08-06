import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MobileLikeButtonProps {
  onPress: () => void;
}

/**
 * モバイル版いいねボタン
 * タッチフィードバックと波紋効果付き
 */
export const MobileLikeButton: React.FC<MobileLikeButtonProps> = ({ onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rippleAnim] = useState(new Animated.Value(0));
  const [rippleOpacity] = useState(new Animated.Value(1));

  // タッチ開始時のアニメーション
  const handlePressIn = () => {
    // シンプルな波紋効果
    rippleAnim.setValue(0);
    rippleOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05, // 控えめなスケール
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  // タッチ終了時のアニメーション
  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.buttonContainer}>
      {/* 波紋エフェクト */}
      <Animated.View
        style={[
          styles.ripple,
          {
            transform: [
              {
                scale: rippleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 2],
                })
              }
            ],
            opacity: rippleOpacity
          }
        ]}
      />

      {/* メインボタン */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.likeText}>💖 いいねする</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    alignItems: 'center',
  },

  ripple: {
    position: 'absolute',
    width: 80, // 適度なサイズ
    height: 80, // 適度なサイズ
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 157, 0.2)', // モダンな色
    opacity: 0,
    transform: [{ scale: 0 }],
    borderWidth: 0, // ボーダーを削除
  },

  likeButton: {
    backgroundColor: '#FF6B9D', // モダンな色
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25, // より洗練された角丸
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0, // ボーダーを削除してモダンに
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  likeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5, // 文字間隔を調整
  },
}); 

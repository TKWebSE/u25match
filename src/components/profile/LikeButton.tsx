import React, { useState } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LikeButtonProps {
  onPress: () => void;    // いいねボタンが押された時の処理
  liked?: boolean;         // いいね済みかどうか（trueの場合は非表示）
}

/**
 * いいねボタンコンポーネント
 * 
 * @param onPress - いいねボタンが押された時の処理
 * @param liked - いいね済みかどうか（デフォルト: false）
 */
export const LikeButton: React.FC<LikeButtonProps> = ({ onPress, liked = false }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rippleAnim] = useState(new Animated.Value(0));
  const [rippleOpacity] = useState(new Animated.Value(1));
  const [particles, setParticles] = useState<Animated.Value[]>([]);
  const [showParticles, setShowParticles] = useState(false);

  // パーティクル爆発効果
  const createExplosion = () => {
    const newParticles = Array.from({ length: 6 }, () => new Animated.Value(0));
    setParticles(newParticles);
    setShowParticles(true);

    newParticles.forEach((particle, index) => {
      const angle = (index / 6) * 2 * Math.PI;
      const distance = 40 + Math.random() * 20;

      Animated.timing(particle, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setShowParticles(false);
      });
    });
  };

  // ホバー開始時のアニメーション
  const handleMouseEnter = () => {
    if (Platform.OS === 'web') {
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  // ホバー終了時のアニメーション
  const handleMouseLeave = () => {
    if (Platform.OS === 'web') {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  // タッチ開始時のアニメーション（モバイル用）
  const handlePressIn = () => {
    if (Platform.OS !== 'web') {
      // 波紋効果を開始
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
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  // タッチ終了時のアニメーション（モバイル用）
  const handlePressOut = () => {
    if (Platform.OS !== 'web') {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // ボタン押下時の処理
  const handlePress = () => {
    createExplosion(); // パーティクル爆発を開始
    onPress();
  };

  // いいね済みの場合は何も表示しない
  if (liked) {
    return null;
  }

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

      {/* パーティクル爆発エフェクト */}
      {showParticles && particles.map((particle, index) => {
        const angle = (index / 6) * 2 * Math.PI;
        const distance = 40 + Math.random() * 20;

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                transform: [
                  {
                    translateX: particle.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, Math.cos(angle) * distance],
                    })
                  },
                  {
                    translateY: particle.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, Math.sin(angle) * distance],
                    })
                  },
                  {
                    scale: particle.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    })
                  }
                ],
                opacity: particle.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                })
              }
            ]}
          >
            <Text style={styles.particleText}>💖</Text>
          </Animated.View>
        );
      })}

      {/* メインボタン */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          // @ts-ignore - Web専用のマウスイベント
          onMouseEnter={handleMouseEnter}
          // @ts-ignore - Web専用のマウスイベント
          onMouseLeave={handleMouseLeave}
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    opacity: 0,
    transform: [{ scale: 0 }],
  },

  likeButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  likeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  particle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  particleText: {
    fontSize: 16,
    color: 'white',
  },
}); 

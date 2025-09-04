import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WebLikeButtonProps {
  onPress: () => void;
}

/**
 * Web版いいねボタン
 * マウスホバー効果とパーティクル爆発エフェクト付き
 */
export const WebLikeButton: React.FC<WebLikeButtonProps> = ({ onPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [particles, setParticles] = useState<Animated.Value[]>([]);
  const [showParticles, setShowParticles] = useState(false);

  // パーティクル爆発効果
  const createExplosion = () => {
    const newParticles = Array.from({ length: 8 }, () => new Animated.Value(0)); // 数を減らして洗練感を出す
    setParticles(newParticles);
    setShowParticles(true);

    newParticles.forEach((particle, index) => {
      const angle = (index / 8) * 2 * Math.PI;
      const distance = 40 + Math.random() * 30; // 適度な距離

      Animated.timing(particle, {
        toValue: 1,
        duration: 600, // 短くしてスッキリ
        useNativeDriver: true,
      }).start(() => {
        setShowParticles(false);
      });
    });
  };

  // ホバー開始時のアニメーション
  const handleMouseEnter = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // ホバー終了時のアニメーション
  const handleMouseLeave = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // ボタン押下時の処理
  const handlePress = () => {
    createExplosion();
    onPress();
  };

  return (
    <View style={styles.buttonContainer}>
      {/* パーティクル爆発エフェクト */}
      {showParticles && particles.map((particle, index) => {
        const angle = (index / 8) * 2 * Math.PI; // パーティクル数に合わせて調整
        const distance = 40 + Math.random() * 30; // 適度な距離

        // モダンな色の配列
        const colors = [
          '#FF6B9D', '#FF8E9E', '#FFB3C1', '#FFD1DC',
          '#FF6B9D', '#FF8E9E', '#FFB3C1', '#FFD1DC'
        ];

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                backgroundColor: colors[index],
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
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, 1, 0], // シンプルなスケール変化
                    })
                  }
                ],
                opacity: particle.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [1, 1, 0],
                })
              }
            ]}
          />
        );
      })}

      {/* メインボタン */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={handlePress}
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

  particle: {
    position: 'absolute',
    width: 12, // 小さくして洗練感を出す
    height: 12, // 小さくして洗練感を出す
    borderRadius: 6,
    backgroundColor: '#FF6B9D',
    shadowColor: '#FF6B9D',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
});

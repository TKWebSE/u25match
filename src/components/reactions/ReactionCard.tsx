import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface ReactionCardProps {
  reaction: {
    id: string;
    fromUserId: string;
    toUserId: string;
    type: 'like' | 'super_like' | 'pass' | 'footprint';
    timestamp: Date;
    message?: string;
  };
  user: {
    name: string;
    age: number;
    location: string;
    imageUrl: string;
    isOnline: boolean;
    lastActiveAt: Date;
    gender: 'male' | 'female';
  };
  onPress: () => void;
}

const ReactionCard: React.FC<ReactionCardProps> = ({ reaction, user, onPress }) => {
  const { width } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    // 控えめなエントランスアニメーション
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
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
    onPress();
  };

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

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
          flex: 1, // グリッドレイアウト用
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.container, { width: cardWidth }]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        {/* メイン画像 - explore画面と同じ表示 */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: user.imageUrl }} style={[styles.cardImage, { height: imageHeight }]} />
          {user.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        {/* ユーザー情報 - explore画面と同じ表示 */}
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.onlineStatusIcon}>
              {getReactionIcon()}
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

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 0, // 右側のマージンを削除
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f3f4',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#fff',
  },
  cardContent: {
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  onlineStatusIcon: {
    fontSize: 16,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 3,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
  },
});

export default ReactionCard;

import { Colors } from '@constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

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
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const getReactionText = () => {
    switch (reaction.type) {
      case 'like':
        return 'いいね！';
      case 'super_like':
        return 'スーパーライク！';
      case 'pass':
        return 'パス';
      case 'footprint':
        return '足あと';
      default:
        return 'リアクション';
    }
  };

  const getReactionColor = () => {
    switch (reaction.type) {
      case 'like':
        return '#FF6B6B';
      case 'super_like':
        return '#FFD93D';
      case 'pass':
        return '#6C5CE7';
      case 'footprint':
        return '#A8E6CF';
      default:
        return Colors.light.tint;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return '今';
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`;
    return `${Math.floor(diffInMinutes / 1440)}日前`;
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
            <View style={[styles.onlineIndicator, { backgroundColor: user.isOnline ? '#4CAF50' : '#9E9E9E' }]} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.userMeta}>
              <Text style={styles.userAge}>{user.age}歳</Text>
              <View style={styles.separator} />
              <Text style={styles.userLocation}>{user.location}</Text>
            </View>
            <Text style={styles.timestamp}>{formatTimeAgo(reaction.timestamp)}</Text>
          </View>
        </View>

        <View style={styles.reactionInfo}>
          <View style={[styles.reactionIconContainer, { backgroundColor: getReactionColor() + '15' }]}>
            <Text style={styles.reactionIcon}>{getReactionIcon()}</Text>
          </View>
          <Text style={[styles.reactionText, { color: getReactionColor() }]}>
            {getReactionText()}
          </Text>
          {reaction.message && (
            <View style={styles.messageContainer}>
              <Text style={styles.message} numberOfLines={2}>
                {reaction.message}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
    // タップ可能であることを示すスタイル
    position: 'relative',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  userAge: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#666',
    marginHorizontal: 6,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400',
  },
  reactionInfo: {
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f3f4',
  },
  reactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  reactionIcon: {
    fontSize: 20,
  },
  reactionText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  messageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  message: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default ReactionCard;

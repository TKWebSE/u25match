import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const { width } = useWindowDimensions();

  // 最小カードサイズを定義
  const MIN_CARD_WIDTH = 140; // 最小カード幅
  const MIN_IMAGE_HEIGHT = 105; // 最小画像高さ（140 * 0.75）

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
    const imageHeight = Math.max(cardWidth * 0.75, MIN_IMAGE_HEIGHT); // 最小画像高さを確保

    return {
      columns,
      cardWidth,
      imageHeight,
    };
  };

  const layout = getResponsiveLayout();
  const cardWidth = layout.cardWidth;
  const imageHeight = layout.imageHeight;

  const onlineStatus = getOnlineStatus(user.lastActiveAt);
  const onlineStatusIcon = getOnlineStatusIcon(user.lastActiveAt);
  const isOnline = onlineStatus === '🟢 オンライン';

  const styles = StyleSheet.create({
    card: {
      width: cardWidth,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.lg,
      marginLeft: spacing.xs,
      marginRight: 0, // 右側のマージンを削除
      ...shadows.base,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
    },
    cardImage: {
      width: '100%',
      height: imageHeight,
      resizeMode: 'cover',
    },
    onlineIndicator: {
      position: 'absolute',
      top: spacing.sm,
      right: spacing.sm,
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.online,
      borderWidth: 3,
      borderColor: colors.white,
    },
    cardContent: {
      padding: spacing.base,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    userName: {
      fontSize: typography.base,
      fontWeight: typography.semibold,
      color: colors.textPrimary,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationIcon: {
      fontSize: typography.xs,
      marginRight: 3,
    },
    userLocation: {
      fontSize: typography.base,
      color: colors.textSecondary,
    },
    onlineStatusIcon: {
      fontSize: typography.sm,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(user)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />
        {isOnline && <View style={styles.onlineIndicator} />}
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
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

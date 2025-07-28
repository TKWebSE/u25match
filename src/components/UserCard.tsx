import { borderRadius, colors, shadows, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;
const imageHeight = 180;

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const onlineStatus = getOnlineStatus(user.lastActiveAt);
  const isOnline = onlineStatus === '🟢 オンライン';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(user)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.cardImage} />
        {isOnline && <View style={styles.onlineIndicator} />}

        {/* 年齢バッジ */}
        <View style={styles.ageBadge}>
          <Text style={styles.ageBadgeText}>{user.age}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.userName} numberOfLines={1}>
          {user.name}
        </Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.userLocation} numberOfLines={1}>
            {user.location}
          </Text>
        </View>
        <Text style={styles.onlineStatus} numberOfLines={1}>
          {onlineStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
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
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  ageBadge: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  ageBadgeText: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  cardContent: {
    padding: spacing.base,
  },
  userName: {
    fontSize: typography.base,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationIcon: {
    fontSize: typography.xs,
    marginRight: 3,
  },
  userLocation: {
    fontSize: typography.xs,
    color: colors.textSecondary,
    flex: 1,
  },
  onlineStatus: {
    fontSize: typography.xs,
    color: colors.online,
    fontWeight: typography.medium,
  },
});

export default UserCard;

import { colors, spacing, typography } from '@styles/globalStyles';
import { getOnlineStatus, getOnlineStatusIcon } from '@utils/getOnlineStatus';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ユーザー情報の型定義
interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  createdAt?: Date;
}

// UserGridのProps型定義
interface UserGridProps {
  users: User[];
  onCardPress: (user: User) => void;
}

/**
 * Web用ユーザーグリッドコンポーネント
 * グリッドレイアウトでユーザーカードを表示
 */
const UserGrid: React.FC<UserGridProps> = ({ users, onCardPress }) => {
  // 新規ユーザー判定
  const isNewUser = (user: User) => {
    if (!user.createdAt) return false;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return user.createdAt > oneWeekAgo;
  };

  // オンラインステータス判定
  const getOnlineStatusDisplay = (user: User) => {
    const isOnline = getOnlineStatus(user.lastActiveAt) === '🟢 オンライン';
    return { isOnline, icon: getOnlineStatusIcon(user.lastActiveAt) };
  };

  if (users.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>ユーザーが見つかりません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>おすすめユーザー</Text>
      <View style={styles.gridContainer}>
        {users.map((user, index) => {
          const { isOnline, icon } = getOnlineStatusDisplay(user);
          const isNew = isNewUser(user);

          return (
            <TouchableOpacity
              key={`${user.name}-${index}`}
              style={styles.gridItem}
              onPress={() => onCardPress(user)}
              activeOpacity={0.9}
            >
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>📷</Text>
                  </View>

                  {/* オンラインインジケーター */}
                  {isOnline && (
                    <View style={styles.onlineIndicator}>
                      <View style={styles.onlineDot} />
                      <Text style={styles.onlineText}>オンライン</Text>
                    </View>
                  )}

                  {/* NEWラベル */}
                  {isNew && (
                    <View style={styles.newLabel}>
                      <Text style={styles.newLabelText}>NEW</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardContent}>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userAge}>{user.age}歳</Text>
                  </View>
                  <View style={styles.locationContainer}>
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.locationText}>{user.location}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={styles.statusIcon}>{icon}</Text>
                    <Text style={styles.statusText}>
                      {isOnline ? 'オンライン' : 'オフライン'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  gridItem: {
    width: 'calc(33.333% - 16px)',
    minWidth: 280,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: colors.background,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  imageText: {
    fontSize: 48,
  },
  onlineIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  onlineDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: spacing.xs / 2,
    backgroundColor: colors.white,
  },
  onlineText: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: '600',
  },
  newLabel: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: '#FF6B6B',
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  newLabelText: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  userName: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  userAge: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  locationIcon: {
    fontSize: typography.base,
  },
  locationText: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statusIcon: {
    fontSize: typography.base,
  },
  statusText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: typography.lg,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default UserGrid;

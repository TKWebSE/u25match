import { Colors } from '@constants/Colors';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import ReactionCard from './ReactionCard';

interface Reaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'like' | 'super_like' | 'pass' | 'footprint';
  timestamp: Date;
  message?: string;
}

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
  gender: 'male' | 'female';
}

interface ReactionListProps {
  reactions: Reaction[];
  users: User[];
  onReactionPress: (reaction: Reaction, user: User) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
}

const ReactionList: React.FC<ReactionListProps> = ({
  reactions,
  users,
  onReactionPress,
  onRefresh,
  refreshing = false,
  emptyMessage = 'リアクションがありません',
}) => {
  const renderReactionCard = ({ item }: { item: Reaction }) => {
    // どちらのタブでも、リアクションを送ったユーザーのIDを使用
    // いいね: 他のユーザーから自分へのリアクション
    // 足あと: 他のユーザーが自分のプロフィールに残した足あと
    const targetUserId = item.fromUserId;

    // リアクションに対応するユーザーを検索
    const user = users.find(u => u.name === `user${targetUserId.slice(-1)}`) || users[0];

    return (
      <ReactionCard
        reaction={item}
        user={user}
        onPress={() => onReactionPress(item, user)}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>💫</Text>
      <Text style={styles.emptyTitle}>まだリアクションがありません</Text>
      <Text style={styles.emptyMessage}>{emptyMessage}</Text>
    </View>
  );

  return (
    <FlatList
      data={reactions}
      renderItem={renderReactionCard}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.tint]}
            tintColor={Colors.light.tint}
          />
        ) : undefined
      }
      ListEmptyComponent={renderEmptyState}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 8,
    minHeight: '100%',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default ReactionList;

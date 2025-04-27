import { Colors } from '@constants/Colors';
import { getProfilePath } from '@constants/routes';
import { users } from '@mock/exploreUserMock';
import { mockSentReactions } from '@mock/reactionsMock';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// いいね履歴アイテムの型定義
interface LikesHistoryItem {
  id: string;
  user: {
    id: string;
    name: string;
    age: number;
    location: string;
    imageUrl: string;
    isOnline: boolean;
    lastActiveAt: Date;
    gender: 'male' | 'female';
  };
  reactionType: 'like' | 'footprint';
  timestamp: Date;
  message?: string;
}

// いいね履歴スクリーン
const LikesHistoryScreen = () => {
  const router = useRouter();
  const [likesHistory, setLikesHistory] = useState<LikesHistoryItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // いいね履歴データを取得
  const fetchLikesHistory = async () => {
    try {
      setLoading(true);

      // モックデータからいいね履歴を構築（足跡とスーパーいいねは除外）
      const historyItems: LikesHistoryItem[] = mockSentReactions
        .filter((reaction) => reaction.type !== 'footprint' && reaction.type !== 'super_like') // 足跡とスーパーいいねを除外
        .map((reaction) => {
          // ランダムなユーザー情報を取得（実際の実装ではAPIから取得）
          const randomUser = users[Math.floor(Math.random() * users.length)];

          return {
            id: reaction.id,
            user: {
              id: reaction.toUserId,
              name: randomUser.name,
              age: randomUser.age,
              location: randomUser.location,
              imageUrl: randomUser.imageUrl,
              isOnline: randomUser.isOnline,
              lastActiveAt: randomUser.lastActiveAt,
              gender: randomUser.gender,
            },
            reactionType: reaction.type,
            timestamp: reaction.timestamp,
            message: reaction.message,
          };
        });

      // タイムスタンプでソート（新しい順）
      historyItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

      setLikesHistory(historyItems);
    } catch (error) {
      console.error('いいね履歴の取得に失敗しました:', error);
      Alert.alert('エラー', 'いいね履歴の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // プルリフレッシュ処理
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLikesHistory();
    setRefreshing(false);
  };

  // 初回データ取得
  useEffect(() => {
    fetchLikesHistory();
  }, []);

  // ユーザープロフィール画面への遷移
  const handleUserPress = (userId: string) => {
    router.push(getProfilePath(userId) as any);
  };

  // リアクションタイプの表示テキストを取得
  const getReactionTypeText = (type: string) => {
    switch (type) {
      case 'like':
        return '❤️ いいね';
      case 'footprint':
        return '👣 足あと';
      default:
        return '❤️ いいね';
    }
  };

  // タイムスタンプの表示テキストを取得
  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return '今';
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}時間前`;
    return `${Math.floor(diffInMinutes / 1440)}日前`;
  };

  // いいね履歴アイテムのレンダリング
  const renderLikesHistoryItem = ({ item }: { item: LikesHistoryItem }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleUserPress(item.user.id)}
      activeOpacity={0.7}
    >
      {/* ユーザーアバター */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.imageUrl }} style={styles.avatar} />
        <View style={[styles.onlineIndicator, { backgroundColor: item.user.isOnline ? '#4CAF50' : '#9E9E9E' }]} />
      </View>

      {/* ユーザー情報 */}
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userAge}>{item.user.age}歳</Text>
        </View>
        <Text style={styles.userLocation}>{item.user.location}</Text>
        <View style={styles.reactionInfo}>
          <Text style={styles.reactionType}>{getReactionTypeText(item.reactionType)}</Text>
          {item.message && (
            <Text style={styles.message} numberOfLines={2}>
              {item.message}
            </Text>
          )}
        </View>
      </View>

      {/* タイムスタンプ */}
      <View style={styles.timestampContainer}>
        <Text style={styles.timestamp}>{getTimeAgo(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );

  // 空の状態表示
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>いいね履歴がありません</Text>
      <Text style={styles.emptyStateSubtitle}>
        まだ誰にもいいねを送っていません
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* いいね履歴一覧 */}
      <FlatList
        data={likesHistory}
        renderItem={renderLikesHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.container}
        contentContainerStyle={likesHistory.length === 0 ? styles.emptyContainer : undefined}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  userInfo: {
    flex: 1,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: 8,
  },
  userAge: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
  },
  userLocation: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    marginBottom: 8,
  },
  reactionInfo: {
    marginTop: 4,
  },
  reactionType: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.tint,
    marginBottom: 4,
  },
  message: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
    fontStyle: 'italic',
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
  },
});

export default LikesHistoryScreen;

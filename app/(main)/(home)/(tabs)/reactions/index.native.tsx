import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import UserCard from '@components/explore/UserCard';
import ReactionTabs from '@components/reactions/ReactionTabs';
import { getProfilePath } from '@constants/routes';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface User {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline: boolean;
  lastActiveAt: Date;
}

const ReactionsScreen = () => {
  const router = useRouter();

  // カードリストエリアの幅を計測（デフォルト値を設定）
  const [cardListWidth, setCardListWidth] = useState(300); // デフォルト値を設定

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');

  // カードレイアウト情報を取得（カードリストエリアの幅のみ使用）
  const cardLayout = useCardLayout(cardListWidth);

  // リアクションデータからユーザーリストを生成
  const getReactionUsers = () => {
    console.log('🎯 getReactionUsers 実行開始');
    console.log('🎯 activeTab:', activeTab);
    console.log('🎯 mockReactions:', mockReactions);
    console.log('🎯 reactionUsers:', reactionUsers);

    const likeReactions = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
    const footprintReactions = mockReactions.filter(r => r.type === 'footprint');

    console.log('🎯 likeReactions:', likeReactions);
    console.log('🎯 footprintReactions:', footprintReactions);

    const currentReactions = activeTab === 'likes' ? likeReactions : footprintReactions;
    console.log('🎯 currentReactions:', currentReactions);

    const users = currentReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      console.log('🎯 生成されたユーザー:', user);
      return user;
    });

    console.log('🎯 最終的なユーザーリスト:', users);
    return users;
  };

  const filteredUsers = getReactionUsers();

  // デバッグ用のuseEffect
  useEffect(() => {
    console.log('🎯 ReactionsScreen マウント完了');
    console.log('🎯 cardListWidth:', cardListWidth);
    console.log('🎯 cardLayout:', cardLayout);
    console.log('🎯 filteredUsers:', filteredUsers);
    console.log('🎯 filteredUsers.length:', filteredUsers.length);
  }, [cardListWidth, cardLayout, filteredUsers]);

  const handleCardPress = (user: User) => {
    console.log('🎯 カードタップ:', user);
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: 'likes' | 'footprints') => {
    console.log('🎯 リアクションタブ切り替え:', tab);
    setActiveTab(tab);
  };

  const renderUserItem = ({ item }: { item: User }) => {
    console.log('🎯 renderUserItem 実行:', item);
    return (
      <UserCard user={item} onPress={handleCardPress} layout={cardLayout} />
    );
  };

  const renderEmptyComponent = () => {
    console.log('🎯 renderEmptyComponent 実行');
    if (filteredUsers.length === 0) {
      console.log('🎯 EmptyState を表示');
      return (
        <EmptyState
          message={
            activeTab === 'likes'
              ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
              : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。'
          }
        />
      );
    }
    console.log('🎯 EmptyState は表示しない');
    return null;
  };

  console.log('🎯 ReactionsScreen レンダリング開始');
  console.log('🎯 filteredUsers.length:', filteredUsers.length);
  console.log('🎯 cardLayout.columnCount:', cardLayout.columnCount);

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>🎯 ReactionsScreen レンダリング中</Text>

      {/* リアクションタブ */}
      <ReactionTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* カードリストエリアの幅を計測（エクスプローラー画面と同じ） */}
      <View
        style={styles.cardListArea}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          console.log('🎯 onLayout 実行, width:', width);
          setCardListWidth(width);
        }}
      >
        <Text style={styles.debugText}>🎯 カードリストエリア幅: {cardListWidth}px</Text>
        <Text style={styles.debugText}>🎯 列数: {cardLayout.columnCount}</Text>
        <Text style={styles.debugText}>🎯 ユーザー数: {filteredUsers.length}</Text>

        {/* モバイル環境用のFlatList */}
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            numColumns={Math.max(1, cardLayout.columnCount)} // 最低1列を保証
            key={`flatlist-${cardLayout.columnCount}`}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
            onLayout={() => console.log('🎯 FlatList onLayout 実行')}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.debugText}>🎯 FlatList は表示しない（ユーザーが0人）</Text>
            {renderEmptyComponent()}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.lg,
  },
  cardListArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  debugText: {
    color: 'red',
    fontSize: 12,
    padding: 4,
    backgroundColor: 'yellow',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default ReactionsScreen;

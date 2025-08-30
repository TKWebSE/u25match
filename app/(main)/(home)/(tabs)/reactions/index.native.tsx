import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import UserCard from '@components/explore/UserCard';
import ReactionTabs from '@components/reactions/ReactionTabs';
import { getProfilePath } from '@constants/routes';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

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
    const likeReactions = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
    const footprintReactions = mockReactions.filter(r => r.type === 'footprint');

    const currentReactions = activeTab === 'likes' ? likeReactions : footprintReactions;

    return currentReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  };

  const filteredUsers = getReactionUsers();

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: 'likes' | 'footprints') => {
    setActiveTab(tab);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <UserCard user={item} onPress={handleCardPress} layout={cardLayout} />
  );

  const renderEmptyComponent = () => {
    if (filteredUsers.length === 0) {
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
    return null;
  };

  return (
    <View style={styles.container}>
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
          setCardListWidth(width);
        }}
      >
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
          />
        ) : (
          <View style={styles.emptyContainer}>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default ReactionsScreen;

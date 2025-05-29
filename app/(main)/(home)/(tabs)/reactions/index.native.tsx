import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionTabs from '@components/reactions/ReactionTabs';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/useCardSize';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// User型はUnifiedUserCardからインポート済み

const ReactionsScreen = () => {
  const router = useRouter();

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

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

  // 統一カードを使用したレンダリング
  const renderUserItem = ({ item, index }: { item: User; index: number }) => {
    return (
      <UnifiedUserCard
        key={`${item.name}-${index}`}
        user={item}
        onPress={handleCardPress}
        size={gridCardSize}
        layout="grid"
      />
    );
  };

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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* リアクションタブ */}
        <ReactionTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />

        {/* カードリストエリア */}
        <View style={styles.cardListArea}>
          {filteredUsers.length > 0 ? (
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              numColumns={2}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={renderEmptyComponent}
            />
          ) : (
            <View style={styles.emptyStateContainer}>
              {renderEmptyComponent()}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardListArea: {
    flex: 1,
  },
  gridContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    marginBottom: spacing.sm,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default ReactionsScreen;

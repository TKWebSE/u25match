import EmptyState from '@components/common/EmptyState';
import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/ui';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

const ReactionsScreen = () => {
  const router = useRouter();

  // タブの状態管理
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'likes', title: '💕 いいね' },
    { key: 'footprints', title: '👣 足あと' },
  ]);

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // リアクションデータをメモ化（パフォーマンス向上）
  const { likeReactions, footprintReactions } = useMemo(() => {
    const likes = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
    const footprints = mockReactions.filter(r => r.type === 'footprint');
    return { likeReactions: likes, footprintReactions: footprints };
  }, []);

  // いいねタブのユーザーリスト
  const likesUsers = useMemo(() => {
    return likeReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  }, [likeReactions]);

  // 足あとタブのユーザーリスト
  const footprintsUsers = useMemo(() => {
    return footprintReactions.map((reaction, index) => {
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };
      user.imageUrl = getUserImageUrl(reaction.id);
      return user;
    });
  }, [footprintReactions]);

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // 統一カードを使用したレンダリング（メモ化）
  const renderUserItem = useCallback(({ item, index }: { item: User; index: number }) => {
    return (
      <UnifiedUserCard
        key={`${item.name}-${index}`}
        user={item}
        onPress={handleCardPress}
        size={gridCardSize}
        layout="grid"
      />
    );
  }, [gridCardSize, handleCardPress]);

  // いいねタブのレンダリング
  const renderLikesTab = useCallback(() => {
    if (likesUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState
            message="まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！"
          />
        </View>
      );
    }

    return (
      <FlatList
        data={likesUsers}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => `likes-${item.name}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        // パフォーマンス最適化
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
        getItemLayout={(data, index) => ({
          length: gridCardSize.height,
          offset: gridCardSize.height * Math.floor(index / 2),
          index,
        })}
      />
    );
  }, [likesUsers, renderUserItem, gridCardSize]);

  // 足あとタブのレンダリング
  const renderFootprintsTab = useCallback(() => {
    if (footprintsUsers.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <EmptyState
            message="まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。"
          />
        </View>
      );
    }

    return (
      <FlatList
        data={footprintsUsers}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => `footprints-${item.name}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        // パフォーマンス最適化
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
        getItemLayout={(data, index) => ({
          length: gridCardSize.height,
          offset: gridCardSize.height * Math.floor(index / 2),
          index,
        })}
      />
    );
  }, [footprintsUsers, renderUserItem, gridCardSize]);

  // シーン定義
  const renderScene = SceneMap({
    likes: renderLikesTab,
    footprints: renderFootprintsTab,
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: screenWidth }}
          animationEnabled={true}
          swipeEnabled={true}
          lazy={false}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              tabStyle={styles.tabStyle}
              indicatorStyle={styles.tabIndicator}
              activeColor={colors.primary}
              inactiveColor={colors.textSecondary}
              scrollEnabled={false}
              pressColor="transparent"
              pressOpacity={0.8}
              indicatorContainerStyle={styles.indicatorContainer}
            />
          )}
        />
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
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    position: 'relative',
  },
  tabStyle: {
    paddingVertical: 12,
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: 3,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 1,
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

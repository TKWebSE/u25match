import UnifiedUserCard, { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionsEmptyState from '@components/reactions/multi/ReactionsEmptyState';
import ReactionsLoadingState from '@components/reactions/multi/ReactionsLoadingState';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/ui';
import { useAuthStore } from '@stores/authStore';
import { useReactionsStore } from '@stores/reactionsStore';
import { colors, spacing } from '@styles/globalStyles';
import { getReactions } from '@usecases/reactions/getReactions';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

// User型はUnifiedUserCardからインポート済み
const { width: screenWidth } = Dimensions.get('window');

const ReactionsScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { likes, footprints, isLoading } = useReactionsStore();

  // タブの状態管理
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'likes', title: '💕 いいね' },
    { key: 'footprints', title: '👣 足あと' },
  ]);

  // 統一カードサイズを取得
  const gridCardSize = useCardSize('grid');

  // リアクションデータを取得
  useEffect(() => {
    if (user?.uid) {
      getReactions(user.uid).catch((error) => {
        console.error('リアクション取得エラー:', error);
      });
    }
  }, [user?.uid]);

  // いいねタブのユーザーリスト
  const likesUsers = likes;

  // 足あとタブのユーザーリスト
  const footprintsUsers = footprints;

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
    if (isLoading) {
      return <ReactionsLoadingState />;
    }

    if (likesUsers.length === 0) {
      return <ReactionsEmptyState activeTab="likes" />;
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
  }, [likesUsers, renderUserItem, gridCardSize, isLoading]);

  // 足あとタブのレンダリング
  const renderFootprintsTab = useCallback(() => {
    if (isLoading) {
      return <ReactionsLoadingState />;
    }

    if (footprintsUsers.length === 0) {
      return <ReactionsEmptyState activeTab="footprints" />;
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
  }, [footprintsUsers, renderUserItem, gridCardSize, isLoading]);

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
});

export default ReactionsScreen;

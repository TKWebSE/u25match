import { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionsTabList from '@components/reactions/mobile/ReactionsTabList.native';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/ui';
import { useAuthStore } from '@stores/authStore';
import { useReactionsStore } from '@stores/reactionsStore';
import { colors } from '@styles/globalStyles';
import { getReactions } from '@usecases/reactions/getReactions';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
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

  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // いいねタブのレンダリング
  const renderLikesTab = useCallback(() => {
    return (
      <ReactionsTabList
        users={likes}
        isLoading={isLoading}
        activeTab="likes"
        onCardPress={handleCardPress}
        gridCardSize={gridCardSize}
      />
    );
  }, [likes, isLoading, handleCardPress, gridCardSize]);

  // 足あとタブのレンダリング
  const renderFootprintsTab = useCallback(() => {
    return (
      <ReactionsTabList
        users={footprints}
        isLoading={isLoading}
        activeTab="footprints"
        onCardPress={handleCardPress}
        gridCardSize={gridCardSize}
      />
    );
  }, [footprints, isLoading, handleCardPress, gridCardSize]);

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
});

export default ReactionsScreen;

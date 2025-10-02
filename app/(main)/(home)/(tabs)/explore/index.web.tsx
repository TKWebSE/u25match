import ExploreTabs from '@/src/components/explore/web/ExploreTabs';
import WebUserGrid from '@/src/components/search/web/WebUserGrid';
import { getProfilePath } from '@constants/routes';
import { User } from '@my-types/search';
import { useExploreStore } from '@stores/exploreStore';
import { spacing } from '@styles/globalStyles';
import { getUserList } from '@usecases/explore';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// 探索画面コンポーネント - ユーザー検索・探索機能（Web版）
const ExploreScreen = () => {
  const router = useRouter();

  // ストアの状態管理
  const { users, isLoading, activeTab, switchTab } = useExploreStore();

  // 初回読み込み
  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        await getUserList({
          page: 1,
          limit: 30,
          filters: { tab: activeTab }
        });
      } catch (error: any) {
        showErrorToast(error.message || 'ユーザー一覧の取得に失敗しました');
      }
    };

    fetchInitialUsers();
  }, [activeTab]);

  // カードタップハンドラー
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);

  // タブ切り替えハンドラー
  const handleTabPress = (tab: any) => {
    switchTab(tab as 'recommended' | 'beginner' | 'online' | 'nearby');
  };


  return (
    <View style={styles.container}>

      {/* タブエリア */}
      <ExploreTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* Web環境用のグリッドレイアウト */}
      <WebUserGrid
        users={users}
        emptyMessage={isLoading ? "ユーザーを読み込み中..." : "ユーザーが見つかりません"}
        onCardPress={handleCardPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
});

export default ExploreScreen;

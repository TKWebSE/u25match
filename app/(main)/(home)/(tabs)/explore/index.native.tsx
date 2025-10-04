import { LogoHeader } from '@components/common';
import { User } from '@components/common/mobile/UnifiedUserCard';
import { ExploreTabs, ExploreUserGrid } from '@components/explore/mobile';
import { EXPLORE_TAB_ORDER, ExploreTabType } from '@constants/exploreTabs';
import { getProfilePath } from '@constants/routes';
import { useExploreStore } from '@stores/exploreStore';
import { colors, spacing } from '@styles/globalStyles';
import { getUserList } from '@usecases/explore';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// 探索画面コンポーネント - ユーザー検索・探索機能
const ExploreScreen = () => {
  const router = useRouter();

  // ストアの状態管理
  const { users, isLoading, activeTab, switchTab } = useExploreStore();

  // 初回読み込み
  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        await getUserList({
          limit: 30,
          filters: { tab: activeTab }
        });
      } catch (error: any) {
        showErrorToast(error.message || 'ユーザー一覧の取得に失敗しました');
      }
    };

    fetchInitialUsers();
  }, [activeTab]);


  // カードタップハンドラーをメモ化
  const handleCardPress = useCallback((user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  }, [router]);


  // タブ切り替えハンドラー
  const handleTabPress = (tab: ExploreTabType) => {
    switchTab(tab);
  };

  // 横スワイプでタブ切り替え
  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      const { translationX } = event;
      const currentIndex = EXPLORE_TAB_ORDER.indexOf(activeTab);

      // 左スワイプ（次のタブ）
      if (translationX < -50 && currentIndex < EXPLORE_TAB_ORDER.length - 1) {
        const nextTab = EXPLORE_TAB_ORDER[currentIndex + 1];
        switchTab(nextTab);
      }
      // 右スワイプ（前のタブ）
      else if (translationX > 50 && currentIndex > 0) {
        const prevTab = EXPLORE_TAB_ORDER[currentIndex - 1];
        switchTab(prevTab);
      }
    });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ロゴヘッダー */}
        <LogoHeader />

        {/* タブエリア */}
        <ExploreTabs
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />

        {/* メインコンテンツ */}
        <GestureDetector gesture={panGesture}>
          <View style={{ flex: 1 }}>
            <ExploreUserGrid
              users={users}
              isLoading={isLoading}
              activeTab={activeTab}
              onCardPress={handleCardPress}
            />
          </View>
        </GestureDetector>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.sm, // スクロール時の下部パディングをさらに縮小
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  // セクションヘッダーのスタイルはExploreSectionHeaderコンポーネントに移動
  loadingFooter: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  loadingFooterText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  // 統一カードコンポーネントを使用するため、カード関連のスタイルは削除
});

export default ExploreScreen;

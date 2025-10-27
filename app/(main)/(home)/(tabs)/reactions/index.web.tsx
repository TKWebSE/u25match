import ReactionTabs from '@/src/components/reactions/web/ReactionTabs.web';
import { User } from '@components/common/mobile/UnifiedUserCard';
import ReactionsTabList from '@components/reactions/web/ReactionsTabList.web';
import { getProfilePath } from '@constants/routes';
import { useCardSize } from '@hooks/ui';
import { useAuthStore } from '@stores/authStore';
import { useReactionsStore } from '@stores/reactionsStore';
import { colors, spacing } from '@styles/globalStyles';
import { getReactions } from '@usecases/reactions/getReactions';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const ReactionsScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { likes, footprints, isLoading } = useReactionsStore();

  // タブの状態管理
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');

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

  // タブ切り替えハンドラー
  const handleTabPress = useCallback((tab: 'likes' | 'footprints') => {
    setActiveTab(tab);
  }, []);

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

  const renderContent = () => {
    if (activeTab === 'likes') {
      return renderLikesTab();
    }
    return renderFootprintsTab();
  };

  return (
    <View style={styles.container}>
      {/* リアクションタブ */}
      <ReactionTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* カードリストエリア */}
      <View style={styles.cardListArea}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  cardListArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: spacing.base,
  },
});

export default ReactionsScreen;

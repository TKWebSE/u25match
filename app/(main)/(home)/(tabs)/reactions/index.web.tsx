import ReactionTabs from '@/src/components/reactions/web/ReactionTabs.web';
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
import { ScrollView, StyleSheet, View } from 'react-native';

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

  // いいねタブのユーザーリスト
  const likesUsers = likes;

  // 足あとタブのユーザーリスト
  const footprintsUsers = footprints;

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
    if (isLoading) {
      return <ReactionsLoadingState />;
    }

    if (likesUsers.length === 0) {
      return <ReactionsEmptyState activeTab="likes" />;
    }

    return (
      <ScrollView
        style={styles.webScrollView}
        contentContainerStyle={styles.webScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {likesUsers.map((user, index) => (
          <UnifiedUserCard
            key={`${user.name}-${index}`}
            user={user}
            onPress={handleCardPress}
            size={gridCardSize}
            layout="grid"
          />
        ))}
      </ScrollView>
    );
  }, [likesUsers, handleCardPress, gridCardSize, isLoading]);

  // 足あとタブのレンダリング
  const renderFootprintsTab = useCallback(() => {
    if (isLoading) {
      return <ReactionsLoadingState />;
    }

    if (footprintsUsers.length === 0) {
      return <ReactionsEmptyState activeTab="footprints" />;
    }

    return (
      <ScrollView
        style={styles.webScrollView}
        contentContainerStyle={styles.webScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {footprintsUsers.map((user, index) => (
          <UnifiedUserCard
            key={`${user.name}-${index}`}
            user={user}
            onPress={handleCardPress}
            size={gridCardSize}
            layout="grid"
          />
        ))}
      </ScrollView>
    );
  }, [footprintsUsers, handleCardPress, gridCardSize, isLoading]);

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
  // Web環境用のスクロールスタイル
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
});

export default ReactionsScreen;

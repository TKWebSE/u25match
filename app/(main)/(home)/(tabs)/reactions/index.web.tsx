import ReactionTabs from '@/src/components/reactions/web/ReactionTabs.web';
import EmptyState from '@components/common/EmptyState';
import UserCard from '@components/common/UserCard';
import WebGridLayout from '@components/common/WebGridLayout';
import { getProfilePath } from '@constants/routes';
import { useCardLayout } from '@hooks/ui';
import { useAuthStore } from '@stores/authStore';
import { useReactionsStore } from '@stores/reactionsStore';
import { colors, spacing } from '@styles/globalStyles';
import { getReactions } from '@usecases/reactions/getReactions';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

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
  const { user } = useAuthStore();
  const { likes, footprints, isLoading } = useReactionsStore();

  // カードリストエリアの幅を計測（シンプル化）
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');

  // カードレイアウト情報を取得（カードリストエリアの幅のみ使用）
  const cardLayout = useCardLayout(cardListWidth);

  // リアクションデータを取得
  useEffect(() => {
    if (user?.uid) {
      getReactions(user.uid).catch((error) => {
        console.error('リアクション取得エラー:', error);
      });
    }
  }, [user?.uid]);

  // リアクションデータからユーザーリストを生成
  const filteredUsers: User[] = useMemo(() => {
    // TODO: 実際のユーザープロフィール情報を取得する処理を追加
    return [];
  }, [likes, footprints, activeTab]);

  const handleCardPress = (user: User) => {
    const userId = user.name.toLowerCase().replace(/\s+/g, '-');
    router.push(getProfilePath(userId) as any);
  };

  // タブ切り替えハンドラー
  const handleTabPress = (tab: 'likes' | 'footprints') => {
    setActiveTab(tab);
    console.log('🎯 リアクション画面 Web版 タブ切り替え:', tab);
  };

  const renderEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

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

      {/* カードリストエリアの幅を計測 */}
      <View
        style={styles.cardListArea}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setCardListWidth(width);
          console.log('🎯 リアクション画面 Web版 カードリストエリアの幅:', width);
        }}
      >
        {/* Web環境用のグリッドレイアウト */}
        {filteredUsers.length > 0 ? (
          <ScrollView
            style={styles.webScrollView}
            contentContainerStyle={styles.webScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <WebGridLayout
              gridTemplateColumns={cardLayout.gridTemplateColumns}
              gridGap={cardLayout.gridGap}
            >
              {filteredUsers.map((user, index) => (
                <UserCard
                  key={`${user.name}-${index}`}
                  user={user}
                  onPress={handleCardPress}
                  layout={cardLayout}
                />
              ))}
            </WebGridLayout>
          </ScrollView>
        ) : (
          renderEmptyComponent()
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
});

export default ReactionsScreen;

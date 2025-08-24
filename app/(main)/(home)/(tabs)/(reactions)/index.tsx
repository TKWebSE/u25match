import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import WebGridLayout from '@components/explore/WebGridLayout';
import { ReactionList, ReactionTabs } from '@components/reactions';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { isWeb } from '@utils/platform';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// リアクションの型定義
interface Reaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: 'like' | 'super_like' | 'pass' | 'footprint';
  timestamp: Date;
  message?: string;
}

const ReactionsScreen = () => {
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');
  const [refreshing, setRefreshing] = useState(false);
  const [cardListWidth, setCardListWidth] = useState(0);

  // カードレイアウト情報を取得（エクスプローラー画面と同じ）
  const cardLayout = useCardLayout(cardListWidth);

  // いいねと足あとを分離
  const likeReactions: Reaction[] = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
  // 足あと: 他のユーザーが自分のプロフィールに残した足あと
  const footprintReactions: Reaction[] = mockReactions.filter(r => r.type === 'footprint');

  // 現在のタブに応じたリアクションを取得
  const currentReactions = activeTab === 'likes' ? likeReactions : footprintReactions;

  // リアクションに対応するユーザーを取得する関数
  const getReactionUsers = useCallback((reactions: Reaction[]) => {
    return reactions.map((reaction, index) => {
      // リアクションIDとインデックスに基づいてランダムなユーザーを選択
      const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
      const user = { ...reactionUsers[userIndex] };

      // リアクションIDに基づいてランダムな画像URLを生成
      user.imageUrl = getUserImageUrl(reaction.id);

      return user;
    });
  }, [reactionUsers]);

  // リアクションカードがタップされた時の処理
  const handleReactionPress = useCallback((reaction: Reaction, user: any) => {
    const targetUserId = reaction.fromUserId;

    // プロフィール画面に遷移
    router.push(`/profile/${targetUserId}`);
  }, []);

  // プルリフレッシュの処理
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // 実際の実装では、ここでリアクションデータを再取得
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('リアクションの更新に失敗しました:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // タブ変更の処理
  const handleTabChange = useCallback((tab: 'likes' | 'footprints') => {
    setActiveTab(tab);
  }, []);

  // 空の状態表示
  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💫</Text>
      <Text style={styles.emptyTitle}>まだリアクションがありません</Text>
      <Text style={styles.emptyMessage}>
        {activeTab === 'likes'
          ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
          : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。'
        }
      </Text>
    </View>
  ), [activeTab]);

  // Web環境用のグリッドレイアウト
  const renderWebGrid = () => (
    <ScrollView
      style={styles.webScrollView}
      contentContainerStyle={styles.webScrollContent}
      showsVerticalScrollIndicator={false}
    >
      <WebGridLayout
        gridTemplateColumns={cardLayout.gridTemplateColumns}
        gridGap={cardLayout.gridGap}
      >
        {currentReactions.map((reaction, index) => {
          // リアクションIDとインデックスに基づいてランダムなユーザーを選択
          const userIndex = (reaction.id.charCodeAt(0) + index) % reactionUsers.length;
          const user = { ...reactionUsers[userIndex] };

          // リアクションIDに基づいてランダムな画像URLを生成
          user.imageUrl = getUserImageUrl(reaction.id);

          return (
            <ReactionList
              key={`${reaction.id}-${index}`}
              reactions={[reaction]}
              users={[user]}
              onReactionPress={handleReactionPress}
              onRefresh={handleRefresh}
              refreshing={refreshing}
              cardLayout={cardLayout}
              emptyMessage=""
            />
          );
        })}
      </WebGridLayout>
    </ScrollView>
  );

  // モバイル環境用のFlatList
  const renderMobileList = () => (
    <ReactionList
      reactions={currentReactions}
      users={getReactionUsers(currentReactions)}
      onReactionPress={handleReactionPress}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      cardLayout={cardLayout}
      emptyMessage={
        activeTab === 'likes'
          ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
          : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。'
      }
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* リアクションタブ */}
        <ReactionTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* カードリストエリアの幅を計測（エクスプローラー画面と同じ） */}
        <View
          style={styles.cardListArea}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setCardListWidth(width);
            console.log('🎯 リアクション画面 カードリストエリアの幅:', width);
          }}
        >
          {/* プラットフォームに応じてレイアウトを切り替え */}
          {isWeb ? renderWebGrid() : renderMobileList()}
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
    backgroundColor: colors.background,
  },
  // Web環境用のスクロールスタイル
  webScrollView: {
    flex: 1,
  },
  webScrollContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default ReactionsScreen; 

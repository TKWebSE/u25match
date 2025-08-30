import EmptyState from '@components/common/EmptyState';
import { useCardLayout } from '@components/explore/CardLayoutCalculator';
import UserCard from '@components/explore/UserCard';
import WebGridLayout from '@components/explore/WebGridLayout';
import ReactionTabs from '@components/reactions/ReactionTabs';
import { getProfilePath } from '@constants/routes';
import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { colors, spacing } from '@styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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

  // カードリストエリアの幅を計測（シンプル化）
  const [cardListWidth, setCardListWidth] = useState(0);

  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');

  // カードレイアウト情報を取得（カードリストエリアの幅のみ使用）
  const cardLayout = useCardLayout(cardListWidth);

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
    console.log('🎯 リアクション画面 Web版 タブ切り替え:', tab);
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
});

export default ReactionsScreen;

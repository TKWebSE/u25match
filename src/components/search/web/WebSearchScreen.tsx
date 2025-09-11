// src/components/search/web/WebSearchScreen.tsx
// Web版検索画面のメインコンポーネント

import { reactionUsers } from '@mock/exploreUserMock';
import { getUserImageUrl, mockReactions } from '@mock/reactionsMock';
import { ReactionTabType } from '@my-types/search';
import { colors, spacing } from '@styles/globalStyles';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ReactionTabs from './ReactionTabs';
import WebUserGrid from './WebUserGrid';

const WebSearchScreen = () => {
  // アクティブなタブの状態管理
  const [activeTab, setActiveTab] = useState<ReactionTabType>('likes');

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

  const filteredUsers = useMemo(() => getReactionUsers(), [activeTab]);

  // タブ切り替えハンドラー
  const handleTabPress = (tab: ReactionTabType) => {
    setActiveTab(tab);
    console.log('🎯 検索画面 Web版 タブ切り替え:', tab);
  };

  return (
    <View style={styles.container}>
      {/* リアクションタブ */}
      <ReactionTabs
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* ユーザーグリッド */}
      <WebUserGrid
        users={filteredUsers}
        emptyMessage={
          activeTab === 'likes'
            ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
            : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
});

export default WebSearchScreen;

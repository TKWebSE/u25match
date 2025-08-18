import CustomHeader from '@components/common/CustomHeader';
import { ReactionList, ReactionTabs } from '@components/reactions';
import { users } from '@mock/exploreUserMock';
import { mockReactions } from '@mock/reactionsMock';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
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

// Web版リアクション画面コンポーネント
export default function WebReactionsScreen() {
  const [activeTab, setActiveTab] = useState<'likes' | 'footprints'>('likes');
  const [refreshing, setRefreshing] = useState(false);

  // いいねと足あとを分離
  const likeReactions: Reaction[] = mockReactions.filter(r => r.type === 'like' || r.type === 'super_like');
  // 足あと: 他のユーザーが自分のプロフィールに残した足あと
  const footprintReactions: Reaction[] = mockReactions.filter(r => r.type === 'footprint');

  // 現在のタブに応じたリアクションを取得
  const currentReactions = activeTab === 'likes' ? likeReactions : footprintReactions;

  // リアクションカードがタップされた時の処理
  const handleReactionPress = useCallback((reaction: Reaction, user: import('@mock/exploreUserMock').User) => {
    // どちらのタブでも、リアクションを送ったユーザーのプロフィールに遷移
    // いいね: 他のユーザーから自分へのリアクション
    // 足あと: 他のユーザーが自分のプロフィールに残した足あと
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="リアクション" />

      {/* リアクションタブ */}
      <ReactionTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* リアクションリスト */}
      <ReactionList
        reactions={currentReactions}
        users={users}
        onReactionPress={handleReactionPress}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        emptyMessage={
          activeTab === 'likes'
            ? 'まだ誰かからのいいねがありません。プロフィールを充実させてみましょう！'
            : 'まだ足あとがありません。プロフィールを見に来てくれる人がいないかもしれません。'
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});

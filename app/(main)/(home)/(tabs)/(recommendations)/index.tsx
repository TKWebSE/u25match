import ActionButtons from '@components/recommendations/ActionButtons';
import SwipeableCard, { SwipeableCardRef } from '@components/recommendations/SwipeableCard';
import { colors, spacing, typography } from '@styles/globalStyles';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// モックデータ
const mockUsers = [
  {
    id: '1',
    name: '田中花子',
    age: 24,
    location: '東京',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    bio: 'カフェ巡りと写真撮影が好きです。新しい出会いを楽しみにしています。',
    tags: ['カフェ', '写真', '旅行'],
    isOnline: true,
    lastActiveAt: new Date(),
  },
  {
    id: '2',
    name: '佐藤美咲',
    age: 26,
    location: '大阪',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    bio: '音楽ライブに行くのが大好き！一緒に楽しめる人を探しています。',
    tags: ['音楽', 'ライブ', 'アート'],
    isOnline: false,
    lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2時間前
  },
  {
    id: '3',
    name: '山田愛',
    age: 23,
    location: '福岡',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
    bio: '料理とワインが趣味です。一緒に美味しいものを楽しみましょう。',
    tags: ['料理', 'ワイン', 'グルメ'],
    isOnline: true,
    lastActiveAt: new Date(),
  },
];

export default function RecommendationsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState(mockUsers);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [passedUsers, setPassedUsers] = useState<string[]>([]);
  const cardRef = useRef<SwipeableCardRef>(null);

  // 表示するカードの数（現在のカード + 後ろのカード2枚）
  const visibleCards = 3;
  const startIndex = Math.max(0, currentIndex);
  const endIndex = Math.min(users.length, startIndex + visibleCards);

  // 表示するカードの配列
  const visibleUsers = users.slice(startIndex, endIndex);

  // 現在のカードを取得
  const currentUser = users[currentIndex];

  const handleLike = useCallback((userId: string) => {
    // currentUserが存在し、現在のカードのIDと一致する場合のみ処理
    if (currentUser && userId === currentUser.id) {
      console.log('Like:', userId);
      setLikedUsers(prev => [...prev, userId]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentUser]);

  const handlePass = useCallback((userId: string) => {
    // currentUserが存在し、現在のカードのIDと一致する場合のみ処理
    if (currentUser && userId === currentUser.id) {
      console.log('Pass:', userId);
      setPassedUsers(prev => [...prev, userId]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentUser]);

  // すべてのカードをめくった場合の処理
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>今日のオススメは終了です</Text>
          <Text style={styles.emptySubtitle}>明日また新しいオススメをお届けします</Text>
        </View>
      </View>
    );
  }

  // 表示するカードがない場合の処理
  if (visibleUsers.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>カードがありません</Text>
          <Text style={styles.emptySubtitle}>新しいカードを待っています</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>今日のオススメ</Text>
        <Text style={styles.headerSubtitle}>
          {currentIndex + 1} / {users.length}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {/* 現在のカードのみ操作可能、他のカードは表示のみ */}
        {visibleUsers.map((user, index) => {
          // currentIndexに基づいて現在のカードかどうかを判定
          const isCurrentCard = (startIndex + index) === currentIndex;

          // デバッグログ
          console.log(`Rendering card ${user.name}: index=${index}, startIndex=${startIndex}, cardIndex=${startIndex + index}, currentIndex=${currentIndex}, isCurrentCard=${isCurrentCard}`);

          return (
            <View
              key={user.id}
              style={[
                styles.cardWrapper,
                {
                  zIndex: visibleCards - index, // 後ろのカードほどzIndexが低い
                  position: 'absolute',
                  top: index * 4, // 後ろのカードを少し下に配置
                  left: index * 2, // 後ろのカードを少し右に配置
                }
              ]}
            >
              <SwipeableCard
                user={user}
                onLike={isCurrentCard ? handleLike : () => { }} // 現在のカードのみ操作可能
                onPass={isCurrentCard ? handlePass : () => { }} // 現在のカードのみ操作可能
                isActive={isCurrentCard} // 現在のカードのみ操作可能
                cardIndex={startIndex + index} // カードの実際のインデックス
                currentIndex={currentIndex} // 現在アクティブなカードのインデックス
                onAnimationComplete={isCurrentCard ? (direction) => {
                  // 現在のカードのアニメーション完了時の処理
                  if (currentUser) {
                    if (direction === 'right') {
                      handleLike(user.id);
                    } else {
                      handlePass(user.id);
                    }
                  }
                } : undefined} // 現在のカードのみにコールバックを設定
                ref={isCurrentCard ? cardRef : null} // 現在のカードにのみrefを設定
              />
            </View>
          );
        })}
      </View>

      <View style={styles.actionContainer}>
        <ActionButtons
          onPass={() => handlePass(currentUser.id)}
          onLike={() => handleLike(currentUser.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xl, // 最初の位置に戻す
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl, // カードを下に移動
    position: 'relative', // 子要素の絶対位置指定の基準点
  },
  actionContainer: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import ActionButtons from '@components/recommendations/ActionButtons';
import { EmptyRecommendationsState } from '@components/recommendations/EmptyRecommendationsState';
import SwipeableCard, { SwipeableCardRef } from '@components/recommendations/SwipeableCard';
import { useRecommendations } from '@hooks/useRecommendations';
import { colors, spacing, typography } from '@styles/globalStyles';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 推奨ユーザーを表示するメインスクリーン（モバイル版）
 * 現在のカードの裏に背景のように次のカードを配置
 */
export default function RecommendationsScreen() {
  // 推奨ユーザーの状態と操作関数を取得
  const {
    currentIndex,
    users,
    currentUser,
    handleLike,
    handlePass,
  } = useRecommendations();

  // 次のカードを取得（存在する場合）
  const nextUser = users[currentIndex + 1];

  // カードのrefを取得
  const cardRef = useRef<SwipeableCardRef>(null);

  // すべてのカードをめくった場合の処理
  if (!currentUser) {
    return <EmptyRecommendationsState />;
  }

  /**
   * カードのスワイプ完了時の処理
   * 右スワイプはいいね、左スワイプはパスとして処理
   */
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      handleLike(currentUser.id);
    } else {
      handlePass(currentUser.id);
    }
    // currentIndexが更新され、再レンダリングされる
  };

  /**
   * ボタンタップ時のアニメーション実行
   */
  const handleButtonTap = (direction: 'left' | 'right') => {
    // カードのアニメーションを実行
    if (cardRef.current) {
      cardRef.current.animateCard(direction);
    }
    // ボタンタップ時は直接状態を更新しない（アニメーション完了後に更新される）
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー部分：タイトルと進捗表示 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>今日のオススメ</Text>
        <Text style={styles.headerSubtitle}>
          {currentIndex + 1} / {users.length}
        </Text>
      </View>

      {/* カードの重ね表示：背景に次のカード、前面に現在のカード */}
      <View style={styles.cardContainer}>
        {/* 背景：次のカード（少し下と右に配置） */}
        {nextUser && (
          <View style={styles.backgroundCardWrapper}>
            <SwipeableCard
              user={nextUser}
              onLike={() => { }} // 操作不可
              onPass={() => { }} // 操作不可
              onAnimationComplete={undefined}
              isActive={false} // 非アクティブ
              cardIndex={currentIndex + 1}
              currentIndex={currentIndex}
            />
          </View>
        )}

        {/* 前面：現在のカード */}
        <View style={styles.frontCardWrapper}>
          <SwipeableCard
            ref={cardRef}
            user={currentUser}
            onLike={handleLike}
            onPass={handlePass}
            onAnimationComplete={handleSwipe}
            isActive={true}
            cardIndex={currentIndex}
            currentIndex={currentIndex}
          />
        </View>
      </View>

      {/* アクションボタン：いいね・パスボタン */}
      <View style={styles.actionContainer}>
        <ActionButtons
          onPass={() => handleButtonTap('left')}
          onLike={() => handleButtonTap('right')}
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
    paddingTop: spacing.xl,
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
    marginTop: 32,
    position: 'relative', // 子要素の絶対位置指定の基準点
  },
  backgroundCardWrapper: {
    position: 'absolute',
    zIndex: 1, // 背景（裏面）
    justifyContent: 'center',
    alignItems: 'center',
    // frontCardWrapperと同じスタイルを適用
  },
  frontCardWrapper: {
    position: 'absolute',
    zIndex: 2, // 前面
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
});

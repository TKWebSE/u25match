import ActionButtons from '@components/recommendations/ActionButtons';
import { EmptyRecommendationsState } from '@components/recommendations/EmptyRecommendationsState';
import SwipeableCard from '@components/recommendations/SwipeableCard';
import { useRecommendations } from '@hooks/useRecommendations';
import { colors, spacing, typography } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 推奨ユーザーを表示するメインスクリーン
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

  // デバッグログ：現在の状態を表示
  console.log(`🎯 RecommendationsScreen - currentIndex: ${currentIndex}, totalUsers: ${users.length}, currentUser: ${currentUser?.name || 'none'}, nextUser: ${nextUser?.name || 'none'}`);

  // すべてのカードをめくった場合の処理
  if (!currentUser) {
    console.log('❌ カードが存在しません - EmptyRecommendationsStateを表示');
    return (
      <EmptyRecommendationsState />
    );
  }

  /**
   * カードのスワイプ完了時の処理
   * 右スワイプはいいね、左スワイプはパスとして処理
   */
  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`🔄 スワイプ完了: ${direction === 'right' ? '右（いいね）' : '左（パス）'} - ユーザー: ${currentUser.name}`);

    if (direction === 'right') {
      console.log(`❤️ いいね処理開始: ${currentUser.name}`);
      handleLike(currentUser.id);
    } else {
      console.log(`👋 パス処理開始: ${currentUser.name}`);
      handlePass(currentUser.id);
    }

    console.log(`📱 次のカードに進みます - 現在: ${currentIndex + 1}/${users.length}`);
    // currentIndexが更新され、再レンダリングされる
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
          onPass={() => {
            console.log(`👆 パスボタンタップ: ${currentUser.name}`);
            handlePass(currentUser.id);
          }}
          onLike={() => {
            console.log(`👆 いいねボタンタップ: ${currentUser.name}`);
            handleLike(currentUser.id);
          }}
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

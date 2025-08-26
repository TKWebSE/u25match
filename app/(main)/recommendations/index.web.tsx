import ActionButtons from '@components/recommendations/ActionButtons';
import { EmptyRecommendationsState } from '@components/recommendations/EmptyRecommendationsState';
import SwipeableCard, { SwipeableCardRef } from '@components/recommendations/SwipeableCard';
import { useRecommendations } from '@hooks/useRecommendations';
import { colors, spacing, typography } from '@styles/globalStyles';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

/**
 * 推奨ユーザーを表示するメインスクリーン（Web版）
 * Web環境に最適化されたレイアウトとインタラクション
 */
export default function RecommendationsScreen() {
  const { width: windowWidth } = useWindowDimensions();

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

  // Web版でのコンテンツ幅と余白の計算
  const contentWidth = Math.min(windowWidth * 0.9, 800);
  const contentMargin = (windowWidth - contentWidth) / 2;

  // 出し分け確認用ログ
  useEffect(() => {
    console.log('🌐 RecommendationsScreen Web版が読み込まれました');
    console.log('🌐 プラットフォーム: React Native Web');
    console.log(`🌐 ウィンドウ幅: ${windowWidth}px, コンテンツ幅: ${contentWidth}px`);
  }, [windowWidth, contentWidth]);

  // デバッグログ：現在の状態を表示
  console.log(`🎯 RecommendationsScreen Web版 - currentIndex: ${currentIndex}, totalUsers: ${users.length}, currentUser: ${currentUser?.name || 'none'}, nextUser: ${nextUser?.name || 'none'}`);

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
    console.log(`🔄 スワイプ完了: ${direction === 'right' ? '右（いいね）' : '左（パス）'} - ユーザー: ${currentUser.name} - 呼び出し回数チェック`);

    if (direction === 'right') {
      console.log(`❤️ いいね処理開始: ${currentUser.name}`);
      handleLike(currentUser.id);
    } else {
      console.log(`👋 パス処理開始: ${currentUser.name}`);
      handlePass(currentUser.id);
    }

    console.log(`🌐 次のカードに進みます - 現在: ${currentIndex + 1}/${users.length}`);
    // currentIndexが更新され、再レンダリングされる
  };

  /**
   * ボタンタップ時のアニメーション実行
   */
  const handleButtonTap = (direction: 'left' | 'right') => {
    console.log(`👆 ボタンタップ: ${direction === 'right' ? 'いいね' : 'パス'} - ユーザー: ${currentUser.name}`);

    // カードのアニメーションを実行
    if (cardRef.current) {
      cardRef.current.animateCard(direction);
    }

    // ボタンタップ時は直接状態を更新しない（アニメーション完了後に更新される）
  };

  return (
    <View style={styles.container}>
      {/* Web版用のコンテンツ幅制限と中央配置 */}
      <View style={[styles.contentWrapper, { marginHorizontal: contentMargin }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentWrapper: {
    flex: 1,
    maxWidth: 800, // Web版での最大幅を制限
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

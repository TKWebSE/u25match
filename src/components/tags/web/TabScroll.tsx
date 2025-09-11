import { colors, spacing } from '@styles/globalStyles';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TabButton from './TabButton';

/**
 * タブルートの型定義
 */
interface TabRoute {
  key: string;
  title: string;
}

/**
 * TabScrollコンポーネントのプロパティ型定義
 */
interface TabScrollProps {
  routes: TabRoute[];
  activeIndex: number;
  onTabPress: (index: number) => void;
  screenWidth: number;
}

/**
 * タブスクロールコンポーネント
 * 
 * 水平スクロール可能なタブナビゲーションを提供します。
 * タブをタップすると中央にスクロールし、スクロール位置に応じてアクティブタブが自動更新されます。
 * 
 * @param {TabScrollProps} props - コンポーネントのプロパティ
 * @param {TabRoute[]} props.routes - タブルートの配列
 * @param {number} props.activeIndex - 現在アクティブなタブのインデックス
 * @param {Function} props.onTabPress - タブが押された時のコールバック関数
 * @param {number} props.screenWidth - 画面幅（スクロール位置計算用）
 * @returns {React.ReactElement} タブスクロールコンポーネント
 */
const TabScroll: React.FC<TabScrollProps> = ({
  routes,
  activeIndex,
  onTabPress,
  screenWidth,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const tabWidth = 120; // タブの幅

  /**
   * タブが押された時の処理
   * タブを中央にスクロールしてアクティブ状態を更新
   * 
   * @param {number} tabIndex - 押されたタブのインデックス
   */
  const handleTabPress = (tabIndex: number) => {
    onTabPress(tabIndex);
    // タブを中央にスクロール
    const scrollToX = Math.max(0, (tabIndex * tabWidth) - (screenWidth / 2) + (tabWidth / 2));
    scrollViewRef.current?.scrollTo({ x: scrollToX, animated: true });
  };

  /**
   * スクロールイベントの処理
   * スクロール位置に基づいてアクティブタブを自動更新
   * 
   * @param {any} event - スクロールイベント
   */
  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    setScrollX(scrollX);
    // スクロール位置に基づいてアクティブタブを更新
    const newIndex = Math.round(scrollX / tabWidth);
    if (newIndex >= 0 && newIndex < routes.length && newIndex !== activeIndex) {
      onTabPress(newIndex);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={tabWidth}
      snapToAlignment="center"
      bounces={false}
      scrollEnabled={true}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={styles.tabScrollView}
      contentContainerStyle={styles.tabScrollContent}
    >
      {routes.map((route, tabIndex) => (
        <TabButton
          key={route.key}
          title={route.title}
          isActive={activeIndex === tabIndex}
          onPress={() => handleTabPress(tabIndex)}
        />
      ))}
    </ScrollView>
  );
};

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  // タブスクロールビューのスタイル
  tabScrollView: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  // タブスクロールコンテンツのスタイル
  tabScrollContent: {
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
});

export default TabScroll;

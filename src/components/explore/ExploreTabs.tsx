import { ExploreTabType } from '@hooks/useUserSearch';
import { colors } from '@styles/globalStyles';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

// タブの設定
const TAB_CONFIG = {
  search: { label: '検索' },
  recommended: { label: 'おすすめ' },
  new: { label: '新着' },
  tags: { label: 'タグ' },
} as const;

interface ExploreTabsProps {
  activeTab: ExploreTabType;
  onTabPress: (tab: ExploreTabType) => void;
  // カード表示エリアの幅を取得（ドロワーの有無を考慮）
  cardListWidth?: number;
}

/**
 * YouTube風のシンプルなタブコンポーネント
 * 上タブのみを実装
 */
const ExploreTabs: React.FC<ExploreTabsProps> = ({ activeTab, onTabPress, cardListWidth }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  // タブの幅と位置を計算
  const getTabLayout = () => {
    const containerWidth = cardListWidth || Math.min(screenWidth - 32, 1200);
    const minTabWidth = 80; // 最小タブ幅を設定
    const calculatedTabWidth = containerWidth / 4;
    const tabWidth = Math.max(calculatedTabWidth, minTabWidth);
    const actualContainerWidth = tabWidth * 4;
    const containerMargin = cardListWidth ? (screenWidth - cardListWidth) / 2 : 16;

    return {
      containerWidth: actualContainerWidth,
      tabWidth,
      containerMargin,
    };
  };

  // スワイプジェスチャーハンドラー
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    const { state, translationX, velocityX } = event.nativeEvent;

    console.log('🔄 ExploreTabs ジェスチャー状態:', state, 'translationX:', translationX);

    if (state === State.END) {
      const { tabWidth } = getTabLayout();

      // 超超超高速反応の閾値設定
      const threshold = 3; // 3px以上スワイプ（より敏感に）
      const shouldSwitch = Math.abs(translationX) > threshold || Math.abs(velocityX) > 30;

      console.log('🔄 スワイプ判定:', {
        translationX,
        threshold,
        shouldSwitch,
        activeTab
      });

      if (shouldSwitch) {
        const tabKeys = Object.keys(TAB_CONFIG) as ExploreTabType[];
        const currentIndex = tabKeys.indexOf(activeTab);

        if (translationX > 0 && currentIndex > 0) {
          // 右スワイプ：前のタブへ
          console.log('🔄 右スワイプ: 前のタブへ', tabKeys[currentIndex - 1]);
          onTabPress(tabKeys[currentIndex - 1]);
        } else if (translationX < 0 && currentIndex < tabKeys.length - 1) {
          // 左スワイプ：次のタブへ
          console.log('🔄 左スワイプ: 次のタブへ', tabKeys[currentIndex + 1]);
          onTabPress(tabKeys[currentIndex + 1]);
        }
      }

      // アニメーションをリセット（超超超高速化）
      Animated.timing(translateX, {
        toValue: 0,
        duration: 5,
        useNativeDriver: true,
      }).start();
    }
  };

  // タブ切り替え時のスライドアニメーション
  useEffect(() => {
    const { tabWidth } = getTabLayout();
    const activeIndex = Object.keys(TAB_CONFIG).indexOf(activeTab);
    const targetPosition = activeIndex * tabWidth;

    // 超高速アニメーション（50ms）
    Animated.timing(slideAnim, {
      toValue: targetPosition,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, [activeTab, slideAnim, cardListWidth]);

  const { containerWidth, tabWidth, containerMargin } = getTabLayout();

  // タブプレスハンドラーをメモ化（超高速化）
  const handleTabPress = useCallback((tabKey: string) => {
    console.log('🚀 タブプレス:', tabKey);
    onTabPress(tabKey as ExploreTabType);
  }, [onTabPress]);

  // デバッグ用ログ
  console.log('🔍 ExploreTabs レンダリング:', {
    containerWidth,
    tabWidth,
    containerMargin,
    activeTab,
    tabCount: Object.keys(TAB_CONFIG).length,
    tabs: Object.keys(TAB_CONFIG)
  });

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetX={[-0.5, 0.5]}
      minDist={1}
    >
      <Animated.View style={[styles.container, {
        width: containerWidth,
        marginHorizontal: containerMargin,
        transform: [{ translateX }]
      }]}>
        {/* YouTube風の赤いインジケーター */}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        />

        {/* タブコンテンツ */}
        {Object.entries(TAB_CONFIG).map(([tabKey, config]) => {
          const isActive = activeTab === tabKey;
          return (
            <TouchableOpacity
              key={tabKey}
              style={[styles.tab, { width: tabWidth }]}
              onPress={() => handleTabPress(tabKey)}
              activeOpacity={0.3}
              delayPressIn={0}
              delayPressOut={0}
            >
              <Text style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}>
                {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    position: 'relative',
    paddingVertical: 8,
    marginVertical: 8,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: colors.primary, // 下タブと同じ色
    borderRadius: 2,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#606060',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default ExploreTabs;

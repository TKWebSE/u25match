import { ExploreTabType } from '@hooks/useUserSearch';
import { useSidebar } from '@layouts/WebLayout';
import { colors } from '@styles/globalStyles';
import { isWeb } from '@utils/platform';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

// タブの設定
const TAB_CONFIG = {
  search: { label: '検索' },
  recommended: { label: 'おすすめ' },
  new: { label: '新着' },
  nearby: { label: '近く' },
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

  // Web版の場合はサイドバーコンテキストを使用
  const sidebarContext = isWeb ? useSidebar() : null;

  // タブの幅と位置を計算
  const getTabLayout = () => {
    let containerWidth: number;
    let containerMargin: number;

    if (isWeb && sidebarContext) {
      // Web版：サイドバーの状態を考慮
      containerWidth = sidebarContext.mainContentWidth;
      containerMargin = 0; // WebLayoutで既にマージンが設定されている
    } else if (cardListWidth) {
      // モバイル版：カードリストの幅を使用
      containerWidth = cardListWidth;
      containerMargin = (screenWidth - cardListWidth) / 2;
    } else {
      // フォールバック：画面幅からマージンを引いた幅
      containerWidth = Math.min(screenWidth - 32, 1200);
      containerMargin = 16;
    }

    // タブの幅を計算（4つのタブを均等に配置）
    const tabWidth = containerWidth / 4;

    return {
      containerWidth,
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
      const threshold = 5; // 5px以上スワイプ
      const shouldSwitch = Math.abs(translationX) > threshold || Math.abs(velocityX) > 50;

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
        duration: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  // タブ切り替え時のスライドアニメーション
  useEffect(() => {
    const { tabWidth } = getTabLayout();
    const activeIndex = Object.keys(TAB_CONFIG).indexOf(activeTab);
    const targetPosition = activeIndex * tabWidth;

    // アニメーションなしで即座に移動
    slideAnim.setValue(targetPosition);
  }, [activeTab, slideAnim, cardListWidth, sidebarContext?.mainContentWidth]);

  const { containerWidth, tabWidth, containerMargin } = getTabLayout();

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      activeOffsetX={[-1, 1]}
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
              onPress={() => onTabPress(tabKey as ExploreTabType)}
              activeOpacity={0.7}
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
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
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

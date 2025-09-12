import { useSidebar } from '@layouts/WebLayout';
import { colors } from '@styles/globalStyles';
import { isWeb } from '@utils/platform';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: screenWidth } = Dimensions.get('window');

interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';
  onTabPress: (tab: 'likes' | 'footprints') => void;
  // カード表示エリアの幅を取得（ドロワーの有無を考慮）
  cardListWidth?: number;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabPress, cardListWidth }) => {
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

    // タブの幅を計算（2つのタブを均等に配置）
    const tabWidth = containerWidth / 2;

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

    console.log('🔄 ReactionTabs ジェスチャー状態:', state, 'translationX:', translationX);

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
        if (translationX > 0 && activeTab === 'footprints') {
          // 右スワイプ：足あと → いいね
          console.log('🔄 右スワイプ: 足あと → いいね');
          onTabPress('likes');
        } else if (translationX < 0 && activeTab === 'likes') {
          // 左スワイプ：いいね → 足あと
          console.log('🔄 左スワイプ: いいね → 足あと');
          onTabPress('footprints');
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
    const activeIndex = activeTab === 'likes' ? 0 : 1;
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
        <TouchableOpacity
          style={[styles.tab, { width: tabWidth }]}
          onPress={() => onTabPress('likes')}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'likes' && styles.activeTabText,
          ]}>
            ❤️ いいね
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, { width: tabWidth }]}
          onPress={() => onTabPress('footprints')}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'footprints' && styles.activeTabText,
          ]}>
            👣 足あと
          </Text>
        </TouchableOpacity>
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

export default ReactionTabs;

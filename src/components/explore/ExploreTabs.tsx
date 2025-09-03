import { ExploreTabType } from '@hooks/useUserSearch';
import { colors } from '@styles/globalStyles';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  // タブの幅と位置を計算
  const getTabLayout = () => {
    const containerWidth = cardListWidth || Math.min(screenWidth - 32, 1200);
    const tabWidth = containerWidth / 4;
    const containerMargin = cardListWidth ? (screenWidth - cardListWidth) / 2 : 16;

    return {
      containerWidth,
      tabWidth,
      containerMargin,
    };
  };

  // タブ切り替え時のスライドアニメーション
  useEffect(() => {
    const { tabWidth } = getTabLayout();
    const activeIndex = Object.keys(TAB_CONFIG).indexOf(activeTab);
    const targetPosition = activeIndex * tabWidth;

    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [activeTab, slideAnim, cardListWidth]);

  const { containerWidth, tabWidth, containerMargin } = getTabLayout();

  return (
    <View style={[styles.container, {
      width: containerWidth,
      marginHorizontal: containerMargin
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
    </View>
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

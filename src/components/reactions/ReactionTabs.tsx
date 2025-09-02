import { colors } from '@styles/globalStyles';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';
  onTabPress: (tab: 'likes' | 'footprints') => void;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabPress }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  // タブの幅と位置を計算
  const getTabLayout = () => {
    const containerWidth = Math.min(screenWidth - 32, 1200);
    const tabWidth = containerWidth / 2; // 2つのタブなので半分ずつ
    const containerMargin = 16;

    return {
      containerWidth,
      tabWidth,
      containerMargin,
    };
  };

  // タブ切り替え時のスライドアニメーション
  useEffect(() => {
    const { tabWidth } = getTabLayout();
    const activeIndex = activeTab === 'likes' ? 0 : 1;
    const targetPosition = activeIndex * tabWidth;

    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  }, [activeTab, slideAnim]);

  const { containerWidth, tabWidth, containerMargin } = getTabLayout();

  return (
    <View style={[styles.container, {
      width: containerWidth,
      marginHorizontal: containerMargin
    }]}>
      {/* YouTube風のインジケーター */}
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
    backgroundColor: '#6C63FF', // 下タブと同じ色
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

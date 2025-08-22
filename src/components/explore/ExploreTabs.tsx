import { ExploreTabType } from '@hooks/useUserSearch';
import { colors } from '@styles/globalStyles';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// タブの設定
const TAB_CONFIG = {
  search: { label: '検索', icon: '🔍', color: '#667eea' },
  recommended: { label: 'おすすめ', icon: '⭐', color: '#f093fb' },
  new: { label: '新着', icon: '🆕', color: '#4facfe' },
  nearby: { label: '近く', icon: '📍', color: '#43e97b' },
} as const;

interface ExploreTabsProps {
  activeTab: ExploreTabType;
  onTabPress: (tab: ExploreTabType) => void;
  // カード表示エリアの幅を取得（ドロワーの有無を考慮）
  cardListWidth?: number;
}

/**
 * エクスプローラー画面用のタブコンポーネント
 * ドロワーの有無を考慮したレイアウトと、カード表示に合わせたタブ位置を実装
 */
const ExploreTabs: React.FC<ExploreTabsProps> = ({ activeTab, onTabPress, cardListWidth }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // ドロワーの有無を考慮したタブの幅と位置を計算
  const getTabLayout = () => {
    // カード表示エリアの幅が指定されている場合はそれを使用
    const availableWidth = cardListWidth || screenWidth;

    // ドロワーがある場合の想定（Web版）
    const isWebWithDrawer = cardListWidth && cardListWidth < screenWidth * 0.9;

    // タブコンテナの幅を計算
    // ドロワーの開閉状態に関係なく、カードリスト領域の幅を使用
    const containerWidth = cardListWidth || Math.min(screenWidth - 32, 1200);

    // 各タブの幅を計算（4等分、パディングを考慮）
    const containerPadding = 8; // コンテナの左右パディング
    const tabWidth = (containerWidth - containerPadding) / 4;

    // タブコンテナの左右マージンを計算
    // カードリスト領域と同じ位置に配置
    const containerMargin = cardListWidth ? (screenWidth - cardListWidth) / 2 : 16;

    return {
      containerWidth,
      tabWidth,
      containerMargin,
      isWebWithDrawer
    };
  };

  // タブ切り替え時のスライドアニメーション
  useEffect(() => {
    const { tabWidth, containerMargin } = getTabLayout();
    const activeIndex = Object.keys(TAB_CONFIG).indexOf(activeTab);
    const targetPosition = activeIndex * tabWidth;

    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [activeTab, slideAnim, cardListWidth]);

  const handleTabPress = (tab: ExploreTabType) => {
    // 控えめなスケールアニメーション
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 8,
      }),
    ]).start();

    onTabPress(tab);
  };

  const { containerWidth, tabWidth, containerMargin, isWebWithDrawer } = getTabLayout();

  return (
    <View style={[styles.container, {
      width: containerWidth,
      marginHorizontal: containerMargin
    }]}>
      {/* スライドインジケーター */}
      <Animated.View
        style={[
          styles.slidingIndicator,
          {
            width: tabWidth,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      />

      {/* タブコンテンツ */}
      {Object.entries(TAB_CONFIG).map(([tabKey, config], index) => {
        const isActive = activeTab === tabKey;
        return (
          <TouchableOpacity
            key={tabKey}
            style={[styles.tab, {
              width: tabWidth,
              // タブ間のギャップをなくし、横幅いっぱいに配置
              marginHorizontal: 0,
            }]}
            onPress={() => handleTabPress(tabKey as ExploreTabType)}
            activeOpacity={0.7}
          >
            <Animated.View
              style={[
                styles.tabContent,
                isActive && styles.activeTabContent,
                {
                  transform: [{ scale: isActive ? scaleAnim : 1 }],
                },
              ]}
            >
              <View style={[styles.tabIconBackground, { backgroundColor: `${config.color}20` }]}>
                <View style={styles.tabIconContainer}>
                  <Text style={styles.tabIcon}>{config.icon}</Text>
                </View>
              </View>
              <Text style={[
                styles.tabText,
                isActive && styles.activeTabText,
              ]}>
                {config.label}
              </Text>
              {isActive && (
                <View style={[styles.activeIndicator, { backgroundColor: `${config.color}20` }]}>
                  <View style={styles.activeIndicatorIconContainer}>
                    <Text style={styles.activeIndicatorText}>{config.icon}</Text>
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 4,
    marginVertical: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignSelf: 'center', // 中央揃え
  },
  slidingIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    zIndex: 1,
    // タブ間のギャップをなくす
    marginHorizontal: 0,
  },
  tabContent: {
    paddingVertical: 12,
    paddingHorizontal: 6, // パディングを調整して横幅いっぱいに
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 52,
    flexDirection: 'row',
    // タブの内容を中央に配置
    width: '100%',
  },
  activeTabContent: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6c757d',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    right: 6,
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeIndicatorText: {
    fontSize: 10,
  },
  tabIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  tabIconBackground: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 4,
  },
  tabIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicatorIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExploreTabs;

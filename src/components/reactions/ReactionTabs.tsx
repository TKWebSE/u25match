import { Colors } from '@constants/Colors';
import { useSidebar } from '@layouts/WebLayout';
import { isWeb } from '@utils/platform';
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';
  onTabChange: (tab: 'likes' | 'footprints') => void;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabChange }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Web環境でのドロワー状態を取得
  const { isSidebarOpen, sidebarWidth, mainContentWidth } = useSidebar();

  // ドロワーの状態に応じたタブの幅を計算（useMemoで最適化）
  const tabWidth = useMemo(() => {
    if (isWeb) {
      if (isSidebarOpen) {
        // ドロワーが開いている場合：メインコンテンツエリアの幅を考慮
        const availableWidth = mainContentWidth - 32 - 8; // 左右マージン - パディング
        return availableWidth / 2;
      } else {
        // ドロワーが閉じている場合：画面幅全体を使用
        const availableWidth = screenWidth - 32 - 8; // 左右マージン - パディング
        return availableWidth / 2;
      }
    } else {
      // モバイル環境：画面幅を使用
      const availableWidth = screenWidth - 32 - 8; // 左右マージン - パディング
      return availableWidth / 2;
    }
  }, [isWeb, isSidebarOpen, mainContentWidth]);

  // スライディングインジケーターの位置を計算（useMemoで最適化）
  const targetPosition = useMemo(() => {
    return activeTab === 'likes' ? 0 : tabWidth;
  }, [activeTab, tabWidth]);

  useEffect(() => {
    // ドロワーの状態変更時やタブ変更時にアニメーションを実行
    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [targetPosition, slideAnim, isSidebarOpen, sidebarWidth, mainContentWidth]);

  const handleTabPress = (tab: 'likes' | 'footprints') => {
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

    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      {/* スライドインジケーター */}
      <Animated.View
        style={[
          styles.slidingIndicator,
          {
            transform: [{ translateX: slideAnim }],
            width: tabWidth,
          },
        ]}
      />

      {/* いいねタブ */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('likes')}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.tabContent,
            activeTab === 'likes' && styles.activeTabContent,
            {
              transform: [{ scale: activeTab === 'likes' ? scaleAnim : 1 }],
            },
          ]}
        >
          <View style={styles.likeIconBackground}>
            <View style={styles.tabIconContainer}>
              <Text style={styles.tabIcon}>❤️</Text>
            </View>
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'likes' && styles.activeTabText,
          ]}>
            いいね
          </Text>
          {activeTab === 'likes' && (
            <View style={[styles.activeIndicator, { backgroundColor: '#FFE5E5' }]}>
              <View style={styles.activeIndicatorIconContainer}>
                <Text style={styles.activeIndicatorText}>❤️</Text>
              </View>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* 足あとタブ */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => handleTabPress('footprints')}
        activeOpacity={0.7}
      >
        <Animated.View
          style={[
            styles.tabContent,
            activeTab === 'footprints' && styles.activeTabContent,
            {
              transform: [{ scale: activeTab === 'footprints' ? scaleAnim : 1 }],
            },
          ]}
        >
          <View style={styles.footprintIconBackground}>
            <View style={styles.tabIconContainer}>
              <Text style={styles.tabIcon}>👣</Text>
            </View>
          </View>
          <Text style={[
            styles.tabText,
            activeTab === 'footprints' && styles.activeTabText,
          ]}>
            足あと
          </Text>
          {activeTab === 'footprints' && (
            <View style={[styles.activeIndicator, { backgroundColor: '#E5F4FF' }]}>
              <View style={styles.activeIndicatorIconContainer}>
                <Text style={styles.activeIndicatorText}>👣</Text>
              </View>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 16,
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
  },
  slidingIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    // 幅は動的に計算される（useMemoで計算）
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
    flex: 1,
    zIndex: 1,
  },
  tabContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 52,
    flexDirection: 'row',
  },
  activeTabContent: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6c757d',
    letterSpacing: 0.3,
  },
  activeTabText: {
    color: Colors.light.tint,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 6,
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
    fontSize: 12,
  },
  // タブアイコンのスタイル
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  // いいねタブのアイコン背景
  likeIconBackground: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  // 足あとタブのアイコン背景
  footprintIconBackground: {
    backgroundColor: '#E5F4FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
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

export default ReactionTabs;

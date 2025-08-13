import { Colors } from '@constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ReactionTabsProps {
  activeTab: 'likes' | 'footprints';
  onTabChange: (tab: 'likes' | 'footprints') => void;
}

const ReactionTabs: React.FC<ReactionTabsProps> = ({ activeTab, onTabChange }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const targetPosition = activeTab === 'likes' ? 0 : screenWidth / 2 - 16;

    Animated.spring(slideAnim, {
      toValue: targetPosition,
      useNativeDriver: false,
      tension: 80,
      friction: 10,
    }).start();
  }, [activeTab, slideAnim]);

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
    width: (screenWidth - 32) / 2 - 4,
    height: 52, // 48から52に変更してさらに下のスペースを広く
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
    minHeight: 52, // 48から52に変更してスライディングインジケーターと合わせる
    flexDirection: 'row', // アイコンとテキストを横並びに
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
    backgroundColor: 'transparent', // 動的に設定するため透明に
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

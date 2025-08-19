import { WebSidebar } from '@components/navigation/WebSidebar';
import { Colors } from '@constants/Colors';
import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native';

// ドロワーの状態を共有するContext
interface SidebarContextType {
  isSidebarOpen: boolean;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: true,
  sidebarWidth: 280,
});

// カスタムフックでドロワーの状態を取得
export const useSidebar = () => useContext(SidebarContext);

interface WebLayoutProps {
  children: React.ReactNode;
}

/**
 * ブラウザ用レイアウト
 * - 左縦サイドナビゲーション（ドロワー式）
 * - メインコンテンツエリア（ドロワーの開閉状態に応じて幅を調整）
 * - レスポンシブ対応
 */
export const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // アニメーション用の値
  const sidebarAnimation = useRef(new Animated.Value(1)).current; // 1 = 開いている、0 = 閉じている

  // レスポンシブなサイドバー幅
  const sidebarWidth = width < 768 ? 240 : 280;
  const minMainContentWidth = 320; // メインコンテンツの最小幅

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? 0 : 1;

    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300, // 300msでアニメーション
      useNativeDriver: false, // transformを使うのでfalse
    }).start();

    setIsSidebarOpen(!isSidebarOpen);
  };

  // サイドバーの幅をアニメーション値で計算
  const animatedSidebarWidth = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sidebarWidth],
  });

  // サイドバーの位置をアニメーション値で計算
  const animatedSidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  // メインコンテンツの幅を動的に計算
  const mainContentWidth = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, Math.max(width - sidebarWidth, minMainContentWidth)],
  });

  // メインコンテンツの左マージンを動的に計算
  const mainContentMarginLeft = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sidebarWidth],
  });

  // Contextの値を更新
  const sidebarContextValue: SidebarContextType = {
    isSidebarOpen,
    sidebarWidth,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* ハンバーガーメニューボタン */}
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.card }]}
          onPress={toggleSidebar}
        >
          <Text style={[styles.menuButtonText, { color: colors.text }]}>
            {isSidebarOpen ? '☰' : '☰'}
          </Text>
        </TouchableOpacity>

        {/* 左縦サイドナビゲーション（アニメーション付き） */}
        <Animated.View style={[styles.sidebar, {
          width: animatedSidebarWidth,
          backgroundColor: colors.card,
          borderRightColor: colors.border,
          transform: [{ translateX: animatedSidebarTranslateX }],
        }]}>
          <WebSidebar />
        </Animated.View>

        {/* メインコンテンツエリア - 幅を動的に調整 */}
        <Animated.View style={[styles.mainContent, {
          backgroundColor: colors.background,
          width: mainContentWidth,
          marginLeft: mainContentMarginLeft,
        }]}>
          <View style={styles.contentWrapper}>
            {children}
          </View>
        </Animated.View>
      </View>
    </SidebarContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    position: 'relative',
  },
  sidebar: {
    borderRightWidth: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
  },
  mainContent: {
    flex: 1,
    minWidth: 320, // 最小幅を保証
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 32, // 左右余白あり
    paddingTop: 80, // メニューボタンとの重複を避ける
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 24,
  },
});

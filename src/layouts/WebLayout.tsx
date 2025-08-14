import { WebSidebar } from '@components/navigation/WebSidebar';
import { Colors } from '@constants/Colors';
import React, { useRef, useState } from 'react'; // useRefとuseEffectを追加
import { Animated, StyleSheet, Text, TouchableOpacity, useColorScheme, useWindowDimensions, View } from 'react-native'; // Animatedを追加

interface WebLayoutProps {
  children: React.ReactNode;
}

/**
 * ブラウザ用レイアウト
 * - 左縦サイドナビゲーション（ドロワー式）
 * - メインコンテンツエリア
 * - 左右余白あり
 */
export const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // アニメーション用の値
  const sidebarAnimation = useRef(new Animated.Value(1)).current; // 1 = 開いている、0 = 閉じている
  const sidebarWidth = width < 768 ? 240 : 280;

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

  return (
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

      {/* メインコンテンツエリア - 左右余白あり */}
      <View style={[styles.mainContent, { backgroundColor: colors.background }]}>
        <View style={styles.contentWrapper}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff', // 背景色を白に設定
  },
  sidebar: {
    borderRightWidth: 1,
    // 固定幅でスクロールしない
  },
  mainContent: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 32, // 左右余白あり
    // paddingVertical: 24, // 上下余白を削除
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
  },
  menuButtonText: {
    fontSize: 24,
  },
});

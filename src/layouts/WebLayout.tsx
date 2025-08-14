import { WebSidebar } from '@components/navigation/WebSidebar';
import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, useColorScheme, useWindowDimensions, View } from 'react-native';

interface WebLayoutProps {
  children: React.ReactNode;
}

/**
 * ブラウザ用レイアウト
 * - 左縦サイドナビゲーション
 * - メインコンテンツエリア
 * - 左右余白あり
 */
export const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];

  // サイドバーの幅を画面サイズに応じて調整
  const sidebarWidth = width < 768 ? 240 : 280;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 左縦サイドナビゲーション */}
      <View style={[styles.sidebar, {
        width: sidebarWidth,
        backgroundColor: colors.card,
        borderRightColor: colors.border
      }]}>
        <WebSidebar />
      </View>

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
});

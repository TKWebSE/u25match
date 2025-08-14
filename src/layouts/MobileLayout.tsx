import { Colors } from '@constants/Colors';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

interface MobileLayoutProps {
  children: React.ReactNode;
}

/**
 * スマホ用レイアウト
 * - 下タブナビゲーション
 * - フルスクリーンコンテンツ
 * - 左右余白なし
 */
export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.mainContent}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    // 左右余白なし - フルスクリーン
  },
});

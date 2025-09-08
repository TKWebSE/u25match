// app/(main)/tags/index.tsx
// フォールバックファイル（Expo Routerのプラットフォーム自動解決のため必要）

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TagsScreen() {
  // このファイルは通常実行されません（プラットフォーム別ファイルが存在するため）
  // ただし、Expo Routerの要件を満たすために必要
  return (
    <View style={styles.container}>
      <Text style={styles.text}>タグ画面を読み込み中...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
});

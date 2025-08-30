// app/(main)/(home)/(tabs)/chat/index.tsx

/**
 * フォールバックファイル（Expo Routerのプラットフォーム自動解決のため必要）
 * 
 * 【重要】このファイルの役割について：
 * 
 * 1. プラットフォーム自動解決の仕組み
 *    - index.web.tsx が存在する場合 → Web版では index.web.tsx が実行される
 *    - index.native.tsx が存在する場合 → モバイル版では index.native.tsx が実行される
 *    - この index.tsx は、プラットフォーム別ファイルが存在しない場合の「フォールバック」として機能
 * 
 * 2. なぜこのファイルが必要なのか
 *    - Expo Routerは、プラットフォーム別ファイル（.web.tsx, .native.tsx）が存在する場合、
 *      必ずベースファイル（index.tsx）も存在することを要求する
 *    - これは、プラットフォーム別ファイルが読み込めない環境での安全性を確保するため
 * 
 * 3. このファイルに書いたロジックは無視される
 *    - プラットフォーム別ファイルが存在する場合、このファイルの内容は実行されない
 *    - そのため、ビジネスロジックやUIは index.web.tsx と index.native.tsx に書く必要がある
 *    - このファイルは「存在するだけ」で十分
 * 
 * 4. 実際の実装
 *    - ビジネスロジック: index.web.tsx と index.native.tsx の両方に記述
 *    - UI表示: プラットフォーム別に最適化された内容を各ファイルに記述
 *    - 状態管理: 各ファイル内で独立して管理
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Placeholder() {
  console.log('💬 フォールバックファイル index.tsx が実行されています！');
  console.log('💬 これは予期しない動作です。プラットフォーム別ファイルが正しく認識されていません。');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        💬 フォールバックファイルが実行されています！
      </Text>
      <Text style={styles.subText}>
        プラットフォーム別ファイルが正しく認識されていません
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
}); 

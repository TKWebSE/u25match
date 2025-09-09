import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * プレミアム会員登録画面のヘッダーコンポーネント
 * 
 * 戻るボタンとタイトルを表示し、
 * グラデーション背景の戻るボタンを含みます。
 */
export const Header: React.FC = () => {
  // 戻る処理
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      {/* 戻るボタン */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <LinearGradient
          colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']} // 半透明の白グラデーション
          style={styles.backButtonGradient}
        >
          <Text style={styles.backButtonIcon}>‹</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* タイトル */}
      <Text style={styles.headerTitle}>プレミアム会員登録</Text>

      {/* 右側のスペーサー（レイアウト調整用） */}
      <View style={styles.headerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  // ヘッダーのメインコンテナ
  header: {
    flexDirection: 'row',           // 横並びレイアウト
    alignItems: 'center',           // 中央揃え（縦）
    justifyContent: 'space-between', // 要素間のスペースを均等に配置
    paddingHorizontal: 20,          // 左右のパディング
    paddingVertical: 16,            // 上下のパディング
    marginBottom: 8,                // 下のマージン
  },
  // 戻るボタンのコンテナ
  backButton: {
    width: 44,                      // ボタンの幅
    height: 44,                     // ボタンの高さ
    borderRadius: 22,               // 円形にするための角丸
    overflow: 'hidden',             // はみ出しを隠す
  },
  // 戻るボタンのグラデーション
  backButtonGradient: {
    flex: 1,                        // コンテナ全体を占有
    alignItems: 'center',           // 中央揃え（横）
    justifyContent: 'center',       // 中央揃え（縦）
  },
  // 戻るボタンのアイコン
  backButtonIcon: {
    fontSize: 24,                   // フォントサイズ
    color: '#ffffff',               // 白色
    fontWeight: '300',              // フォントウェイト（ライト）
    textShadowColor: 'rgba(0,0,0,0.3)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,            // シャドウのぼかし半径
  },
  // ヘッダーのタイトル
  headerTitle: {
    fontSize: 18,                   // フォントサイズ
    fontWeight: '700',              // フォントウェイト（ボールド）
    color: '#ffffff',               // 白色
    textAlign: 'center',            // 中央揃え
    textShadowColor: 'rgba(0,0,0,0.3)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,            // シャドウのぼかし半径
  },
  // 右側のスペーサー（レイアウト調整用）
  headerSpacer: {
    width: 44,                      // 戻るボタンと同じ幅
  },
});

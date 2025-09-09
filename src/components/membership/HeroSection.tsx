import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * プレミアム会員登録画面のヒーローセクションコンポーネント
 * 
 * 画面の上部に表示されるメインセクションで、
 * ダイヤモンドアイコン、キャッチコピー、説明文を含みます。
 */
export const HeroSection: React.FC = () => {
  return (
    <View style={styles.heroSection}>
      {/* ダイヤモンドアイコンのコンテナ */}
      <View style={styles.heroIconContainer}>
        <LinearGradient
          colors={['#FFD700', '#FFA500', '#FF6347']} // ゴールドからオレンジへのグラデーション
          style={styles.heroIconGradient}
          start={{ x: 0, y: 0 }} // グラデーション開始点（左上）
          end={{ x: 1, y: 1 }}   // グラデーション終了点（右下）
        >
          <Text style={styles.heroIcon}>💎</Text>
        </LinearGradient>
      </View>

      {/* メインキャッチコピー（2行） */}
      <Text style={styles.heroTitle}>プレミアム会員で</Text>
      <Text style={styles.heroTitle}>人生を変える体験を</Text>

      {/* サブタイトル（説明文） */}
      <Text style={styles.heroSubtitle}>
        いいね付与、ブースト付与、
        {'\n'}マッチング時のメッセージ機能解放で
        {'\n'}あなたの理想のパートナーを見つけましょう
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // ヒーローセクションのメインコンテナ
  heroSection: {
    alignItems: 'center',        // 中央揃え
    paddingVertical: 40,         // 上下のパディング
    paddingHorizontal: 20,       // 左右のパディング
  },
  // アイコンコンテナのスタイル
  heroIconContainer: {
    marginBottom: 24,            // 下のマージン
  },
  // グラデーションアイコンのスタイル
  heroIconGradient: {
    width: 80,                   // アイコンサイズ（幅）
    height: 80,                  // アイコンサイズ（高さ）
    borderRadius: 40,            // 円形にするための角丸
    alignItems: 'center',        // 中央揃え（横）
    justifyContent: 'center',    // 中央揃え（縦）
    shadowColor: '#000',         // シャドウの色
    shadowOffset: { width: 0, height: 8 }, // シャドウのオフセット
    shadowOpacity: 0.3,          // シャドウの透明度
    shadowRadius: 16,            // シャドウのぼかし半径
    elevation: 12,               // Android用の影の高さ
  },
  // アイコン（絵文字）のスタイル
  heroIcon: {
    fontSize: 40,                // アイコンサイズ
  },
  // メインタイトルのスタイル
  heroTitle: {
    fontSize: 32,                // フォントサイズ
    fontWeight: '800',           // フォントウェイト（エクストラボールド）
    color: '#ffffff',            // 白色
    textAlign: 'center',         // 中央揃え
    marginBottom: 8,             // 下のマージン
    textShadowColor: 'rgba(0,0,0,0.3)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 2 }, // シャドウのオフセット
    textShadowRadius: 4,         // シャドウのぼかし半径
  },
  // サブタイトルのスタイル
  heroSubtitle: {
    fontSize: 16,                // フォントサイズ
    color: 'rgba(255,255,255,0.9)', // 半透明の白色
    textAlign: 'center',         // 中央揃え
    marginTop: 16,               // 上のマージン
    lineHeight: 24,              // 行間
    textShadowColor: 'rgba(0,0,0,0.2)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,         // シャドウのぼかし半径
  },
});

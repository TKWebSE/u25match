import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

/**
 * プレミアム会員の特典情報を表すインターフェース
 */
interface Benefit {
  icon: string;    // 特典のアイコン（絵文字など）
  title: string;   // 特典のタイトル
  desc: string;    // 特典の説明文
}

/**
 * BenefitCardコンポーネントのプロパティ
 */
interface BenefitCardProps {
  benefit: Benefit; // 表示する特典情報
}

/**
 * プレミアム会員の特典を表示するカードコンポーネント（Mobile版）
 * 
 * 2列グリッドレイアウトで特典を表示し、
 * アイコン、タイトル、説明文を含むカード形式でレンダリングします。
 */
export const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => {
  return (
    <View style={styles.benefitCard}>
      {/* 特典のアイコン表示 */}
      <Text style={styles.benefitIcon}>{benefit.icon}</Text>
      {/* 特典のタイトル表示 */}
      <Text style={styles.benefitTitle}>{benefit.title}</Text>
      {/* 特典の説明文表示 */}
      <Text style={styles.benefitDesc}>{benefit.desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // 特典カードのメインコンテナ
  benefitCard: {
    width: (screenWidth - 60) / 2, // 2列グリッド用の幅計算（画面幅 - パディング）
    backgroundColor: 'rgba(255,255,255,0.1)', // 半透明の白背景
    borderRadius: 16, // 角丸
    padding: 16, // 内側の余白
    marginBottom: 12, // 下のマージン
    alignItems: 'center', // 中央揃え
    borderWidth: 1, // 境界線の太さ
    borderColor: 'rgba(255,255,255,0.2)', // 半透明の白境界線
  },
  // 特典アイコンのスタイル
  benefitIcon: {
    fontSize: 24, // アイコンサイズ
    marginBottom: 8, // 下のマージン
  },
  // 特典タイトルのスタイル
  benefitTitle: {
    fontSize: 14, // フォントサイズ
    fontWeight: '600', // フォントウェイト（セミボールド）
    color: '#ffffff', // 白色
    textAlign: 'center', // 中央揃え
    marginBottom: 4, // 下のマージン
    textShadowColor: 'rgba(0,0,0,0.3)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2, // シャドウのぼかし半径
  },
  // 特典説明文のスタイル
  benefitDesc: {
    fontSize: 12, // フォントサイズ
    color: 'rgba(255,255,255,0.8)', // 半透明の白色
    textAlign: 'center', // 中央揃え
    lineHeight: 16, // 行間
  },
});

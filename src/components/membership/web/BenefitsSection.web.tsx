import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BenefitCard } from './BenefitCard.web';

/**
 * プレミアム会員の特典を表示するセクションコンポーネント（Web版）
 * 
 * 特典の一覧を2列グリッドで表示し、
 * 各特典の詳細情報を含むカード形式でレンダリングします。
 */
export const BenefitsSection: React.FC = () => {
  // プレミアム特典のデータ
  const benefits = [
    {
      icon: '❤️',
      title: 'いいね付与',
      desc: 'プランに応じたいいねを送信可能'
    },
    {
      icon: '🚀',
      title: 'ブースト特典',
      desc: 'プランに応じたブースト無料付与'
    },
    {
      icon: '💬',
      title: 'メッセージ機能解放',
      desc: 'マッチした相手と自由に会話'
    },
    {
      icon: '🎯',
      title: '高度な検索',
      desc: '細かい条件で理想の相手を発見'
    },
  ];

  return (
    <View style={styles.benefitsSection}>
      {/* セクションタイトル */}
      <Text style={styles.sectionTitle}>🎁 プレミアム特典</Text>

      {/* 特典グリッド */}
      <View style={styles.benefitsGrid}>
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 特典セクションのメインコンテナ
  benefitsSection: {
    marginBottom: 32,               // 下のマージン
  },
  // セクションタイトルのスタイル
  sectionTitle: {
    fontSize: 24,                   // フォントサイズ
    fontWeight: '800',              // フォントウェイト（エクストラボールド）
    color: '#ffffff',               // 白色
    textAlign: 'center',            // 中央揃え
    marginBottom: 20,               // 下のマージン
    textShadowColor: 'rgba(0,0,0,0.3)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 2 }, // シャドウのオフセット
    textShadowRadius: 4,            // シャドウのぼかし半径
  },
  // 特典グリッドのレイアウト
  benefitsGrid: {
    flexDirection: 'row',           // 横並びレイアウト
    flexWrap: 'wrap',               // 折り返しを許可
    justifyContent: 'space-between', // 要素間のスペースを均等に配置
  },
});

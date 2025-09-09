import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * プラン情報を表すインターフェース
 */
interface Plan {
  name: string;           // プラン名
  price: string;          // 価格（¥1,200など）
  period: string;         // 期間（月、3ヶ月、年など）
  savings: string | null; // お得情報（¥600など、nullの場合は表示しない）
  popular: boolean;       // 人気プランかどうか
  features: string[];     // プランの特典リスト
}

/**
 * PlanCardコンポーネントのプロパティ
 */
interface PlanCardProps {
  plan: Plan;                    // 表示するプラン情報
  isSelected: boolean;           // 選択状態かどうか
  onSelect: () => void;          // 選択時のコールバック関数
}

/**
 * プレミアム会員プランを表示するカードコンポーネント
 * 
 * プラン情報、価格、特典、お得情報を表示し、
 * 選択状態に応じたスタイル変更を行います。
 * 人気プランの場合は「🔥 人気」バッジを表示します。
 */
export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.planCard,
        isSelected && styles.planCardSelected, // 選択時は金色のボーダーと背景
      ]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      {/* 人気プランのバッジ（条件付き表示） */}
      {plan.popular && (
        <View style={styles.popularBadge}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']} // 赤からオレンジへのグラデーション
            style={styles.popularBadgeGradient}
          >
            <Text style={styles.popularText}>🔥 人気</Text>
          </LinearGradient>
        </View>
      )}

      {/* カードコンテンツ */}
      <View style={styles.cardContent}>
        {/* プラン情報セクション */}
        <View style={styles.planInfo}>
          {/* プラン名 */}
          <Text style={styles.planName}>{plan.name}</Text>

          {/* 価格と期間の表示 */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.period}>/{plan.period}</Text>
          </View>

          {/* お得情報（条件付き表示） */}
          {plan.savings && (
            <View style={styles.savingsContainer}>
              <Text style={styles.savings}>{plan.savings}お得！</Text>
            </View>
          )}

          {/* プランの特典リスト */}
          <View style={styles.featuresContainer}>
            {plan.features.map((feature, index) => (
              <Text key={index} style={styles.featureText}>• {feature}</Text>
            ))}
          </View>
        </View>

        {/* 選択チェックボックス */}
        <View style={styles.planCheckbox}>
          <View style={[
            styles.checkbox,
            isSelected && styles.checkboxSelected, // 選択時は金色のスタイル
          ]}>
            {/* 選択時のチェックマーク（条件付き表示） */}
            {isSelected && (
              <View style={styles.checkmarkContainer}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // プランカードのメインコンテナ
  planCard: {
    flexDirection: 'row',                    // 横並びレイアウト
    alignItems: 'flex-start',               // 上揃え
    backgroundColor: 'rgba(255,255,255,0.15)', // 半透明の白背景
    borderRadius: 20,                       // 角丸
    padding: 24,                            // 内側の余白
    marginBottom: 16,                       // 下のマージン
    borderWidth: 2,                         // 境界線の太さ
    borderColor: 'rgba(255,255,255,0.2)',  // 半透明の白境界線
    position: 'relative',                   // 人気バッジの位置指定用
    backdropFilter: 'blur(10px)',          // 背景のぼかし効果
  },
  // 選択時のプランカードスタイル
  planCardSelected: {
    borderColor: '#FFD700',                 // 金色のボーダー
    backgroundColor: 'rgba(255,215,0,0.2)', // 金色の半透明背景
  },
  // カードコンテンツのコンテナ（アニメーション対象）
  cardContent: {
    flexDirection: 'row',                   // 横並びレイアウト
    alignItems: 'flex-start',              // 上揃え
    flex: 1,                               // 残りのスペースを占有
  },
  // 人気バッジのコンテナ
  popularBadge: {
    position: 'absolute',                   // 絶対位置
    top: -12,                              // カードの上に配置
    right: 20,                             // 右端から20px
    overflow: 'hidden',                    // はみ出しを隠す
    borderRadius: 16,                      // 角丸
  },
  // 人気バッジのグラデーション
  popularBadgeGradient: {
    paddingHorizontal: 16,                  // 左右のパディング
    paddingVertical: 6,                     // 上下のパディング
  },
  // 人気バッジのテキスト
  popularText: {
    color: '#ffffff',                      // 白色
    fontSize: 12,                          // フォントサイズ
    fontWeight: '700',                     // フォントウェイト（ボールド）
  },
  // プラン情報のコンテナ
  planInfo: {
    flex: 1,                               // 残りのスペースを占有
  },
  // プラン名のスタイル
  planName: {
    fontSize: 20,                          // フォントサイズ
    fontWeight: '700',                     // フォントウェイト（ボールド）
    color: '#ffffff',                      // 白色
    marginBottom: 12,                      // 下のマージン
    textShadowColor: 'rgba(0,0,0,0.3)',   // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,                   // シャドウのぼかし半径
  },
  // 価格と期間のコンテナ
  priceContainer: {
    flexDirection: 'row',                  // 横並びレイアウト
    alignItems: 'baseline',               // ベースライン揃え
    marginBottom: 8,                       // 下のマージン
  },
  // 価格のスタイル
  price: {
    fontSize: 28,                          // フォントサイズ
    fontWeight: '800',                     // フォントウェイト（エクストラボールド）
    color: '#FFD700',                      // 金色
    textShadowColor: 'rgba(0,0,0,0.5)',   // テキストシャドウの色
    textShadowOffset: { width: 0, height: 2 }, // シャドウのオフセット
    textShadowRadius: 4,                   // シャドウのぼかし半径
  },
  // 期間のスタイル
  period: {
    fontSize: 18,                          // フォントサイズ
    color: 'rgba(255,255,255,0.8)',       // 半透明の白色
    marginLeft: 4,                         // 左のマージン
  },
  // お得情報のコンテナ
  savingsContainer: {
    backgroundColor: 'rgba(255, 230, 1, 0.8)', // 黄色の半透明背景
    paddingHorizontal: 16,                 // 左右のパディング
    paddingVertical: 8,                    // 上下のパディング
    borderRadius: 20,                      // 角丸
    alignSelf: 'flex-start',              // 左揃え
    marginBottom: 12,                      // 下のマージン
    borderWidth: 2,                        // 境界線の太さ
    borderColor: 'rgba(255, 255, 255, 0.4)', // 半透明の白境界線
    shadowColor: '#FFE601',                // シャドウの色
    shadowOffset: { width: 0, height: 3 }, // シャドウのオフセット
    shadowOpacity: 0.2,                    // シャドウの透明度
    shadowRadius: 5,                       // シャドウのぼかし半径
    elevation: 4,                          // Android用の影の高さ
  },
  // お得情報のテキスト
  savings: {
    fontSize: 14,                          // フォントサイズ
    color: '#000000',                      // 黒色
    fontWeight: '800',                     // フォントウェイト（エクストラボールド）
    textShadowColor: 'rgba(255,255,255,0.5)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,                   // シャドウのぼかし半径
  },
  // 特典リストのコンテナ
  featuresContainer: {
    marginTop: 8,                          // 上のマージン
  },
  // 特典テキストのスタイル
  featureText: {
    fontSize: 14,                          // フォントサイズ
    color: 'rgba(255,255,255,0.9)',       // 半透明の白色
    marginBottom: 4,                       // 下のマージン
    textShadowColor: 'rgba(0,0,0,0.2)',   // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 1,                   // シャドウのぼかし半径
  },
  // チェックボックスのコンテナ
  planCheckbox: {
    marginLeft: 16,                        // 左のマージン
    marginTop: 4,                          // 上のマージン
  },
  // チェックボックスのスタイル
  checkbox: {
    width: 28,                             // 幅
    height: 28,                            // 高さ
    borderRadius: 14,                      // 円形にするための角丸
    borderWidth: 2,                        // 境界線の太さ
    borderColor: 'rgba(255,255,255,0.4)', // 半透明の白境界線
    alignItems: 'center',                  // 中央揃え（横）
    justifyContent: 'center',              // 中央揃え（縦）
    backgroundColor: 'rgba(255,255,255,0.1)', // 半透明の白背景
    position: 'relative',                  // チェックマークの位置指定用
    overflow: 'hidden',                    // はみ出しを隠す
  },
  // 選択時のチェックボックススタイル
  checkboxSelected: {
    borderColor: '#FFD700',                // 金色のボーダー
    backgroundColor: '#FFD700',            // 金色の背景
    transform: [{ scale: 1.1 }],          // 少し拡大
    shadowColor: '#FFD700',                // シャドウの色
    shadowOffset: { width: 0, height: 4 }, // シャドウのオフセット
    shadowOpacity: 0.5,                    // シャドウの透明度
    shadowRadius: 8,                       // シャドウのぼかし半径
    elevation: 8,                          // Android用の影の高さ
  },
  // チェックマークのコンテナ
  checkmarkContainer: {
    position: 'absolute',                  // 絶対位置
    top: 0,                               // 上端
    left: 0,                              // 左端
    right: 0,                             // 右端
    bottom: 0,                            // 下端
    alignItems: 'center',                 // 中央揃え（横）
    justifyContent: 'center',             // 中央揃え（縦）
    backgroundColor: '#FFD700',            // 金色の背景
    borderRadius: 14,                     // 角丸
  },
  // チェックマークのテキスト
  checkmark: {
    color: '#000000',                     // 黒色
    fontSize: 18,                         // フォントサイズ
    fontWeight: '700',                    // フォントウェイト（ボールド）
    textShadowColor: 'rgba(255,255,255,0.5)', // テキストシャドウの色
    textShadowOffset: { width: 0, height: 1 }, // シャドウのオフセット
    textShadowRadius: 2,                  // シャドウのぼかし半径
  },
});

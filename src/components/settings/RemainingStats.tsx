import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SectionTitle } from './SectionTitle';

/**
 * 残り数量表示コンポーネントのプロパティ
 */
interface RemainingStatsProps {
  /** 残いいね数 */
  remainingLikes: number;
  /** 残ブースト数 */
  remainingBoosts: number;
  /** 残ポイント数 */
  remainingPoints: number;
  /** いいね購入画面への遷移ハンドラー */
  onLikesPress: () => void;
  /** ブースト購入画面への遷移ハンドラー */
  onBoostsPress: () => void;
  /** ポイント購入画面への遷移ハンドラー */
  onPointsPress: () => void;
}

// 画面幅を取得（レスポンシブデザイン用）
const { width } = Dimensions.get('window');

/**
 * 残り数量表示コンポーネント
 * 
 * ユーザーの残り数量（いいね、ブースト、ポイント）を表示し、
 * 各項目をタップすると対応する購入画面に遷移します。
 * 
 * @param remainingLikes - 残いいね数
 * @param remainingBoosts - 残ブースト数
 * @param remainingPoints - 残ポイント数
 * @param onLikesPress - いいね購入画面への遷移ハンドラー
 * @param onBoostsPress - ブースト購入画面への遷移ハンドラー
 * @param onPointsPress - ポイント購入画面への遷移ハンドラー
 * @returns 残り数量表示のJSX要素
 */
export const RemainingStats: React.FC<RemainingStatsProps> = ({
  remainingLikes,
  remainingBoosts,
  remainingPoints,
  onLikesPress,
  onBoostsPress,
  onPointsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        {/* 残り数量タイトル */}
        <SectionTitle title="残り数量" icon="✨" />

        {/* 残いいね数 */}
        <TouchableOpacity style={styles.statItem} onPress={onLikesPress} activeOpacity={0.7}>
          <LinearGradient
            colors={['#FF6B9D', '#FF8E53']}
            style={styles.statIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.iconText}>❤️</Text>
          </LinearGradient>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>残いいね</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.statValue}>{remainingLikes}</Text>
              <Text style={styles.unitText}>回</Text>
            </View>
          </View>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        {/* 残ブースト数 */}
        <TouchableOpacity style={styles.statItem} onPress={onBoostsPress} activeOpacity={0.7}>
          <LinearGradient
            colors={['#4ECDC4', '#44A08D']}
            style={styles.statIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.iconText}>🚀</Text>
          </LinearGradient>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>残ブースト</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.statValue}>{remainingBoosts}</Text>
              <Text style={styles.unitText}>回</Text>
            </View>
          </View>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>

        {/* 残ポイント数 */}
        <TouchableOpacity style={styles.statItem} onPress={onPointsPress} activeOpacity={0.7}>
          <LinearGradient
            colors={['#667eea', '#764ba2', '#667eea']}
            style={styles.statIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.iconText}>⭐</Text>
          </LinearGradient>
          <View style={styles.statContent}>
            <Text style={styles.statLabel}>残ポイント</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.statValue}>{remainingPoints}</Text>
              <Text style={styles.unitText}>pt</Text>
            </View>
          </View>
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // メインコンテナ
  container: {
    marginVertical: 20,
    marginBottom: 24,
  },

  // 統計情報コンテナ
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },

  // 統計項目（いいね、ブースト、ポイント）
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 8,
  },

  // 統計アイコン（グラデーション背景）
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  // アイコンテキスト（絵文字）
  iconText: {
    fontSize: 24,
  },

  // 統計内容コンテナ
  statContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // 統計ラベル（いいね、ブースト、ポイント）
  statLabel: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '600',
    letterSpacing: 0.3,
  },

  // 値と単位のコンテナ
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  // 統計値（数値）
  statValue: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: '800',
    marginRight: 4,
  },

  // 単位テキスト（回、pt）
  unitText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // 矢印テキスト（遷移を示す）
  arrowText: {
    fontSize: 20,
    color: '#8E8E93',
    fontWeight: '600',
    marginLeft: 8,
  },
});

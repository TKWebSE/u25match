import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 無料会員表示コンポーネントのプロパティ
 */
interface FreeMembershipDisplayProps {
  /** アップグレードボタンがタップされた時のコールバック関数 */
  onUpgradePress?: () => void;
}

/**
 * 無料会員表示コンポーネント
 * 
 * 無料会員の現在の状態を表示し、
 * 有料会員へのアップグレードボタンを表示します。
 * 
 * @param onUpgradePress - アップグレードボタンのタップハンドラー
 * @returns 無料会員表示のJSX要素
 */
export const FreeMembershipDisplay: React.FC<FreeMembershipDisplayProps> = ({
  onUpgradePress
}) => {
  return (
    <TouchableOpacity
      style={styles.membershipContainer}
      activeOpacity={0.8}
      onPress={onUpgradePress}
    >
      {/* グラデーション背景 */}
      <LinearGradient
        colors={['#FF6B35', '#F7931E', '#FFD700']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* 会員種別バッジ */}
        <View style={styles.membershipBadge}>
          <Text style={styles.membershipIcon}>⭐</Text>
          <Text style={styles.membershipText}>無料会員</Text>
        </View>

        {/* 会員情報セクション */}
        <View style={styles.membershipInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.upgradeTitle}>🚀 今すぐアップグレード！</Text>
          </View>
          <Text style={styles.upgradeSubtitle}>プレミアム機能をすべて利用可能</Text>

          {/* アップグレードボタン */}
          <LinearGradient
            colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.upgradeButton}
          >
            <Text style={styles.upgradeButtonText}>💎 今すぐ始める</Text>
            <Text style={styles.upgradeButtonIcon}>✨</Text>
          </LinearGradient>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // メインコンテナ
  membershipContainer: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  // グラデーション背景
  gradientBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },

  // 会員種別バッジ
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // 会員種別アイコン
  membershipIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  // 会員種別テキスト
  membershipText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },

  // 会員情報セクション
  membershipInfo: {
    flex: 1,
  },

  // タイトルコンテナ
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  // アップグレードタイトル
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    flexShrink: 0,
  },

  // アップグレードサブタイトル
  upgradeSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },

  // アップグレードボタン
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  // アップグレードボタンテキスト
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 8,
  },

  // アップグレードボタンアイコン
  upgradeButtonIcon: {
    fontSize: 18,
  },
});

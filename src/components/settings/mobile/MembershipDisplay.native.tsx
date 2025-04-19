import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 会員種別表示コンポーネントのプロパティ
 */
interface MembershipDisplayProps {
  /** 会員種別: 'premium' | 'free' */
  membershipType: 'premium' | 'free';
  /** アップグレードボタンがタップされた時のコールバック関数 */
  onUpgradePress?: () => void;
}

/**
 * 会員種別表示コンポーネント
 * 
 * ユーザーの現在の会員種別（プレミアム/無料）を表示し、
 * 無料会員の場合はプレミアム会員へのアップグレードボタンを表示します。
 * 
 * @param membershipType - 会員種別（プレミアムまたは無料）
 * @param onUpgradePress - アップグレードボタンのタップハンドラー
 * @returns 会員種別表示のJSX要素
 */
export const MembershipDisplay: React.FC<MembershipDisplayProps> = ({
  membershipType,
  onUpgradePress
}) => {
  return (
    <TouchableOpacity
      style={styles.membershipContainer}
      activeOpacity={0.8}
      onPress={onUpgradePress}
    >
      {/* 会員種別バッジ */}
      <View style={[
        styles.membershipBadge,
        membershipType === 'premium' ? styles.premiumBadge : styles.freeBadge
      ]}>
        <Text style={styles.membershipIcon}>
          {membershipType === 'premium' ? '👑' : '⭐'}
        </Text>
        <Text style={styles.membershipText}>
          {membershipType === 'premium' ? 'プレミアム会員' : '無料会員'}
        </Text>
      </View>

      {/* 会員情報セクション */}
      <View style={styles.membershipInfo}>
        <Text style={styles.membershipDescription}>
          {membershipType === 'premium'
            ? '月額プランでより多くの機能をお楽しみください'
            : 'いいね付与・メッセージ機能・ブースト特典を利用'
          }
        </Text>

        {/* 無料会員の場合のみアップグレードボタンを表示 */}
        {membershipType === 'free' && (
          <View style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>アップグレード</Text>
            <Text style={styles.upgradeButtonIcon}>💎</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // メインコンテナ
  membershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // 会員種別バッジ（基本スタイル）
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 16,
  },

  // プレミアム会員バッジ
  premiumBadge: {
    backgroundColor: '#FFD700',
  },

  // 無料会員バッジ
  freeBadge: {
    backgroundColor: '#E5E7EB',
  },

  // 会員種別アイコン
  membershipIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  // 会員種別テキスト
  membershipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  // 会員情報セクション
  membershipInfo: {
    flex: 1,
  },

  // 会員種別説明文
  membershipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },

  // アップグレードボタン
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  // アップグレードボタンテキスト
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },

  // アップグレードボタンアイコン
  upgradeButtonIcon: {
    fontSize: 16,
  },
});

import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

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
      style={[
        styles.membershipContainer,
        membershipType === 'premium' ? styles.premiumContainer : styles.freeContainer
      ]}
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
      </View>

      {/* 無料会員の場合のみアップグレードボタンを表示 */}
      {membershipType === 'free' && (
        <View style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>アップグレード</Text>
          <Text style={styles.upgradeButtonIcon}>👑</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

/**
 * コンポーネントのスタイル定義
 */
const styles = StyleSheet.create({
  // メインコンテナ（Web版専用）
  membershipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 32,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    width: '100%',
  } as ViewStyle,

  // プレミアム会員コンテナ
  premiumContainer: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFD700',
  } as ViewStyle,

  // 無料会員コンテナ
  freeContainer: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  } as ViewStyle,

  // 会員種別バッジ
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 32,
    marginRight: 24,
  } as ViewStyle,

  // プレミアム会員バッジ
  premiumBadge: {
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  } as ViewStyle,

  // 無料会員バッジ
  freeBadge: {
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  } as ViewStyle,

  // 会員種別アイコン
  membershipIcon: {
    fontSize: 24,
    marginRight: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  } as TextStyle,

  // 会員種別テキスト
  membershipText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 1.0,
  } as TextStyle,

  // 会員情報セクション
  membershipInfo: {
    flex: 1,
    alignItems: 'flex-start',
  } as ViewStyle,

  // 会員種別説明文
  membershipDescription: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
    lineHeight: 26,
    marginTop: 20,
    marginBottom: 20,
  } as TextStyle,

  // アップグレードボタン
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 18,
    alignSelf: 'flex-end',
    marginLeft: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  } as ViewStyle,

  // アップグレードボタンテキスト
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginRight: 14,
    letterSpacing: 1.0,
  } as TextStyle,

  // アップグレードボタンアイコン
  upgradeButtonIcon: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  } as TextStyle,
});

import { EMOJIS } from '@constants/emojis';
import { MEMBERSHIP_STATUS_SCREEN_PATH } from '@constants/routes';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 有料会員表示コンポーネントのプロパティ
 */
interface PremiumMembershipDisplayProps {
  /** プラン名（オプション） */
  planName?: string;
}

/**
 * 有料会員表示コンポーネント
 * 
 * 有料会員の現在の状態を表示します。
 * アップグレードボタンは表示されません。
 * 
 * @param planName - プラン名（オプション）
 * @returns 有料会員表示のJSX要素
 */
export const PremiumMembershipDisplay: React.FC<PremiumMembershipDisplayProps> = ({
  planName = 'プレミアム会員'
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(MEMBERSHIP_STATUS_SCREEN_PATH);
  };

  return (
    <TouchableOpacity
      style={styles.membershipContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* 会員種別バッジ */}
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#C084FC']}
        style={styles.membershipBadge}
      >
        <Text style={styles.membershipIcon}>{EMOJIS.PREMIUM}</Text>
        <Text style={styles.membershipText}>{planName}</Text>
      </LinearGradient>

      {/* 会員情報セクション */}
      <View style={styles.membershipInfo}>
        <Text style={styles.membershipDescription}>
          プレミアム機能を全て利用可能
        </Text>
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

  // 会員種別バッジ
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 16,
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
  },
});

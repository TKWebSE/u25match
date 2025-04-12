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
  /** 有効期限（オプション） */
  expiryDate?: string;
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
  planName = 'プレミアム会員',
  expiryDate
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(MEMBERSHIP_STATUS_SCREEN_PATH);
  };

  // 有効期限のフォーマット関数
  const formatExpiryDate = (dateString?: string) => {
    if (!dateString) return null;

    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}年${month}月${day}日まで`;
    } catch (error) {
      return null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.membershipContainer}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* メインコンテンツ */}
      <LinearGradient
        colors={['#667EEA', '#764BA2']}
        style={styles.membershipGradient}
      >
        {/* ヘッダー部分 */}
        <View style={styles.membershipHeader}>
          <View style={styles.membershipIconContainer}>
            <Text style={styles.membershipIcon}>{EMOJIS.PREMIUM}</Text>
          </View>
          <View style={styles.membershipTitleContainer}>
            <Text style={styles.membershipTitle}>{planName}</Text>
            <Text style={styles.membershipSubtitle}>Premium Member</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowIcon}>›</Text>
          </View>
        </View>

        {/* 機能説明 */}
        <View style={styles.membershipFeatures}>
          <Text style={styles.featureText}>
            ✨ 無制限いいね ・ 🚀 ブースト機能 ・ 💎 プレミアム機能
          </Text>
        </View>

        {/* 有効期限とステータス */}
        <View style={styles.footerContainer}>
          {expiryDate && (
            <View style={styles.expiryContainer}>
              <Text style={styles.expiryText}>
                {formatExpiryDate(expiryDate)}
              </Text>
            </View>
          )}
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>アクティブ</Text>
            </View>
          </View>
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
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#667EEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  // グラデーション背景
  membershipGradient: {
    padding: 20,
    borderRadius: 20,
  },

  // ヘッダー部分
  membershipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  // アイコンコンテナ
  membershipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  // アイコン
  membershipIcon: {
    fontSize: 24,
  },

  // タイトルコンテナ
  membershipTitleContainer: {
    flex: 1,
  },

  // メインタイトル
  membershipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  // サブタイトル
  membershipSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },

  // 矢印コンテナ
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 矢印アイコン
  arrowIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // 機能説明セクション
  membershipFeatures: {
    marginBottom: 16,
  },

  // 機能テキスト
  featureText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    fontWeight: '500',
  },

  // フッターコンテナ
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // 有効期限コンテナ
  expiryContainer: {
    flex: 1,
  },

  // 有効期限テキスト
  expiryText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },

  // ステータスコンテナ
  statusContainer: {
    alignItems: 'flex-end',
  },

  // ステータスバッジ
  statusBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  // ステータステキスト
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

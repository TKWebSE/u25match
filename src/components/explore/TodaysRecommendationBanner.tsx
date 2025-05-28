import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '@styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodaysRecommendationBannerProps {
  onPress: () => void;
  onClose: () => void;
  visible?: boolean;
}

/**
 * 今日のおすすめバナーコンポーネント
 * 
 * エクスプローラー画面の上部に表示される「今日のおすすめ」バナー
 * ユーザーが閉じるまで表示され続ける
 */
export const TodaysRecommendationBanner: React.FC<TodaysRecommendationBannerProps> = ({
  onPress,
  onClose,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.banner}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="auto-awesome" size={22} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>今日のおすすめ</Text>
            <Text style={styles.subtitle}>特別なマッチングをチェック！</Text>
          </View>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#9CA3AF" />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        activeOpacity={0.7}
      >
        <MaterialIcons name="close" size={16} color="#6B7280" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
  },
  banner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    // グラデーション風のアクセント
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    paddingRight: 48, // 閉じるボタンのスペース
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    // 微細なグラデーション効果
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  arrowContainer: {
    marginLeft: spacing.sm,
    opacity: 0.6,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export default TodaysRecommendationBanner;

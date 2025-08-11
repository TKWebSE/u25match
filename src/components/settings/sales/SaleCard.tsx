import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85;
const CARD_HEIGHT = 320;

interface SaleItem {
  id: string;
  title: string;
  description: string;
  discount: number;
  gradientColors: [string, string, string];
  icon: string;
  urgency: 'high' | 'medium' | 'low';
  remainingCount: number;
  originalPrice: number;
  salePrice: number;
  popularCount: number;
  hotDeal: boolean;
  exclusive: boolean;
  endDate: string;
}

interface SaleCardProps {
  item: SaleItem;
  isActive: boolean;
  onPress: (item: SaleItem) => void;
  animatedShimmerStyle: any;
  animatedPulseStyle: any;
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: [{ skewX: '-20deg' }],
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundIcon: {
    fontSize: 32,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  urgentBadge: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  urgentText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hotDealBadge: {
    backgroundColor: 'rgba(255, 149, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  hotDealText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exclusiveBadge: {
    backgroundColor: 'rgba(175, 82, 222, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  exclusiveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  discountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  discountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'left',
    maxWidth: '90%',
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'left',
    maxWidth: '95%',
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    justifyContent: 'flex-start',
  },
  originalPrice: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },
  salePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  socialProof: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  popularText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 10,
  },
  remainingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  remainingText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '600',
    textAlign: 'left',
  },
  endDateContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  endDateText: {
    fontSize: 13,
    color: 'white',
    fontWeight: '600',
    textAlign: 'left',
  },
});

export const SaleCard: React.FC<SaleCardProps> = ({
  item,
  isActive,
  onPress,
  animatedShimmerStyle,
  animatedPulseStyle,
}) => {
  // アクティブなカードのスケールを動的に計算
  const cardScale = isActive ? 1.05 : 1;

  const getRemainingTime = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return '終了';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `残り${days}日`;
    if (hours > 0) return `残り${hours}時間`;
    return '残り1時間未満';
  };

  return (
    <Pressable
      style={[styles.cardContainer]}
      onPress={() => onPress(item)}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: false }}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <LinearGradient
          colors={item.gradientColors}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* キラキラエフェクト */}
          <Animated.View style={[styles.shimmer, animatedShimmerStyle]} />

          {/* 背景装飾 */}
          <View style={styles.backgroundDecoration}>
            <Text style={styles.backgroundIcon}>{item.icon}</Text>
          </View>

          {/* カード内容 */}
          <View style={styles.cardContent}>
            {/* バッジ類 */}
            <View style={styles.badgeContainer}>
              {item.urgency === 'high' && (
                <Animated.View style={[styles.urgentBadge, animatedPulseStyle]}>
                  <Text style={styles.urgentText}>🔥 急げ！</Text>
                </Animated.View>
              )}
              {item.hotDeal && (
                <View style={styles.hotDealBadge}>
                  <Text style={styles.hotDealText}>🔥 HOT</Text>
                </View>
              )}
              {item.exclusive && (
                <View style={styles.exclusiveBadge}>
                  <Text style={styles.exclusiveText}>✨ 限定</Text>
                </View>
              )}
            </View>

            {/* 割引バッジ */}
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}%OFF</Text>
            </View>

            {/* タイトルと説明 */}
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>

            {/* 価格表示 */}
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>¥{item.originalPrice.toLocaleString()}</Text>
              <Text style={styles.salePrice}>¥{item.salePrice.toLocaleString()}</Text>
            </View>

            {/* 人気度表示 */}
            <View style={styles.socialProof}>
              <Text style={styles.popularText}>
                👥 {item.popularCount.toLocaleString()}人が利用中
              </Text>
            </View>

            {/* 下部情報 */}
            <View style={styles.bottomInfo}>
              <View style={styles.remainingContainer}>
                <Text style={styles.remainingText}>
                  🎯 残り{item.remainingCount}名様
                </Text>
              </View>
              <View style={styles.endDateContainer}>
                <Text style={styles.endDateText}>
                  ⏰ {getRemainingTime(item.endDate)}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// セール情報の型定義
export interface SaleItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  endDate: string;
  backgroundColor: string;
  textColor: string;
  details?: string;
  terms?: string[];
  imageUrl?: string;
  originalPrice?: string;
  salePrice?: string;
  features?: string[];
  urgency?: string;
}

interface SaleCardProps {
  sale: SaleItem;
  onPress: (sale: SaleItem) => void;
}

const SaleCard: React.FC<SaleCardProps> = ({ sale, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 控えめなエントランスアニメーション
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 8,
    }).start();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Animated.View
      style={[
        styles.saleCardWrapper,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.saleCardContainer}
        onPress={() => onPress(sale)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={[styles.saleCard, { backgroundColor: sale.backgroundColor }]}>
          {/* 緊急度バッジ */}
          {sale.urgency && (
            <View style={styles.urgencyBadge}>
              <Text style={styles.urgencyText}>{sale.urgency}</Text>
            </View>
          )}

          {/* 割引バッジ */}
          <View style={styles.discountBadge}>
            <Text style={[styles.discountText, { color: sale.textColor }]}>
              {sale.discount}
            </Text>
          </View>

          <View style={styles.saleCardContent}>
            {/* タイトル */}
            <Text style={[styles.saleTitle, { color: sale.textColor }]}>
              {sale.title}
            </Text>

            {/* 説明 */}
            <Text style={[styles.saleDescription, { color: sale.textColor }]}>
              {sale.description}
            </Text>

            {/* 価格表示 */}
            {sale.originalPrice && sale.salePrice && (
              <View style={styles.priceContainer}>
                <Text style={[styles.originalPrice, { color: sale.textColor }]}>
                  {sale.originalPrice}
                </Text>
                <Text style={[styles.salePrice, { color: sale.textColor }]}>
                  {sale.salePrice}
                </Text>
              </View>
            )}

            {/* 特典リスト */}
            {sale.features && (
              <View style={styles.featuresContainer}>
                {sale.features.map((feature, featureIndex) => (
                  <Text key={featureIndex} style={[styles.featureText, { color: sale.textColor }]}>
                    {feature}
                  </Text>
                ))}
              </View>
            )}

            {/* 終了日 */}
            <View style={styles.endDateContainer}>
              <Text style={[styles.endDateText, { color: sale.textColor }]}>
                ⏰ 終了: {formatDate(sale.endDate)}
              </Text>
            </View>

            {/* CTAボタン */}
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>🔥 今すぐ購入！ 🔥</Text>
            </TouchableOpacity>

            {/* 緊急購入ボタン */}
            <TouchableOpacity style={styles.urgentButton}>
              <Text style={styles.urgentButtonText}>⚡ 限定特典付き！ ⚡</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  saleCardWrapper: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  saleCardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  saleCard: {
    borderRadius: 20,
    padding: 25,
    height: 320,
    justifyContent: 'space-between',
    position: 'relative',
  },
  urgencyBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 15,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  saleCardContent: {
    justifyContent: 'space-between',
    height: '100%',
  },
  saleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  saleDescription: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.95,
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    opacity: 0.8,
    marginRight: 15,
  },
  salePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featuresContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  endDateContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  endDateText: {
    fontSize: 14,
    opacity: 0.9,
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  urgentButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  urgentButtonText: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SaleCard;


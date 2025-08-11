import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SaleCard, { SaleItem } from './SaleCard';

const { width: screenWidth } = Dimensions.get('window');

interface SalesCarouselProps {
  sales: SaleItem[];
  onSalePress: (sale: SaleItem) => void;
  title?: string;
  subtitle?: string;
}

const SalesCarousel: React.FC<SalesCarouselProps> = ({
  sales,
  onSalePress,
  title = '🔥 限定セール',
  subtitle = '今だけの特別オファーで、素敵な出会いを手に入れよう！'
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // エントランスアニメーション
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* ヘッダーセクション */}
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{sales.length}</Text>
              <Text style={styles.statLabel}>限定プラン</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50%</Text>
              <Text style={styles.statLabel}>最大割引</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24h</Text>
              <Text style={styles.statLabel}>残り時間</Text>
            </View>
          </View>
        </View>
      </View>

      {/* セール一覧 */}
      <View style={styles.salesContainer}>
        {sales.map((sale) => (
          <SaleCard
            key={sale.id}
            sale={sale}
            onPress={onSalePress}
          />
        ))}
      </View>

      {/* 特典セクション */}
      <View style={styles.bonusSection}>
        <Text style={styles.bonusTitle}>🎁 今なら追加特典も！</Text>
        <View style={styles.bonusGrid}>
          <View style={styles.bonusItem}>
            <Text style={styles.bonusIcon}>💎</Text>
            <Text style={styles.bonusText}>プレミアムサポート</Text>
          </View>
          <View style={styles.bonusItem}>
            <Text style={styles.bonusIcon}>🎯</Text>
            <Text style={styles.bonusText}>高精度マッチング</Text>
          </View>
          <View style={styles.bonusItem}>
            <Text style={styles.bonusIcon}>🚀</Text>
            <Text style={styles.bonusText}>優先表示</Text>
          </View>
          <View style={styles.bonusItem}>
            <Text style={styles.bonusIcon}>🎉</Text>
            <Text style={styles.bonusText}>特別イベント</Text>
          </View>
        </View>
      </View>

      {/* セール情報 */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 セールについて</Text>
        <Text style={styles.infoText}>
          当アプリでは定期的に特別なセールを開催しています。
          新規ユーザー向けの無料体験や、季節限定の割引キャンペーンなど、
          お得なオファーをお見逃しなく！
        </Text>
      </View>

      {/* 緊急購入セクション */}
      <View style={styles.emergencySection}>
        <Text style={styles.emergencyTitle}>🚨 今すぐ購入しないと損！</Text>
        <Text style={styles.emergencySubtitle}>
          この機会を逃すと、次回は通常価格の2倍以上になります！
        </Text>
        <View style={styles.emergencyStats}>
          <View style={styles.emergencyStat}>
            <Text style={styles.emergencyStatNumber}>⏰</Text>
            <Text style={styles.emergencyStatLabel}>残り時間</Text>
          </View>
          <View style={styles.emergencyStat}>
            <Text style={styles.emergencyStatNumber}>🔥</Text>
            <Text style={styles.emergencyStatLabel}>限定人数</Text>
          </View>
          <View style={styles.emergencyStat}>
            <Text style={styles.emergencyStatNumber}>💎</Text>
            <Text style={styles.emergencyStatLabel}>特典付き</Text>
          </View>
        </View>
      </View>

      {/* 追加特典セクション */}
      <View style={styles.extraBonusSection}>
        <Text style={styles.extraBonusTitle}>🎁 さらに追加特典！</Text>
        <View style={styles.extraBonusGrid}>
          <View style={styles.extraBonusItem}>
            <Text style={styles.extraBonusIcon}>👑</Text>
            <Text style={styles.extraBonusText}>VIP待遇</Text>
            <Text style={styles.extraBonusDesc}>最優先マッチング</Text>
          </View>
          <View style={styles.extraBonusItem}>
            <Text style={styles.extraBonusIcon}>💫</Text>
            <Text style={styles.extraBonusText}>特別機能</Text>
            <Text style={styles.extraBonusDesc}>限定フィルター</Text>
          </View>
          <View style={styles.extraBonusItem}>
            <Text style={styles.extraBonusIcon}>🌟</Text>
            <Text style={styles.extraBonusText}>プレミアム</Text>
            <Text style={styles.extraBonusDesc}>24時間サポート</Text>
          </View>
          <View style={styles.extraBonusItem}>
            <Text style={styles.extraBonusIcon}>🎯</Text>
            <Text style={styles.extraBonusText}>高精度</Text>
            <Text style={styles.extraBonusDesc}>AIマッチング</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 25,
    backgroundColor: '#667eea',
    marginBottom: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  salesContainer: {
    padding: 20,
  },
  bonusSection: {
    padding: 25,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bonusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  bonusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  bonusItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bonusIcon: {
    fontSize: 35,
    marginBottom: 10,
  },
  bonusText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoSection: {
    padding: 25,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    textAlign: 'center',
  },
  emergencySection: {
    padding: 25,
    backgroundColor: '#ff4757',
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  emergencySubtitle: {
    fontSize: 16,
    color: '#ffe0e0',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  emergencyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
  },
  emergencyStat: {
    alignItems: 'center',
  },
  emergencyStatNumber: {
    fontSize: 28,
    marginBottom: 5,
  },
  emergencyStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
  },
  extraBonusSection: {
    padding: 25,
    backgroundColor: '#2ed573',
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  extraBonusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  extraBonusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  extraBonusItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  extraBonusIcon: {
    fontSize: 35,
    marginBottom: 8,
  },
  extraBonusText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  extraBonusDesc: {
    fontSize: 12,
    color: '#e0ffe0',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SalesCarousel;


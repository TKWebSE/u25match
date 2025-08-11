import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// セール情報の型定義
interface SaleItem {
  id: string;
  title: string;
  description: string;
  discount: string;
  endDate: string;
  imageUrl?: string;
  backgroundColor: string;
  textColor: string;
}

// モックデータ
const mockSales: SaleItem[] = [
  {
    id: '1',
    title: 'バレンタインデーセール',
    description: '特別なマッチング機能が50%OFF',
    discount: '50%OFF',
    endDate: '2024-02-14',
    backgroundColor: '#ec4899',
    textColor: '#ffffff',
  },
  {
    id: '2',
    title: '新規ユーザー限定',
    description: '初月無料でプレミアム機能を体験',
    discount: '初月無料',
    endDate: '2024-01-31',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
  },
  {
    id: '3',
    title: '春の新生活応援',
    description: '3ヶ月プランが30%OFF',
    discount: '30%OFF',
    endDate: '2024-03-31',
    backgroundColor: '#10b981',
    textColor: '#ffffff',
  },
];

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.8;
const CARD_MARGIN = 10;

interface SalesCarouselProps {
  onSalePress?: (sale: SaleItem) => void;
}

export const SalesCarousel: React.FC<SalesCarouselProps> = ({ onSalePress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_MARGIN * 2),
      animated: true,
    });
  }, []);

  // 自動スクロール機能
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % mockSales.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 5000); // 5秒ごと
  }, [scrollToIndex]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  // 自動スクロールの開始・停止
  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [isAutoScrolling]); // startAutoScrollとstopAutoScrollを依存配列から削除

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN * 2));

    // 手動スクロール時は自動スクロールを一時停止
    if (index !== activeIndex) {
      setIsAutoScrolling(false);
      setActiveIndex(index);

      // 既存のタイムアウトをクリア
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }

      // 3秒後に自動スクロールを再開
      autoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 3000);
    }
  };

  const handleSalePress = (sale: SaleItem) => {
    if (onSalePress) {
      onSalePress(sale);
    }
  };

  const handleIndicatorPress = (index: number) => {
    setIsAutoScrolling(false);
    scrollToIndex(index);
    setActiveIndex(index);

    // 既存のタイムアウトをクリア
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    // 3秒後に自動スクロールを再開
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* セクションタイトル */}
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>お得なセール</Text>
        <Text style={styles.sectionSubtitle}>期間限定の特別オファー</Text>
        {/* 自動スクロール状態表示 */}
        <View style={styles.autoScrollIndicator}>
          <View style={[styles.autoScrollDot, { backgroundColor: isAutoScrolling ? '#10b981' : '#d1d5db' }]} />
          <Text style={styles.autoScrollText}>
            {isAutoScrolling ? '自動スクロール中' : '手動操作中'}
          </Text>
        </View>
      </View>

      {/* カルーセル */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        decelerationRate="fast"
      >
        {mockSales.map((sale, index) => (
          <Pressable
            key={sale.id}
            style={({ pressed }) => [
              {
                backgroundColor: sale.backgroundColor,
                width: CARD_WIDTH,
                marginHorizontal: CARD_MARGIN,
                borderRadius: 24,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 12,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
            onPress={() => handleSalePress(sale)}
            android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
          >
            <View style={styles.cardContent}>
              {/* 割引バッジ */}
              <View style={styles.discountBadge}>
                <Text style={[styles.discountText, { color: sale.textColor }]}>
                  {sale.discount}
                </Text>
              </View>

              {/* タイトル */}
              <Text style={[styles.title, { color: sale.textColor }]}>
                {sale.title}
              </Text>

              {/* 説明 */}
              <Text style={[styles.description, { color: sale.textColor }]}>
                {sale.description}
              </Text>

              {/* 終了日 */}
              <View style={styles.endDateContainer}>
                <Text style={[styles.endDateText, { color: sale.textColor }]}>
                  終了: {sale.endDate}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* ページインジケーター */}
      <View style={styles.indicatorContainer}>
        {mockSales.map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === activeIndex ? '#6C63FF' : 'transparent',
                borderColor: index === activeIndex ? '#6C63FF' : '#d1d5db',
              },
            ]}
            onPress={() => handleIndicatorPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 12,
    fontWeight: '400',
  },
  autoScrollIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  autoScrollDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  autoScrollText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  discountText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.95,
    fontWeight: '400',
  },
  endDateContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  endDateText: {
    fontSize: 12,
    opacity: 0.9,
    fontWeight: '500',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
});

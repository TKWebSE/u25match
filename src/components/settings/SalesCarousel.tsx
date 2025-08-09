import React, { useRef, useState } from 'react';
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
  const scrollViewRef = useRef<ScrollView>(null);

  console.log('SalesCarousel: onSalePress prop:', onSalePress);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_MARGIN * 2));
    setActiveIndex(index);
  };

  const handleSalePress = (sale: SaleItem) => {
    console.log('SalesCarousel: セールがタップされました:', sale);
    if (onSalePress) {
      onSalePress(sale);
    } else {
      console.log('SalesCarousel: onSalePressが定義されていません');
    }
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_MARGIN * 2),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      {/* セクションタイトル */}
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>お得なセール</Text>
        <Text style={styles.sectionSubtitle}>期間限定の特別オファー</Text>
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
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                opacity: pressed ? 0.8 : 1,
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
                backgroundColor: index === activeIndex ? '#6C63FF' : '#d1d5db',
              },
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  endDateContainer: {
    alignSelf: 'flex-end',
  },
  endDateText: {
    fontSize: 12,
    opacity: 0.8,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

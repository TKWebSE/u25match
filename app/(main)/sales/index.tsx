import CustomHeader from '@components/common/CustomHeader';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

// セール情報の型定義
interface SaleItem {
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
}

// モックセールデータ
const mockSales: SaleItem[] = [
  {
    id: '1',
    title: 'スタートダッシュキャンペーン',
    description: '新生活スタート応援！初月50%OFF',
    discount: '50%OFF',
    endDate: '2024-04-30',
    backgroundColor: '#ff6b35',
    textColor: '#ffffff',
    details: '新生活スタートを応援する特別キャンペーンです。プレミアムマッチング機能、メッセージ機能、プロフィール閲覧機能がすべて50%OFFでご利用いただけます。',
    terms: [
      '期間限定：2024年4月1日〜4月30日',
      '対象機能：プレミアムマッチング、メッセージ、プロフィール閲覧',
      '支払い方法：クレジットカード、デビットカード',
      'キャンセル：いつでも可能',
    ],
  },
  {
    id: '2',
    title: '夏のビーチセール',
    description: '夏限定！3ヶ月プランが40%OFF',
    discount: '40%OFF',
    endDate: '2024-08-31',
    backgroundColor: '#00b4d8',
    textColor: '#ffffff',
    details: '夏のビーチシーズン限定の特別セールです。3ヶ月プランが40%OFFでご利用いただけます。夏の出会いを応援します！',
    terms: [
      '期間：2024年6月1日〜8月31日',
      '対象：3ヶ月プランのみ',
      '割引率：40%OFF',
      '支払い：一括払い',
    ],
  },
  {
    id: '3',
    title: '夏休み特別プラン',
    description: '学生限定！夏休み期間無料体験',
    discount: '夏休み無料',
    endDate: '2024-09-15',
    backgroundColor: '#ff9e00',
    textColor: '#ffffff',
    details: '学生限定の夏休み特別プランです。夏休み期間中（約2ヶ月間）すべてのプレミアム機能を無料でお試しいただけます。',
    terms: [
      '対象：学生ユーザーのみ',
      '期間：夏休み期間（約2ヶ月間）',
      '自動更新：夏休み終了後に自動で有料プランに移行',
      'キャンセル：いつでも可能',
    ],
  },
];

const SalesScreen: React.FC = () => {
  const router = useRouter();

  const handleSalePress = (sale: SaleItem) => {
    router.push(`/(main)/sales/${sale.id}`);
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
    <SafeAreaView style={styles.container}>
      <CustomHeader title="セール情報" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>お得なセール情報</Text>
          <Text style={styles.headerSubtitle}>
            期間限定の特別オファーをお見逃しなく！
          </Text>
        </View>

        {/* セール一覧 */}
        <View style={styles.salesContainer}>
          {mockSales.map((sale) => (
            <TouchableOpacity
              key={sale.id}
              style={[styles.saleCard, { backgroundColor: sale.backgroundColor }]}
              onPress={() => handleSalePress(sale)}
            >
              <View style={styles.saleCardContent}>
                {/* 割引バッジ */}
                <View style={styles.discountBadge}>
                  <Text style={[styles.discountText, { color: sale.textColor }]}>
                    {sale.discount}
                  </Text>
                </View>

                {/* タイトル */}
                <Text style={[styles.saleTitle, { color: sale.textColor }]}>
                  {sale.title}
                </Text>

                {/* 説明 */}
                <Text style={[styles.saleDescription, { color: sale.textColor }]}>
                  {sale.description}
                </Text>

                {/* 終了日 */}
                <View style={styles.endDateContainer}>
                  <Text style={[styles.endDateText, { color: sale.textColor }]}>
                    終了: {formatDate(sale.endDate)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* セール情報 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>セールについて</Text>
          <Text style={styles.infoText}>
            当アプリでは定期的に特別なセールを開催しています。
            新規ユーザー向けの無料体験や、季節限定の割引キャンペーンなど、
            お得なオファーをお見逃しなく！
          </Text>
        </View>

        {/* お問い合わせ */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>お問い合わせ</Text>
          <Text style={styles.contactText}>
            セールについてご質問がございましたら、お気軽にお問い合わせください。
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => router.push('/(main)/contact')}
          >
            <Text style={styles.contactButtonText}>お問い合わせ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  salesContainer: {
    padding: 20,
  },
  saleCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saleCardContent: {
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
  saleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  saleDescription: {
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
  infoSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SalesScreen;

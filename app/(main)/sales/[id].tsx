import CustomHeader from '@components/common/CustomHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
const mockSales: { [key: string]: SaleItem } = {
  '1': {
    id: '1',
    title: 'バレンタインデーセール',
    description: '特別なマッチング機能が50%OFF',
    discount: '50%OFF',
    endDate: '2024-02-14',
    backgroundColor: '#ec4899',
    textColor: '#ffffff',
    details: 'バレンタインデー限定の特別セールです。プレミアムマッチング機能、メッセージ機能、プロフィール閲覧機能がすべて50%OFFでご利用いただけます。',
    terms: [
      '期間限定：2024年2月1日〜2月14日',
      '対象機能：プレミアムマッチング、メッセージ、プロフィール閲覧',
      '支払い方法：クレジットカード、デビットカード',
      'キャンセル：いつでも可能',
    ],
  },
  '2': {
    id: '2',
    title: '新規ユーザー限定',
    description: '初月無料でプレミアム機能を体験',
    discount: '初月無料',
    endDate: '2024-01-31',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    details: '新規登録された方限定の初月無料キャンペーンです。すべてのプレミアム機能を1ヶ月間無料でお試しいただけます。',
    terms: [
      '対象：新規登録ユーザーのみ',
      '期間：登録後1ヶ月間',
      '自動更新：1ヶ月後に自動で有料プランに移行',
      'キャンセル：いつでも可能',
    ],
  },
  '3': {
    id: '3',
    title: '春の新生活応援',
    description: '3ヶ月プランが30%OFF',
    discount: '30%OFF',
    endDate: '2024-03-31',
    backgroundColor: '#10b981',
    textColor: '#ffffff',
    details: '春の新生活を応援する特別セールです。3ヶ月プランが30%OFFでご利用いただけます。',
    terms: [
      '期間：2024年3月1日〜3月31日',
      '対象：3ヶ月プランのみ',
      '割引率：30%OFF',
      '支払い：一括払い',
    ],
  },
};

const SaleDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // セール情報を取得
  const sale = mockSales[id || '1'];

  if (!sale) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title="セール詳細" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>セールが見つかりませんでした</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handlePurchase = () => {
    Alert.alert(
      '購入確認',
      `${sale.title}を購入しますか？\n\n${sale.discount}`,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '購入する',
          onPress: () => {
            setIsLoading(true);
            // 購入処理のシミュレーション
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('購入完了', 'セールの購入が完了しました！');
            }, 1000);
          },
        },
      ]
    );
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
      <CustomHeader title="セール詳細" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* セール画像プレビュー */}
        <View style={[styles.salePreview, { backgroundColor: sale.backgroundColor }]}>
          <View style={styles.discountBadgeLarge}>
            <Text style={[styles.discountTextLarge, { color: sale.textColor }]}>
              {sale.discount}
            </Text>
          </View>
          <Text style={[styles.saleTitleLarge, { color: sale.textColor }]}>
            {sale.title}
          </Text>
          <Text style={[styles.saleDescriptionLarge, { color: sale.textColor }]}>
            {sale.description}
          </Text>
          <View style={styles.endDateContainer}>
            <Text style={[styles.endDateText, { color: sale.textColor }]}>
              終了: {formatDate(sale.endDate)}
            </Text>
          </View>
        </View>

        {/* 詳細情報 */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>詳細</Text>
          <Text style={styles.detailsText}>{sale.details}</Text>
        </View>

        {/* 利用規約 */}
        {sale.terms && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>利用規約</Text>
            {sale.terms.map((term, index) => (
              <Text key={index} style={styles.termText}>
                • {term}
              </Text>
            ))}
          </View>
        )}

        {/* 購入ボタン */}
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            { backgroundColor: sale.backgroundColor },
            isLoading && styles.purchaseButtonDisabled,
          ]}
          onPress={handlePurchase}
          disabled={isLoading}
        >
          <Text style={[styles.purchaseButtonText, { color: sale.textColor }]}>
            {isLoading ? '処理中...' : `${sale.discount}で購入`}
          </Text>
        </TouchableOpacity>

        {/* お問い合わせ */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>お問い合わせ</Text>
          <Text style={styles.contactText}>
            このセールについてご質問がございましたら、お気軽にお問い合わせください。
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  salePreview: {
    borderRadius: 12,
    padding: 20,
    margin: 20,
    height: 250,
    justifyContent: 'space-between',
  },
  discountBadgeLarge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  discountTextLarge: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  saleTitleLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  saleDescriptionLarge: {
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.9,
  },
  endDateContainer: {
    alignSelf: 'flex-end',
  },
  endDateText: {
    fontSize: 14,
    opacity: 0.8,
  },
  detailsSection: {
    margin: 20,
    marginTop: 0,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  termsSection: {
    margin: 20,
    marginTop: 0,
  },
  termsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  termText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },
  purchaseButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
    marginTop: 0,
  },
  purchaseButtonDisabled: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSection: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
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

export default SaleDetailScreen;

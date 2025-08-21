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
  originalPrice?: string;
  salePrice?: string;
  features?: string[];
  urgency?: string;
}

// モックセールデータ
const mockSales: SaleItem[] = [
  {
    id: '1',
    title: 'スタートダッシュキャンペーン',
    description: 'アプリのスタートダッシュ応援！初月50%OFF',
    discount: '50%OFF',
    endDate: '2024-04-30',
    backgroundColor: '#ff6b35',
    textColor: '#ffffff',
    originalPrice: '¥2,980',
    salePrice: '¥1,490',
    features: ['✨ プレミアムマッチング', '💬 無制限メッセージ', '👀 プロフィール閲覧', '🎯 高精度マッチング'],
    urgency: '🔥 限定100名様',
    details: 'アプリのスタートダッシュを応援する特別キャンペーンです。プレミアムマッチング機能、メッセージ機能、プロフィール閲覧機能がすべて50%OFFでご利用いただけます。',
    terms: [
      '期間限定：ユーザー登録から一週間',
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
    originalPrice: '¥8,940',
    salePrice: '¥5,364',
    features: ['🏖️ 夏限定特典', '💕 3ヶ月間サポート', '🎉 特別イベント参加', '🌟 優先マッチング'],
    urgency: '⏰ 残り30日',
    details: '夏のビーチシーズン限定の特別セールです。3ヶ月プランが40%OFFでご利用いただけます。夏の出会いを応援します！',
    terms: [
      '期間：2025年6月1日〜8月31日',
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
    originalPrice: '¥5,960',
    salePrice: '¥0',
    features: ['🎓 学生限定', '☀️ 夏休み期間無料', '🚀 全機能体験', '💎 プレミアム特典'],
    urgency: '🎯 学生証確認必須',
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
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>🎉 超お得なセール開催中！</Text>
            <Text style={styles.headerSubtitle}>
              今だけの特別オファーで、素敵な出会いを手に入れよう！
            </Text>
            <View style={styles.headerStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
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
          {mockSales.map((sale, index) => (
            <TouchableOpacity
              key={sale.id}
              style={styles.saleCardWrapper}
              onPress={() => handleSalePress(sale)}
            >
              <View style={[styles.saleCard, { backgroundColor: sale.backgroundColor }]}>
                {/* 緊急度バッジ */}
                <View style={styles.urgencyBadge}>
                  <Text style={styles.urgencyText}>{sale.urgency}</Text>
                </View>

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
                  <View style={styles.priceContainer}>
                    <Text style={[styles.originalPrice, { color: sale.textColor }]}>
                      {sale.originalPrice}
                    </Text>
                    <Text style={[styles.salePrice, { color: sale.textColor }]}>
                      {sale.salePrice}
                    </Text>
                  </View>

                  {/* 特典リスト */}
                  <View style={styles.featuresContainer}>
                    {sale.features?.map((feature, featureIndex) => (
                      <Text key={featureIndex} style={[styles.featureText, { color: sale.textColor }]}>
                        {feature}
                      </Text>
                    ))}
                  </View>

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
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>🔥 今すぐ購入して特典ゲット！ 🔥</Text>
          </TouchableOpacity>
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
  contactSection: {
    padding: 25,
    backgroundColor: '#ffffff',
    marginBottom: 20,
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
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactButton: {
    backgroundColor: '#6C63FF',
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
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
  emergencyButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  emergencyButtonText: {
    color: '#ff4757',
    fontSize: 18,
    fontWeight: 'bold',
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

export default SalesScreen;

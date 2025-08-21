import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ポイント購入プランの型定義
interface PointPlan {
  id: string;
  points: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  savings?: string;
}

const PurchasePointsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // ポイント購入プランの定義
  const pointPlans: PointPlan[] = [
    { id: '1', points: 100, price: 100, bonus: 0 },
    { id: '2', points: 300, price: 300, bonus: 30, popular: true },
    { id: '3', points: 500, price: 500, bonus: 75, savings: '15%OFF' },
    { id: '4', points: 1000, price: 1000, bonus: 200, savings: '20%OFF' },
    { id: '5', points: 2000, price: 2000, bonus: 500, savings: '25%OFF' },
    { id: '6', points: 5000, price: 5000, bonus: 1500, savings: '30%OFF' },
  ];

  // 現在の残りポイント
  const currentPoints = profile?.remainingPoints ?? 0;

  // プラン選択処理
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  // 購入処理
  const handlePurchase = (plan: PointPlan) => {
    Alert.alert(
      '購入確認',
      `${plan.points}ポイント（ボーナス${plan.bonus}ポイント含む）を${plan.price}円で購入しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '購入する',
          onPress: () => {
            // ここで実際の購入処理を実装（決済処理など）
            Alert.alert(
              '購入完了',
              `${plan.points}ポイント（ボーナス${plan.bonus}ポイント含む）を購入しました！`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setSelectedPlan(null);
                    // 購入完了後の処理（プロフィール更新など）
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 現在の残りポイント表示 */}
        <View style={styles.currentPointsContainer}>
          <Text style={styles.currentPointsLabel}>現在の残りポイント</Text>
          <Text style={styles.currentPointsValue}>{currentPoints.toLocaleString()} pt</Text>
        </View>

        {/* ポイントの説明 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>ポイントについて</Text>
          <Text style={styles.infoText}>
            ポイントは、いいねやブーストの購入に使用できます。1ポイント = 1円で計算され、ボーナスポイントも含めてお得に購入できます。
          </Text>
        </View>

        {/* プラン一覧 */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>購入プラン</Text>

          {pointPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.selectedPlanCard,
                plan.popular && styles.popularPlanCard
              ]}
              onPress={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>人気</Text>
                </View>
              )}

              {plan.savings && (
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsBadgeText}>{plan.savings}</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.pointsCount}>{plan.points}ポイント</Text>
                {(plan.bonus ?? 0) > 0 && (
                  <Text style={styles.bonusText}>+{plan.bonus ?? 0}ボーナス</Text>
                )}
              </View>

              <View style={styles.planDetails}>
                <Text style={styles.priceValue}>¥{plan.price.toLocaleString()}</Text>
                <Text style={styles.pricePerPoint}>
                  ¥{(plan.price / (plan.points + (plan.bonus ?? 0))).toFixed(2)}/pt
                </Text>
              </View>

              {(plan.bonus ?? 0) > 0 && (
                <Text style={styles.totalPointsText}>
                  合計: {plan.points + (plan.bonus ?? 0)}ポイント
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* 購入ボタン */}
        {selectedPlan && (
          <View style={styles.purchaseSection}>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={() => {
                const plan = pointPlans.find(p => p.id === selectedPlan);
                if (plan) handlePurchase(plan);
              }}
            >
              <Text style={styles.purchaseButtonText}>購入する</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 決済方法 */}
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentTitle}>決済方法</Text>
          <View style={styles.paymentMethods}>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>• クレジットカード</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>• デビットカード</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>• コンビニ決済</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Text style={styles.paymentMethodText}>• 銀行振込</Text>
            </View>
          </View>
        </View>

        {/* 注意事項 */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeTitle}>ご利用上の注意</Text>
          <Text style={styles.noticeText}>
            • 購入したポイントは即座に反映されます{'\n'}
            • ポイントの有効期限はありません{'\n'}
            • 購入後の返金はできません{'\n'}
            • ボーナスポイントは期間限定の特典です{'\n'}
            • 決済は安全なSSL暗号化通信で行われます
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  currentPointsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentPointsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  currentPointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  plansContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  planCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  popularPlanCard: {
    borderColor: '#FF6B6B',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  savingsBadge: {
    position: 'absolute',
    top: -8,
    left: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planHeader: {
    marginBottom: 12,
  },
  pointsCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bonusText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pricePerPoint: {
    fontSize: 14,
    color: '#666',
  },
  totalPointsText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'right',
  },
  purchaseSection: {
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  paymentMethods: {
    gap: 8,
  },
  paymentMethod: {
    paddingVertical: 4,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#666',
  },
  noticeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  noticeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default PurchasePointsScreen;

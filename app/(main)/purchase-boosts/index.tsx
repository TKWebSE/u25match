import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ブースト購入プランの型定義
interface BoostPlan {
  id: string;
  boosts: number;
  points: number;
  bonus?: number;
  popular?: boolean;
  description: string;
}

const PurchaseBoostsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // ブースト購入プランの定義
  const boostPlans: BoostPlan[] = [
    {
      id: '1',
      boosts: 5,
      points: 150,
      bonus: 1,
      description: 'プロフィール表示時間を延長'
    },
    {
      id: '2',
      boosts: 12,
      points: 300,
      bonus: 3,
      popular: true,
      description: 'おすすめ度アップでマッチ率向上'
    },
    {
      id: '3',
      boosts: 25,
      points: 500,
      bonus: 7,
      description: 'より多くのユーザーに表示される'
    },
    {
      id: '4',
      boosts: 50,
      points: 800,
      bonus: 15,
      description: '最優先表示でマッチチャンス最大化'
    },
    {
      id: '5',
      boosts: 100,
      points: 1200,
      bonus: 30,
      description: 'プレミアムブーストで差別化'
    },
  ];

  // 現在の残りポイント
  const currentPoints = profile?.remainingPoints ?? 0;

  // プラン選択処理
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  // 購入処理
  const handlePurchase = (plan: BoostPlan) => {
    if (currentPoints < plan.points) {
      Alert.alert(
        'ポイント不足',
        '購入に必要なポイントが不足しています。ポイントを追加で購入してください。',
        [
          { text: 'キャンセル', style: 'cancel' },
          { text: 'ポイント購入', onPress: () => router.push('/(main)/purchase-points') }
        ]
      );
      return;
    }

    Alert.alert(
      '購入確認',
      `${plan.boosts}ブーストを${plan.points}ポイントで購入しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '購入する',
          onPress: () => {
            // ここで実際の購入処理を実装
            Alert.alert('購入完了', `${plan.boosts}ブーストを購入しました！`);
            setSelectedPlan(null);
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

        {/* ブーストの説明 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>ブーストとは？</Text>
          <Text style={styles.infoText}>
            ブーストを使用すると、あなたのプロフィールがより多くのユーザーに表示され、マッチの可能性が高まります。プロフィール表示時間も延長されます。
          </Text>
        </View>

        {/* プラン一覧 */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>購入プラン</Text>

          {boostPlans.map((plan) => (
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

              <View style={styles.planHeader}>
                <Text style={styles.boostsCount}>{plan.boosts}ブースト</Text>
                {plan.bonus && (
                  <Text style={styles.bonusText}>+{plan.bonus}ボーナス</Text>
                )}
              </View>

              <Text style={styles.planDescription}>{plan.description}</Text>

              <View style={styles.planDetails}>
                <Text style={styles.pointsRequired}>{plan.points} pt</Text>
                <Text style={styles.pricePerBoost}>
                  {Math.round(plan.points / plan.boosts)} pt/ブースト
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 購入ボタン */}
        {selectedPlan && (
          <View style={styles.purchaseSection}>
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={() => {
                const plan = boostPlans.find(p => p.id === selectedPlan);
                if (plan) handlePurchase(plan);
              }}
            >
              <Text style={styles.purchaseButtonText}>購入する</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 注意事項 */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeTitle}>ご利用上の注意</Text>
          <Text style={styles.noticeText}>
            • 購入したブーストは即座に反映されます{'\n'}
            • ブーストは1回使用すると24時間有効です{'\n'}
            • 購入後の返金はできません{'\n'}
            • ポイントは1ポイント = 1円で計算されます{'\n'}
            • ボーナスブーストは期間限定の特典です
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
  planHeader: {
    marginBottom: 8,
  },
  boostsCount: {
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
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsRequired: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pricePerBoost: {
    fontSize: 14,
    color: '#666',
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

export default PurchaseBoostsScreen;

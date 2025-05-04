import { PURCHASE_POINTS_SCREEN_PATH } from '@constants/routes';
import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// いいね購入プランの型定義
interface LikePlan {
  id: string;
  likes: number;
  points: number;
  popular?: boolean;
}

const PurchaseLikesScreen = () => {
  const router = useRouter();
  const user = useStrictAuth();
  const { profile } = useProfile(user.uid);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // いいね購入プランの定義
  const likePlans: LikePlan[] = [
    { id: '1', likes: 10, points: 100 },
    { id: '2', likes: 25, points: 200, popular: true },
    { id: '3', likes: 50, points: 350 },
    { id: '4', likes: 100, points: 600 },
    { id: '5', likes: 200, points: 1000 },
  ];

  // 現在の残りポイント
  const currentPoints = profile?.remainingPoints ?? 0;

  // プラン選択処理
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  // 購入処理
  const handlePurchase = (plan: LikePlan) => {
    if (currentPoints < plan.points) {
      Alert.alert(
        'ポイント不足',
        '購入に必要なポイントが不足しています。ポイントを追加で購入してください。',
        [
          { text: 'キャンセル', style: 'cancel' },
          { text: 'ポイント購入', onPress: () => router.push(PURCHASE_POINTS_SCREEN_PATH as any) }
        ]
      );
      return;
    }

    Alert.alert(
      '購入確認',
      `${plan.likes}いいねを${plan.points}ポイントで購入しますか？`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '購入する',
          onPress: () => {
            // ここで実際の購入処理を実装
            Alert.alert('購入完了', `${plan.likes}いいねを購入しました！`);
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

        {/* プラン一覧 */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>購入プラン</Text>

          {likePlans.map((plan) => (
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
                <Text style={styles.likesCount}>{plan.likes}いいね</Text>
              </View>

              <View style={styles.planDetails}>
                <Text style={styles.pointsRequired}>{plan.points} pt</Text>
                <Text style={styles.pricePerLike}>
                  {Math.round(plan.points / plan.likes)} pt/いいね
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
                const plan = likePlans.find(p => p.id === selectedPlan);
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
            • 購入後のポイント返還はできません{'\n'}
            • いいねは購入後すぐに利用可能になります{'\n'}
            • アカウント削除時は残りのいいねも失効します{'\n'}
            • 不具合が発生した場合はお問い合わせください
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
    marginBottom: 12,
  },
  likesCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
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
  pricePerLike: {
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

export default PurchaseLikesScreen;

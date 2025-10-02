import { EMOJIS } from '@constants/emojis';
import { PURCHASE_POINTS_SCREEN_PATH } from '@constants/routes';
import { Ionicons } from '@expo/vector-icons';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { usePurchaseStore } from '@stores/purchaseStore';
import { purchaseLikes } from '@usecases/purchase';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
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
  const { isLoading } = usePurchaseStore();

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
  const handlePurchase = async (plan: LikePlan) => {
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
          onPress: async () => {
            try {
              const result = await purchaseLikes({
                planId: plan.id,
                amount: plan.likes,
                pointsCost: plan.points,
              });

              if (result.success) {
                showSuccessToast(`${plan.likes}いいねを購入しました！`);
                setSelectedPlan(null);
              } else {
                showErrorToast(result.error || 'いいねの購入に失敗しました');
              }
            } catch (error: any) {
              showErrorToast(error.message || 'いいねの購入に失敗しました');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ヘッダーセクション */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#A855F7']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>いいね購入</Text>
            <View style={styles.placeholder} />
          </View>

          {/* 現在の残りポイント表示 */}
          <View style={styles.currentPointsCard}>
            <View style={styles.pointsIconContainer}>
              <Text style={styles.pointsIcon}>{EMOJIS.POINT}</Text>
            </View>
            <View style={styles.pointsInfo}>
              <Text style={styles.currentPointsLabel}>現在の残りポイント</Text>
              <Text style={styles.currentPointsValue}>{currentPoints.toLocaleString()} pt</Text>
            </View>
          </View>
        </LinearGradient>

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
              activeOpacity={0.8}
            >
              {plan.popular && (
                <LinearGradient
                  colors={['#FF6B6B', '#FF8E8E']}
                  style={styles.popularBadge}
                >
                  <Text style={styles.popularBadgeText}>人気</Text>
                </LinearGradient>
              )}

              <View style={styles.planContent}>
                <View style={styles.planHeader}>
                  <View style={styles.likesIconContainer}>
                    <Ionicons name="heart" size={24} color="#FF6B6B" />
                  </View>
                  <Text style={styles.likesCount}>{plan.likes}いいね</Text>
                </View>

                <View style={styles.planDetails}>
                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsIconSmall}>{EMOJIS.POINT}</Text>
                    <Text style={styles.pointsRequired}>{plan.points} pt</Text>
                  </View>
                  <Text style={styles.pricePerLike}>
                    {Math.round(plan.points / plan.likes)} pt/いいね
                  </Text>
                </View>

                {selectedPlan === plan.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 購入ボタン */}
        {selectedPlan && (
          <View style={styles.purchaseSection}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.purchaseButton}
            >
              <TouchableOpacity
                style={[styles.purchaseButtonContent, isLoading && styles.disabledButton]}
                onPress={() => {
                  const plan = likePlans.find(p => p.id === selectedPlan);
                  if (plan) handlePurchase(plan);
                }}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Text style={styles.purchaseButtonText}>処理中...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="cart" size={20} color="#FFFFFF" />
                    <Text style={styles.purchaseButtonText}>購入する</Text>
                  </>
                )}
              </TouchableOpacity>
            </LinearGradient>
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
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  // ヘッダー関連
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  // ポイント表示カード
  currentPointsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 0,
  },
  pointsIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsIcon: {
    fontSize: 32,
  },
  pointsIconSmall: {
    fontSize: 16,
  },
  currentPointsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  currentPointsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  // プラン一覧
  plansContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  },
  selectedPlanCard: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  popularPlanCard: {
    borderColor: '#FF6B6B',
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  planContent: {
    padding: 20,
    position: 'relative',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  likesIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  likesCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  planDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsRequired: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 6,
  },
  pricePerLike: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 32,
    right: 16,
  },
  // 購入ボタン
  purchaseSection: {
    padding: 20,
  },
  purchaseButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  purchaseButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  // 注意事項
  noticeContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  noticeText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
});

export default PurchaseLikesScreen;

import { BenefitsSection } from '@components/membership/mobile/BenefitsSection.native';
import { Header } from '@components/membership/multi/Header';
import { HeroSection } from '@components/membership/multi/HeroSection';
import { PlanCard } from '@components/membership/multi/PlanCard';
import { MEMBERSHIP_PLANS, PlanId } from '@constants/membershipPlans';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

/**
 * 会員登録スクリーン（モバイル版）
 * 
 * プレミアム会員への登録手続きを行う画面です。
 * プラン選択、支払い情報入力、確認画面を含みます。
 */
export default function MembershipRegistrationScreen() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('monthly');
  const [isLoading, setIsLoading] = useState(false);

  // プラン情報は定数から取得
  const plans = MEMBERSHIP_PLANS;

  // プラン選択処理
  const handlePlanSelect = (plan: PlanId) => {
    setSelectedPlan(plan);
  };

  // 会員登録処理
  const handleRegistration = async () => {
    setIsLoading(true);

    try {
      // 実際の登録処理をここに実装
      await new Promise(resolve => setTimeout(resolve, 2000)); // シミュレーション

      // 成功トーストを表示
      showSuccessToast('🎉 プレミアム会員への登録が完了しました！');

      // 少し遅延してから前の画面に戻る
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      // エラートーストを表示
      showErrorToast('登録に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* 背景グラデーション */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* ヘッダー */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ヒーローセクション */}
        <HeroSection />

        {/* プラン選択セクション */}
        <View style={styles.planSection}>
          <Text style={styles.sectionTitle}>✨ プランを選択</Text>

          {Object.entries(plans).map(([key, plan]) => (
            <PlanCard
              key={key}
              plan={plan}
              isSelected={selectedPlan === key}
              onSelect={() => handlePlanSelect(key as PlanId)}
            />
          ))}
        </View>


        {/* 特典セクション */}
        <BenefitsSection />

        {/* 登録ボタン */}
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegistration}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500', '#FF6347']}
              style={styles.registerButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.registerButtonText}>
                {isLoading ? '登録中...' : '👑 プレミアム会員に登録'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 注意事項 */}
        <View style={styles.disclaimerSection}>
          <Text style={styles.disclaimerText}>
            登録することで、利用規約とプライバシーポリシーに同意したものとみなされます。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // 背景グラデーション
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },


  // コンテンツ
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },


  // プラン選択セクション
  planSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },



  // 登録ボタン
  registerButtonContainer: {
    marginBottom: 32,
  },
  registerButton: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // 注意事項
  disclaimerSection: {
    paddingBottom: 40,
  },
  disclaimerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});

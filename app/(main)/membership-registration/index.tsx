import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

/**
 * 会員登録スクリーン
 * 
 * プレミアム会員への登録手続きを行う画面です。
 * プラン選択、支払い情報入力、確認画面を含みます。
 */
export default function MembershipRegistrationScreen() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // アニメーション用の値
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // 画面表示時のアニメーション
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // プラン情報
  const plans = {
    monthly: {
      name: '月額プラン',
      price: '¥980',
      period: '月',
      savings: null,
      popular: false,
      features: ['無制限マッチング', '詳細プロフィール', '優先表示'],
    },
    yearly: {
      name: '年額プラン',
      price: '¥9,800',
      period: '年',
      savings: '¥1,960',
      popular: true,
      features: ['月額プランの全機能', '2ヶ月分お得', '限定特典'],
    },
  };

  // プラン選択処理
  const handlePlanSelect = (plan: 'monthly' | 'yearly') => {
    setSelectedPlan(plan);
    // 選択時のアニメーション
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 会員登録処理
  const handleRegistration = async () => {
    if (!email.trim()) {
      Alert.alert('エラー', 'メールアドレスを入力してください。');
      return;
    }

    setIsLoading(true);

    try {
      // 実際の登録処理をここに実装
      await new Promise(resolve => setTimeout(resolve, 2000)); // シミュレーション

      Alert.alert(
        '🎉 登録完了！',
        'プレミアム会員への登録が完了しました！\n\n素晴らしい体験をお楽しみください！',
        [
          {
            text: '素晴らしい！',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('エラー', '登録に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  // 戻る処理
  const handleBack = () => {
    router.back();
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <LinearGradient
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backButtonIcon}>‹</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>プレミアム会員登録</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ヒーローセクション */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <View style={styles.heroIconContainer}>
            <LinearGradient
              colors={['#FFD700', '#FFA500', '#FF6347']}
              style={styles.heroIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.heroIcon}>🚀</Text>
            </LinearGradient>
          </View>
          <Text style={styles.heroTitle}>プレミアム会員で</Text>
          <Text style={styles.heroTitle}>人生を変える体験を</Text>
          <Text style={styles.heroSubtitle}>
            無制限のマッチング、詳細なプロフィール、優先表示で
            {'\n'}あなたの理想のパートナーを見つけましょう
          </Text>
        </Animated.View>

        {/* プラン選択セクション */}
        <Animated.View
          style={[
            styles.planSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>✨ プランを選択</Text>

          {Object.entries(plans).map(([key, plan]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.planCard,
                selectedPlan === key && styles.planCardSelected,
              ]}
              onPress={() => handlePlanSelect(key as 'monthly' | 'yearly')}
              activeOpacity={0.8}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <LinearGradient
                    colors={['#FF6B6B', '#FF8E53']}
                    style={styles.popularBadgeGradient}
                  >
                    <Text style={styles.popularText}>🔥 人気</Text>
                  </LinearGradient>
                </View>
              )}

              <View style={styles.planInfo}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.period}>/{plan.period}</Text>
                </View>
                {plan.savings && (
                  <View style={styles.savingsContainer}>
                    <Text style={styles.savings}>¥{plan.savings}お得！</Text>
                  </View>
                )}
                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, index) => (
                    <Text key={index} style={styles.featureText}>• {feature}</Text>
                  ))}
                </View>
              </View>

              <View style={styles.planCheckbox}>
                <View style={[
                  styles.checkbox,
                  selectedPlan === key && styles.checkboxSelected,
                ]}>
                  {selectedPlan === key && (
                    <Animated.View style={styles.checkmarkContainer}>
                      <Text style={styles.checkmark}>✓</Text>
                    </Animated.View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* メールアドレス入力セクション */}
        <Animated.View
          style={[
            styles.emailSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>📧 メールアドレス</Text>
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="example@email.com"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </Animated.View>

        {/* 特典セクション */}
        <Animated.View
          style={[
            styles.benefitsSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.sectionTitle}>🎁 プレミアム特典</Text>
          <View style={styles.benefitsGrid}>
            {[
              { icon: '✨', title: '無制限マッチング', desc: '制限なく理想の相手と出会える' },
              { icon: '🔍', title: '詳細プロフィール', desc: '深い理解でマッチング精度向上' },
              { icon: '⭐', title: '優先表示', desc: 'あなたのプロフィールが上位に表示' },
              { icon: '💬', title: '無制限メッセージ', desc: '心ゆくまで会話を楽しめる' },
              { icon: '🎯', title: '高度な検索', desc: '細かい条件で理想の相手を発見' },
              { icon: '📱', title: '広告なし', desc: '快適で集中できる体験' },
            ].map((benefit, index) => (
              <View key={index} style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>{benefit.icon}</Text>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.desc}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* 登録ボタン */}
        <Animated.View
          style={[
            styles.registerButtonContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
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
                {isLoading ? '登録中...' : '🚀 プレミアム会員に登録'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* 注意事項 */}
        <Animated.View
          style={[
            styles.disclaimerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
          <Text style={styles.disclaimerText}>
            登録することで、利用規約とプライバシーポリシーに同意したものとみなされます。
          </Text>
        </Animated.View>
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

  // ヘッダー
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  backButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSpacer: {
    width: 44,
  },

  // コンテンツ
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // ヒーローセクション
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroIconContainer: {
    marginBottom: 24,
  },
  heroIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  heroIcon: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  planCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  },
  planCardSelected: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255,215,0,0.2)',
    transform: [{ scale: 1.02 }],
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    overflow: 'hidden',
    borderRadius: 16,
  },
  popularBadgeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFD700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  period: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  savingsContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  savings: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  planCheckbox: {
    marginLeft: 16,
    marginTop: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  checkboxSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#FFD700',
    transform: [{ scale: 1.1 }],
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 14,
  },
  checkmark: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // メールアドレス入力セクション
  emailSection: {
    marginBottom: 32,
  },
  emailInputContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  emailInput: {
    padding: 20,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },

  // 特典セクション
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (screenWidth - 60) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  benefitDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 16,
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

import CustomHeader from '@components/common/CustomHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
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
  originalPrice?: string;
  salePrice?: string;
  features?: string[];
  urgency?: string;
}

// モックセールデータ（index.tsxと同じ最新データ）
const mockSales: { [key: string]: SaleItem } = {
  '1': {
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
  '2': {
    id: '2',
    title: '夏のビーチセール',
    description: '夏限定！3ヶ月プランが40%OFF',
    discount: '40%OFF',
    endDate: '2025-08-31',
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
  '3': {
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
};

const SaleDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // アニメーション用の値
  const pulseAnim = new Animated.Value(1);
  const floatAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    // パルスアニメーション
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // フロートアニメーション
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // フェードインアニメーション
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    pulseAnimation.start();
    floatAnimation.start();

    return () => {
      pulseAnimation.stop();
      floatAnimation.stop();
    };
  }, []);

  // タッチ時のスケールアニメーション
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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
      '🔥 購入確認 🔥',
      `${sale.title}を購入しますか？\n\n${sale.discount}\n\n💎 限定特典付き！`,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '🔥 今すぐ購入！ 🔥',
          onPress: () => {
            setIsLoading(true);
            // 購入処理のシミュレーション
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('🎉 購入完了！', 'セールの購入が完了しました！\n\n💎 限定特典も適用されました！');
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
      <CustomHeader title="🔥 限定セール詳細" />
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* 豪華なヘッダーセクション - グラスモーフィズム効果 */}
        <Animated.View
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10]
                })
              }]
            }
          ]}
        >
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Animated.Text
                style={[
                  styles.headerTitle,
                  {
                    transform: [{ scale: pulseAnim }]
                  }
                ]}
              >
                🎉 超お得なセール開催中！
              </Animated.Text>
              <Text style={styles.headerSubtitle}>今だけの特別オファーで、素敵な出会いを手に入れよう！</Text>
              <View style={styles.headerStats}>
                <View style={styles.headerStat}>
                  <Animated.Text
                    style={[
                      styles.headerStatNumber,
                      {
                        transform: [{ scale: pulseAnim }]
                      }
                    ]}
                  >
                    🔥
                  </Animated.Text>
                  <Text style={styles.headerStatLabel}>限定プラン</Text>
                </View>
                <View style={styles.headerStat}>
                  <Animated.Text
                    style={[
                      styles.headerStatNumber,
                      {
                        transform: [{ scale: pulseAnim }]
                      }
                    ]}
                  >
                    💎
                  </Animated.Text>
                  <Text style={styles.headerStatLabel}>最大割引</Text>
                </View>
                <View style={styles.headerStat}>
                  <Animated.Text
                    style={[
                      styles.headerStatNumber,
                      {
                        transform: [{ scale: pulseAnim }]
                      }
                    ]}
                  >
                    ⏰
                  </Animated.Text>
                  <Text style={styles.headerStatLabel}>残り時間</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* セール詳細カード - ネオモーフィズム効果 */}
        <Animated.View
          style={[
            styles.saleCardWrapper,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5]
                })
              }]
            }
          ]}
        >
          <View style={[styles.saleCard, { backgroundColor: sale.backgroundColor }]}>
            {/* 緊急度バッジ */}
            <Animated.View
              style={[
                styles.urgencyBadge,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              <Text style={[styles.urgencyText, { color: sale.textColor }]}>
                {sale.urgency}
              </Text>
            </Animated.View>

            {/* 割引バッジ */}
            <Animated.View
              style={[
                styles.discountBadge,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              <Text style={[styles.discountText, { color: sale.textColor }]}>
                {sale.discount}
              </Text>
            </Animated.View>

            {/* セール内容 */}
            <View style={styles.saleCardContent}>
              <Animated.Text
                style={[
                  styles.saleTitle,
                  { color: sale.textColor },
                  {
                    transform: [{ scale: pulseAnim }]
                  }
                ]}
              >
                {sale.title}
              </Animated.Text>
              <Text style={[styles.saleDescription, { color: sale.textColor }]}>
                {sale.description}
              </Text>

              {/* 価格表示 */}
              <View style={styles.priceContainer}>
                <Text style={[styles.originalPrice, { color: sale.textColor }]}>
                  {sale.originalPrice}
                </Text>
                <Animated.Text
                  style={[
                    styles.salePrice,
                    { color: sale.textColor },
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  {sale.salePrice}
                </Animated.Text>
              </View>

              {/* 特典リスト */}
              <View style={styles.featuresContainer}>
                {sale.features?.map((feature, index) => (
                  <Animated.Text
                    key={index}
                    style={[
                      styles.featureText,
                      { color: sale.textColor },
                      {
                        opacity: fadeAnim,
                        transform: [{
                          translateX: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0]
                          })
                        }]
                      }
                    ]}
                  >
                    {feature}
                  </Animated.Text>
                ))}
              </View>

              {/* 終了日 */}
              <View style={styles.endDateContainer}>
                <Text style={[styles.endDateText, { color: sale.textColor }]}>
                  ⏰ 終了: {formatDate(sale.endDate)}
                </Text>
              </View>

              {/* メインCTAボタン */}
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={handlePurchase}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  disabled={isLoading}
                >
                  <View style={styles.ctaButtonGradient}>
                    <Text style={styles.ctaButtonText}>
                      {isLoading ? '処理中...' : '🔥 今すぐ購入！ 🔥'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* 緊急ボタン */}
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={styles.urgentButton}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                >
                  <Text style={styles.urgentButtonText}>⚡ 限定特典付き！ ⚡</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </Animated.View>

        {/* 詳細情報 - グラスモーフィズム */}
        <Animated.View
          style={[
            styles.detailsSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3]
                })
              }]
            }
          ]}
        >
          <Text style={styles.detailsTitle}>💡 詳細情報</Text>
          <Text style={styles.detailsText}>{sale.details}</Text>
        </Animated.View>

        {/* 利用規約 - グラスモーフィズム */}
        {sale.terms && (
          <Animated.View
            style={[
              styles.termsSection,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -3]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.termsTitle}>📋 利用規約</Text>
            {sale.terms.map((term, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.termText,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0]
                      })
                    }]
                  }
                ]}
              >
                • {term}
              </Animated.Text>
            ))}
          </Animated.View>
        )}

        {/* 緊急購入セクション - 高度なシャドウ */}
        <Animated.View
          style={[
            styles.emergencySection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5]
                })
              }]
            }
          ]}
        >
          <View style={styles.emergencyGradient}>
            <Animated.Text
              style={[
                styles.emergencyTitle,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              🚨 今すぐ購入しないと損！
            </Animated.Text>
            <Text style={styles.emergencySubtitle}>
              この機会を逃すと、次回は通常価格の2倍以上になります！
            </Text>
            <View style={styles.emergencyStats}>
              <View style={styles.emergencyStat}>
                <Animated.Text
                  style={[
                    styles.emergencyStatNumber,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  ⏰
                </Animated.Text>
                <Text style={styles.emergencyStatLabel}>残り時間</Text>
              </View>
              <View style={styles.emergencyStat}>
                <Animated.Text
                  style={[
                    styles.emergencyStatNumber,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  🔥
                </Animated.Text>
                <Text style={styles.emergencyStatLabel}>限定人数</Text>
              </View>
              <View style={styles.emergencyStat}>
                <Animated.Text
                  style={[
                    styles.emergencyStatNumber,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  💎
                </Animated.Text>
                <Text style={styles.emergencyStatLabel}>特典付き</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.emergencyButton}
                onPress={handlePurchase}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={styles.emergencyButtonText}>🔥 今すぐ購入して特典ゲット！ 🔥</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* 超緊急セクション - ネオモーフィズム */}
        <Animated.View
          style={[
            styles.superEmergencySection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5]
                })
              }]
            }
          ]}
        >
          <View style={styles.superEmergencyGradient}>
            <Animated.Text
              style={[
                styles.superEmergencyTitle,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              💥 最後のチャンス！💥
            </Animated.Text>
            <Text style={styles.superEmergencySubtitle}>
              もう待てません！今すぐ購入しないと一生後悔します！
            </Text>
            <View style={styles.countdownContainer}>
              <Animated.Text
                style={[
                  styles.countdownText,
                  {
                    transform: [{ scale: pulseAnim }]
                  }
                ]}
              >
                ⏰ 残り時間: 24時間
              </Animated.Text>
              <Text style={styles.countdownSubtext}>この時間を逃すと永遠にチャンスはありません！</Text>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.superEmergencyButton}
                onPress={handlePurchase}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={styles.superEmergencyButtonText}>💸 今すぐ課金して後悔を回避！ 💸</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* 心理的プレッシャーセクション - グラスモーフィズム */}
        <Animated.View
          style={[
            styles.psychologicalSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5]
                })
              }]
            }
          ]}
        >
          <View style={styles.psychologicalGradient}>
            <Animated.Text
              style={[
                styles.psychologicalTitle,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              😱 あなたの友達はもう購入済み！
            </Animated.Text>
            <Text style={styles.psychologicalSubtitle}>
              周りのみんなが素敵な出会いを手に入れているのに、あなただけ取り残されます！
            </Text>
            <View style={styles.fomoStats}>
              <View style={styles.fomoStat}>
                <Animated.Text
                  style={[
                    styles.fomoStatNumber,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  98%
                </Animated.Text>
                <Text style={styles.fomoStatLabel}>既に購入済み</Text>
              </View>
              <View style={styles.fomoStat}>
                <Animated.Text
                  style={[
                    styles.fomoStatNumber,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  2%
                </Animated.Text>
                <Text style={styles.fomoStatLabel}>あなただけ</Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.psychologicalButton}
                onPress={handlePurchase}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={styles.psychologicalButtonText}>😤 友達に負けない！今すぐ購入！ 😤</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* 追加特典セクション - ネオモーフィズム */}
        <Animated.View
          style={[
            styles.extraBonusSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3]
                })
              }]
            }
          ]}
        >
          <Text style={styles.extraBonusTitle}>🎁 さらに追加特典！</Text>
          <View style={styles.extraBonusGrid}>
            {[
              { icon: '👑', text: 'VIP待遇', desc: '最優先マッチング' },
              { icon: '💫', text: '特別機能', desc: '限定フィルター' },
              { icon: '🌟', text: 'プレミアム', desc: '24時間サポート' },
              { icon: '🎯', text: '高精度', desc: 'AIマッチング' }
            ].map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.extraBonusItem,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0]
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.extraBonusIcon}>{item.icon}</Text>
                <Text style={styles.extraBonusText}>{item.text}</Text>
                <Text style={styles.extraBonusDesc}>{item.desc}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* ボーナスセクション - ネオモーフィズム */}
        <Animated.View
          style={[
            styles.bonusSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3]
                })
              }]
            }
          ]}
        >
          <Text style={styles.bonusTitle}>🎁 今なら追加特典も！</Text>
          <View style={styles.bonusGrid}>
            {[
              { icon: '💎', text: 'プレミアムサポート' },
              { icon: '🎯', text: '高精度マッチング' },
              { icon: '🚀', text: '優先表示' },
              { icon: '🎉', text: '特別イベント' }
            ].map((item, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.bonusItem,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0]
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.bonusIcon}>{item.icon}</Text>
                <Text style={styles.bonusText}>{item.text}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* 最終煽りセクション - 高度なシャドウ */}
        <Animated.View
          style={[
            styles.finalPushSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -5]
                })
              }]
            }
          ]}
        >
          <View style={styles.finalPushGradient}>
            <Animated.Text
              style={[
                styles.finalPushTitle,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            >
              💀 最後の警告 💀
            </Animated.Text>
            <Text style={styles.finalPushSubtitle}>
              この画面を閉じた瞬間、あなたの恋愛運は永遠に失われます！
            </Text>
            <View style={styles.finalStats}>
              <View style={styles.finalStat}>
                <Animated.Text
                  style={[
                    styles.finalStatIcon,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  💔
                </Animated.Text>
                <Text style={styles.finalStatLabel}>恋愛運</Text>
                <Animated.Text
                  style={[
                    styles.finalStatValue,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  -100%
                </Animated.Text>
              </View>
              <View style={styles.finalStat}>
                <Animated.Text
                  style={[
                    styles.finalStatIcon,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  😭
                </Animated.Text>
                <Text style={styles.finalStatLabel}>後悔度</Text>
                <Animated.Text
                  style={[
                    styles.finalStatValue,
                    {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  +1000%
                </Animated.Text>
              </View>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.finalPushButton}
                onPress={handlePurchase}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={styles.finalPushButtonText}>💸 運命を変える！今すぐ課金！ 💸</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* 情報セクション - グラスモーフィズム */}
        <Animated.View
          style={[
            styles.infoSection,
            {
              opacity: fadeAnim,
              transform: [{
                translateY: floatAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3]
                })
              }]
            }
          ]}
        >
          <Text style={styles.infoTitle}>💡 セールについて</Text>
          <Text style={styles.infoText}>
            このセールは期間限定の特別オファーです。お得な価格でプレミアム機能をお試しいただけます。
          </Text>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
  // 豪華なヘッダーセクション - グラスモーフィズム効果
  headerSection: {
    margin: 20,
    borderRadius: 32,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerGradient: {
    padding: 32,
    backgroundColor: 'rgba(102, 126, 234, 0.9)',
    backdropFilter: 'blur(20px)',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.95,
    lineHeight: 28,
    fontWeight: '500',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerStat: {
    alignItems: 'center',
  },
  headerStatNumber: {
    fontSize: 32,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerStatLabel: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // セールカード - ネオモーフィズム効果
  saleCardWrapper: {
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.6,
    shadowRadius: 35,
    elevation: 30,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  saleCard: {
    padding: 32,
    minHeight: 480,
    justifyContent: 'space-between',
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  urgencyText: {
    fontSize: 18,
    fontWeight: '900',
  },
  discountBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  discountText: {
    fontSize: 22,
    fontWeight: '900',
  },
  saleCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  saleTitle: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 0.5,
  },
  saleDescription: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.95,
    lineHeight: 32,
    fontWeight: '600',
  },
  priceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  originalPrice: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    opacity: 0.6,
    marginBottom: 12,
    fontWeight: '700',
  },
  salePrice: {
    fontSize: 32,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  featuresContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  featureText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '700',
  },
  endDateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  endDateText: {
    fontSize: 20,
    fontWeight: '800',
  },
  ctaButton: {
    borderRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  ctaButtonGradient: {
    paddingVertical: 24,
    paddingHorizontal: 36,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  ctaButtonText: {
    color: '#333',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  urgentButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 20,
    paddingHorizontal: 28,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  urgentButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 詳細情報 - グラスモーフィズム
  detailsSection: {
    margin: 20,
    marginTop: 0,
    padding: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  detailsTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  detailsText: {
    fontSize: 20,
    color: '#e0e0e0',
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  // 利用規約 - グラスモーフィズム
  termsSection: {
    margin: 20,
    marginTop: 0,
    padding: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  termsTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  termText: {
    fontSize: 20,
    color: '#e0e0e0',
    lineHeight: 32,
    marginBottom: 20,
    fontWeight: '500',
  },
  // 緊急購入セクション - 高度なシャドウ
  emergencySection: {
    margin: 20,
    marginTop: 0,
    borderRadius: 28,
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 35,
    elevation: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  emergencyGradient: {
    padding: 32,
    backgroundColor: '#ff4757',
  },
  emergencyTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  emergencySubtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.95,
    lineHeight: 30,
    fontWeight: '600',
  },
  emergencyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  emergencyStat: {
    alignItems: 'center',
  },
  emergencyStatNumber: {
    fontSize: 32,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  emergencyStatLabel: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emergencyButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  emergencyButtonText: {
    color: '#ff4757',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 超緊急セクション - ネオモーフィズム
  superEmergencySection: {
    margin: 20,
    marginTop: 0,
    borderRadius: 28,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 35,
    elevation: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  superEmergencyGradient: {
    padding: 32,
    backgroundColor: '#ff6b35',
  },
  superEmergencyTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  superEmergencySubtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.95,
    lineHeight: 30,
    fontWeight: '600',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  countdownText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  countdownSubtext: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: '600',
  },
  superEmergencyButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  superEmergencyButtonText: {
    color: '#ff6b35',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 心理的プレッシャーセクション - グラスモーフィズム
  psychologicalSection: {
    margin: 20,
    marginTop: 0,
    borderRadius: 28,
    shadowColor: '#00b4d8',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 35,
    elevation: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  psychologicalGradient: {
    padding: 32,
    backgroundColor: '#00b4d8',
  },
  psychologicalTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  psychologicalSubtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.95,
    lineHeight: 30,
    fontWeight: '600',
  },
  fomoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  fomoStat: {
    alignItems: 'center',
  },
  fomoStatNumber: {
    fontSize: 32,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  fomoStatLabel: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  psychologicalButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  psychologicalButtonText: {
    color: '#00b4d8',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 追加特典セクション - ネオモーフィズム
  extraBonusSection: {
    margin: 20,
    marginTop: 0,
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  extraBonusTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  extraBonusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  extraBonusItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  extraBonusIcon: {
    fontSize: 32,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  extraBonusText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  extraBonusDesc: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  // ボーナスセクション - ネオモーフィズム
  bonusSection: {
    margin: 20,
    marginTop: 0,
    padding: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  bonusTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  bonusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bonusItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  bonusIcon: {
    fontSize: 32,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bonusText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  // 最終煽りセクション - 高度なシャドウ
  finalPushSection: {
    margin: 20,
    marginTop: 0,
    borderRadius: 28,
    shadowColor: '#ff9e00',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.7,
    shadowRadius: 35,
    elevation: 25,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  finalPushGradient: {
    padding: 32,
    backgroundColor: '#ff9e00',
  },
  finalPushTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  finalPushSubtitle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.95,
    lineHeight: 30,
    fontWeight: '600',
  },
  finalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  finalStat: {
    alignItems: 'center',
  },
  finalStatIcon: {
    fontSize: 32,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  finalStatLabel: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  finalStatValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  finalPushButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  finalPushButtonText: {
    color: '#ff9e00',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // 情報セクション - グラスモーフィズム
  infoSection: {
    margin: 20,
    marginTop: 0,
    padding: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  infoTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 20,
    color: '#e0e0e0',
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SaleDetailScreen;

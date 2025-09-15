import { useLegalDocuments } from '@components/common';
import { AccountInfo } from '@components/settings/AccountInfo';
import { LikesHistoryButton } from '@components/settings/LikesHistoryButton';
import { LogoutButton } from '@components/settings/LogoutButton';
import { MembershipDisplay } from '@components/settings/mobile/MembershipDisplay.native';
import { RemainingStats } from '@components/settings/RemainingStats';
import { VerificationPrompt } from '@components/settings/VerificationPrompt';
import {
  CONTACT_SCREEN_PATH,
  getProfilePath,
  getSalesDetailPath,
  LIKES_HISTORY_SCREEN_PATH,
  MEMBERSHIP_REGISTRATION_SCREEN_PATH,
  NOTIFICATIONS_SCREEN_PATH,
  PURCHASE_BOOSTS_SCREEN_PATH,
  PURCHASE_LIKES_SCREEN_PATH,
  PURCHASE_POINTS_SCREEN_PATH,
  SALES_SCREEN_PATH,
  VERIFICATION_SCREEN_PATH
} from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { useStrictAuth } from '@hooks/auth';
import { useProfile } from '@hooks/profile';
import { logOut } from '@services/auth';
import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { getMembershipType } from '@utils/membershipUtils';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 設定画面コンポーネント - ユーザー設定とアプリ情報を管理
const SettingsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth(); // 認証済みユーザー情報を取得
  const { } = useAuth(); // 認証コンテキスト（状態のみ）
  const { profile, loading: profileLoading } = useProfile(user.uid); // プロフィール情報を取得
  const { showTerms, showPrivacy, Modal } = useLegalDocuments();

  // ブースト実行状態
  const [isBoosting, setIsBoosting] = useState(false);
  const [boostProgress, setBoostProgress] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  // アニメーション用の値
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const explosionAnim = useRef(new Animated.Value(0)).current;
  const explosionScale = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // デバッグ用のuseEffect
  useEffect(() => {
    // ログを削除
  }, [user, profile, profileLoading]);

  // 自分のプロフィール画面への遷移
  const handleUserProfilePress = () => {
    router.push(getProfilePath('my-user-id') as any);
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await logOut();
      // onAuthStateChangedでuser状態が更新され、自動的に認証画面にリダイレクトされます
    } catch (error: any) {
      console.error('ログアウトエラー:', error);
      // エラーハンドリングは必要に応じて追加
    }
  };


  // お問い合わせの表示
  const handleContact = () => {
    router.push(CONTACT_SCREEN_PATH as any);
  };

  // お知らせの表示
  const handleNotifications = () => {
    router.push(NOTIFICATIONS_SCREEN_PATH as any);
  };

  // 本人確認の開始
  const handleVerification = () => {
    router.push(VERIFICATION_SCREEN_PATH as any);
  };

  // セールのタップ処理
  const handleSalePress = (sale: any) => {
    if (sale && sale.id) {
      try {
        router.push(getSalesDetailPath(sale.id) as any);
      } catch (error) {
        console.error('遷移エラー:', error);
        // フォールバック: セール一覧画面に遷移
        router.push(SALES_SCREEN_PATH as any);
      }
    } else {
      console.error('セール情報が不正です:', sale);
    }
  };


  // 会員アップグレードの表示
  const handleUpgradePress = () => {
    router.push(MEMBERSHIP_REGISTRATION_SCREEN_PATH as any);
  };

  // いいね購入画面への遷移
  const handleLikesPurchase = () => {
    router.push(PURCHASE_LIKES_SCREEN_PATH as any);
  };

  // ブースト購入画面への遷移
  const handleBoostsPurchase = () => {
    router.push(PURCHASE_BOOSTS_SCREEN_PATH as any);
  };

  // ポイント購入画面への遷移
  const handlePointsPurchase = () => {
    router.push(PURCHASE_POINTS_SCREEN_PATH as any);
  };

  // いいね履歴画面への遷移
  const handleLikesHistory = () => {
    router.push(LIKES_HISTORY_SCREEN_PATH as any);
  };

  // ブースト実行処理
  const handleBoost = async () => {
    const remainingBoosts = profile?.remainingBoosts ?? 0;

    if (remainingBoosts <= 0) {
      Alert.alert(
        'ブースト不足',
        'ブーストが不足しています。ブーストを購入してください。',
        [
          { text: 'キャンセル', style: 'cancel' },
          { text: 'ブースト購入', onPress: handleBoostsPurchase }
        ]
      );
      return;
    }

    if (isBoosting) return; // ブースト中は実行不可

    Alert.alert(
      'ブースト実行',
      'ブーストを実行しますか？1時間有効になります。',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '実行する',
          onPress: () => executeBoost(),
        }
      ]
    );
  };

  // ブースト実行のアニメーション付き処理
  const executeBoost = async () => {
    try {
      setIsBoosting(true);
      setBoostProgress(0);

      // ハプティックフィードバック
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      // 派手なエフェクトアニメーション
      await startBoostAnimation();

      // ブースト実行のシミュレーション（3秒間）
      const duration = 3000;
      const interval = 100;
      const steps = duration / interval;
      const progressStep = 100 / steps;

      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, interval));
        setBoostProgress(i * progressStep);

        // 100%になったら爆発エフェクト
        if (i * progressStep >= 100) {
          await triggerExplosion();
        }
      }

      // 爆発エフェクトの完了を待つ
      while (isExploding) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      Alert.alert('🚀 ブースト実行完了！', '1時間有効でプロフィールが目立つようになりました。');

    } catch (error) {
      console.error('ブースト実行エラー:', error);
      Alert.alert('エラー', 'ブーストの実行中にエラーが発生しました。');
    } finally {
      setIsBoosting(false);
      setBoostProgress(0);
      resetAnimations();
    }
  };

  // ブーストアニメーション開始
  const startBoostAnimation = async () => {
    // 複数のアニメーションを並行実行
    const animations = [
      // スケールアニメーション（押下効果）
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),

      // 回転アニメーション
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        { iterations: 3 }
      ),

      // パルスアニメーション
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 6 }
      ),

      // スパークルアニメーション
      Animated.loop(
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        { iterations: 15 }
      ),
    ];

    return Promise.all(animations);
  };

  // 爆発エフェクト
  const triggerExplosion = async () => {
    setIsExploding(true);

    // 超派手な爆発アニメーション
    Animated.parallel([
      // フェードイン
      Animated.timing(explosionAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      // スケール爆発（複数段階）
      Animated.sequence([
        Animated.timing(explosionScale, {
          toValue: 2.0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(explosionScale, {
          toValue: 3.0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(explosionScale, {
          toValue: 4.0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(explosionScale, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // 画面全体の震えエフェクト
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 超派手なハプティックフィードバック（連続爆発）
    for (let i = 0; i < 5; i++) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await new Promise(resolve => setTimeout(resolve, 50));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // 最終的な成功フィードバック
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 爆発エフェクトの完了を待つ
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsExploding(false);
  };

  // アニメーションリセット
  const resetAnimations = () => {
    scaleAnim.setValue(1);
    rotateAnim.setValue(0);
    pulseAnim.setValue(1);
    sparkleAnim.setValue(0);
    explosionAnim.setValue(0);
    explosionScale.setValue(0);
    shakeAnim.setValue(0);
  };

  // アカウント削除処理
  const handleDeleteAccount = () => {
    Alert.alert(
      'アカウント削除',
      'アカウントを削除すると、すべてのデータが永久に失われます。この操作は取り消せません。本当に削除しますか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            // 実際の削除処理を実装
            Alert.alert('削除完了', 'アカウントが削除されました。');
            // ログアウト処理も実行
            logOut();
          },
        },
      ]
    );
  };

  // 推奨画面への遷移
  const handleRecommendations = () => {
    try {
      // 相対パスでの遷移を試行
      router.push('../../recommendations' as any);
    } catch (error: any) {
      // フォールバック: 絶対パスで試行
      try {
        router.push('/(main)/recommendations' as any);
      } catch (fallbackError: any) {
        // 最後のフォールバック: ルートからの相対パス
        try {
          router.push('../../../recommendations' as any);
        } catch (finalError: any) {
          console.error('推奨画面への遷移でエラーが発生しました:', finalError);
        }
      }
    }
  };

  // タグリスト画面への遷移
  const handleTagsList = () => {
    try {
      router.push('/(main)/tags' as any);
    } catch (error: any) {
      console.error('タグリスト画面への遷移でエラーが発生しました:', error);
    }
  };

  return (
    <SafeAreaView style={SettingsStyles.safeArea} edges={['top']}>
      <Animated.View
        style={[
          { flex: 1 },
          {
            transform: [
              {
                translateX: shakeAnim.interpolate({
                  inputRange: [-1, 1],
                  outputRange: [-10, 10],
                }),
              },
            ],
          },
        ]}
      >
        {/* 画面全体の爆発エフェクト */}
        {boostProgress >= 100 && (
          <Animated.View
            style={[
              SettingsStyles.fullScreenExplosionContainer,
              {
                opacity: explosionAnim,
                transform: [
                  { scale: explosionScale }
                ]
              }
            ]}
          >
            {/* 中央の大爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '50%', left: '50%', fontSize: 80 }]}>💥</Text>
            <Text style={[SettingsStyles.explosionText, { top: '50%', left: '50%', fontSize: 70 }]}>🌟</Text>

            {/* 画面全体に飛び散る爆発エフェクト */}
            <Text style={[SettingsStyles.explosionText, { top: '10%', left: '10%', fontSize: 50 }]}>✨</Text>
            <Text style={[SettingsStyles.explosionText, { top: '20%', right: '10%', fontSize: 50 }]}>🎆</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '20%', left: '10%', fontSize: 50 }]}>⭐</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '10%', right: '10%', fontSize: 50 }]}>💫</Text>

            {/* 画面の端まで飛び散る爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '5%', left: '5%', fontSize: 60 }]}>⚡</Text>
            <Text style={[SettingsStyles.explosionText, { top: '5%', right: '5%', fontSize: 60 }]}>🔥</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '5%', left: '5%', fontSize: 60 }]}>💎</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '5%', right: '5%', fontSize: 60 }]}>🎇</Text>

            {/* 画面の中央周辺の爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '30%', left: '30%', fontSize: 45 }]}>💫</Text>
            <Text style={[SettingsStyles.explosionText, { top: '30%', right: '30%', fontSize: 45 }]}>✨</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '30%', left: '30%', fontSize: 45 }]}>⭐</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '30%', right: '30%', fontSize: 45 }]}>🌟</Text>

            {/* 画面の四辺の爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '50%', left: '5%', fontSize: 55 }]}>💥</Text>
            <Text style={[SettingsStyles.explosionText, { top: '50%', right: '5%', fontSize: 55 }]}>💥</Text>
            <Text style={[SettingsStyles.explosionText, { top: '5%', left: '50%', fontSize: 55 }]}>💥</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '5%', left: '50%', fontSize: 55 }]}>💥</Text>

            {/* 画面の対角線上の爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '15%', left: '15%', fontSize: 40 }]}>🎆</Text>
            <Text style={[SettingsStyles.explosionText, { top: '15%', right: '15%', fontSize: 40 }]}>🎆</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '15%', left: '15%', fontSize: 40 }]}>🎆</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '15%', right: '15%', fontSize: 40 }]}>🎆</Text>

            {/* 画面の中央線上の爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '25%', left: '25%', fontSize: 35 }]}>✨</Text>
            <Text style={[SettingsStyles.explosionText, { top: '25%', right: '25%', fontSize: 35 }]}>✨</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '25%', left: '25%', fontSize: 35 }]}>✨</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '25%', right: '25%', fontSize: 35 }]}>✨</Text>

            {/* 画面の端の追加爆発 */}
            <Text style={[SettingsStyles.explosionText, { top: '0%', left: '0%', fontSize: 30 }]}>⭐</Text>
            <Text style={[SettingsStyles.explosionText, { top: '0%', right: '0%', fontSize: 30 }]}>⭐</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '0%', left: '0%', fontSize: 30 }]}>⭐</Text>
            <Text style={[SettingsStyles.explosionText, { bottom: '0%', right: '0%', fontSize: 30 }]}>⭐</Text>
          </Animated.View>
        )}

        <ScrollView
          style={[SettingsStyles.container, { paddingHorizontal: 0 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* アカウント情報セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>アカウント</Text>

            {/* ユーザー情報カード */}
            <AccountInfo
              authUser={user}
              profile={profile || undefined}
              onPress={handleUserProfilePress}
            />
          </View>


          {/* 本人確認プロンプト（未認証ユーザーのみ表示） */}
          {profile?.isVerified === false && (
            <VerificationPrompt onPress={handleVerification} />
          )}

          {/* 会員種別セクション */}
          <View style={SettingsStyles.section}>
            <MembershipDisplay
              membershipType={getMembershipType(profile || undefined)}
              onUpgradePress={handleUpgradePress}
            />
          </View>

          {/* ブースト実行セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>🚀 ブースト実行</Text>

            <Animated.View
              style={[
                {
                  transform: [
                    { scale: Animated.multiply(scaleAnim, pulseAnim) },
                    {
                      rotate: rotateAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  SettingsStyles.boostButton,
                  (profile?.remainingBoosts ?? 0) <= 0 && SettingsStyles.boostButtonDisabled,
                  isBoosting && SettingsStyles.boostButtonBoosting
                ]}
                onPress={handleBoost}
                disabled={(profile?.remainingBoosts ?? 0) <= 0 || isBoosting}
                activeOpacity={0.8}
              >
                <View style={SettingsStyles.boostButtonContent}>
                  <View style={SettingsStyles.boostIconContainer}>
                    <Animated.Text
                      style={[
                        SettingsStyles.boostIcon,
                        {
                          transform: [
                            {
                              scale: sparkleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.3],
                              })
                            }
                          ]
                        }
                      ]}
                    >
                      {isBoosting ? '⚡' : '🚀'}
                    </Animated.Text>
                  </View>
                  <View style={SettingsStyles.boostTextContainer}>
                    <Text style={[
                      SettingsStyles.boostButtonTitle,
                      (profile?.remainingBoosts ?? 0) <= 0 && SettingsStyles.boostButtonTitleDisabled,
                      isBoosting && SettingsStyles.boostButtonTitleBoosting
                    ]}>
                      {isBoosting
                        ? `ブースト実行中... ${Math.round(boostProgress)}%`
                        : (profile?.remainingBoosts ?? 0) > 0
                          ? 'ブーストを実行'
                          : 'ブーストが不足しています'
                      }
                    </Text>
                    <Text style={[
                      SettingsStyles.boostButtonSubtitle,
                      (profile?.remainingBoosts ?? 0) <= 0 && SettingsStyles.boostButtonSubtitleDisabled,
                      isBoosting && SettingsStyles.boostButtonSubtitleBoosting
                    ]}>
                      {isBoosting
                        ? 'プロフィールを目立たせています...'
                        : (profile?.remainingBoosts ?? 0) > 0
                          ? '1時間有効でプロフィールを目立たせる'
                          : 'ブーストを購入して実行しよう'
                      }
                    </Text>
                  </View>
                  <View style={SettingsStyles.boostArrowContainer}>
                    <Text style={[
                      SettingsStyles.boostArrow,
                      (profile?.remainingBoosts ?? 0) <= 0 && SettingsStyles.boostArrowDisabled,
                      isBoosting && SettingsStyles.boostArrowBoosting
                    ]}>
                      {isBoosting ? '⚡' : '›'}
                    </Text>
                  </View>
                </View>

                {/* プログレスバー（ブースト中のみ表示） */}
                {isBoosting && (
                  <View style={SettingsStyles.boostProgressContainer}>
                    <View style={SettingsStyles.boostProgressBar}>
                      <Animated.View
                        style={[
                          SettingsStyles.boostProgressFill,
                          {
                            width: `${boostProgress}%`
                          }
                        ]}
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* 残り数量セクション */}
          <RemainingStats
            remainingLikes={profile?.remainingLikes ?? 10}
            remainingBoosts={profile?.remainingBoosts ?? 5}
            remainingPoints={profile?.remainingPoints ?? 100}
            onLikesPress={handleLikesPurchase}
            onBoostsPress={handleBoostsPurchase}
            onPointsPress={handlePointsPurchase}
          />

          {/* 推奨画面への導線セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>💫 今日のオススメ</Text>

            {/* 推奨画面への導線カード */}
            <TouchableOpacity style={SettingsStyles.recommendationsCard} onPress={handleRecommendations}>
              <View style={SettingsStyles.recommendationsContent}>
                <View style={SettingsStyles.recommendationsIconContainer}>
                  <Text style={SettingsStyles.recommendationsIcon}>🎯</Text>
                </View>
                <View style={SettingsStyles.recommendationsTextContainer}>
                  <Text style={SettingsStyles.recommendationsTitle}>新しい出会いを見つけよう</Text>
                  <Text style={SettingsStyles.recommendationsSubtitle}>あなたに合うユーザーをAIが厳選</Text>
                </View>
                <Text style={SettingsStyles.recommendationsArrow}>›</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* タグ管理セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>🏷️ タグ管理</Text>

            {/* タグリストへの導線カード */}
            <TouchableOpacity style={SettingsStyles.recommendationsCard} onPress={handleTagsList}>
              <View style={SettingsStyles.recommendationsContent}>
                <View style={SettingsStyles.recommendationsIconContainer}>
                  <Text style={SettingsStyles.recommendationsIcon}>🏷️</Text>
                </View>
                <View style={SettingsStyles.recommendationsTextContainer}>
                  <Text style={SettingsStyles.recommendationsTitle}>タグを探す・追加する</Text>
                  <Text style={SettingsStyles.recommendationsSubtitle}>興味のあるタグを見つけてプロフィールに追加</Text>
                </View>
                <Text style={SettingsStyles.recommendationsArrow}>›</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* セールカルーセル - 非活性 */}
          {/* <SalesCarousel onSalePress={handleSalePress} /> */}

          {/* セール詳細セクション - 非活性 */}
          {/* <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>セール情報</Text>
            <TouchableOpacity style={SettingsStyles.button} onPress={handleSalesDetail}>
              <Text style={SettingsStyles.buttonText}>セール詳細</Text>
              <Text style={SettingsStyles.buttonArrow}>›</Text>
            </TouchableOpacity>
          </View> */}

          {/* いいね履歴セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>いいね履歴</Text>
            <LikesHistoryButton onPress={handleLikesHistory} />
          </View>

          {/* お知らせセクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>お知らせ</Text>

            {/* お知らせへのリンク */}
            <TouchableOpacity style={SettingsStyles.button} onPress={handleNotifications}>
              <Text style={SettingsStyles.buttonText}>お知らせ</Text>
              <Text style={SettingsStyles.buttonArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* アプリ情報セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>アプリ情報</Text>

            {/* バージョン情報 */}
            <View style={SettingsStyles.infoItem}>
              <Text style={SettingsStyles.infoLabel}>バージョン</Text>
              <Text style={SettingsStyles.infoValue}>1.0.0</Text>
            </View>

            {/* ビルド番号 */}
            <View style={SettingsStyles.infoItem}>
              <Text style={SettingsStyles.infoLabel}>ビルド番号</Text>
              <Text style={SettingsStyles.infoValue}>1</Text>
            </View>
          </View>

          {/* その他の設定セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>その他</Text>

            {/* プライバシーポリシーへのリンク */}
            <TouchableOpacity style={SettingsStyles.button} onPress={showPrivacy}>
              <Text style={SettingsStyles.buttonText}>プライバシーポリシー</Text>
              <Text style={SettingsStyles.buttonArrow}>›</Text>
            </TouchableOpacity>

            {/* 利用規約へのリンク */}
            <TouchableOpacity style={SettingsStyles.button} onPress={showTerms}>
              <Text style={SettingsStyles.buttonText}>利用規約</Text>
              <Text style={SettingsStyles.buttonArrow}>›</Text>
            </TouchableOpacity>

            {/* お問い合わせへのリンク */}
            <TouchableOpacity style={SettingsStyles.button} onPress={handleContact}>
              <Text style={SettingsStyles.buttonText}>お問い合わせ</Text>
              <Text style={SettingsStyles.buttonArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* アカウント管理セクション */}
          <View style={SettingsStyles.section}>
            <Text style={SettingsStyles.sectionTitle}>アカウント管理</Text>

            {/* ログアウトボタン */}
            <LogoutButton loading={false} onLogout={handleLogout} />

            {/* スペーサー */}
            <View style={{ height: 24 }} />

            {/* アカウント削除ボタン */}
            <TouchableOpacity
              style={[SettingsStyles.button, SettingsStyles.dangerButton, { justifyContent: 'center' }]}
              onPress={handleDeleteAccount}
              activeOpacity={0.7}
            >
              <Text style={[SettingsStyles.buttonText, SettingsStyles.dangerButtonText]}>
                アカウントを削除
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>

      <Modal />
    </SafeAreaView>
  );
};

export default SettingsScreen;

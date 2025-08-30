import { AccountInfo } from '@components/settings/AccountInfo';
import { LikesHistoryButton } from '@components/settings/LikesHistoryButton';
import { LogoutButton } from '@components/settings/LogoutButton';
import { MembershipDisplay } from '@components/settings/MembershipDisplay';
import { RemainingStats } from '@components/settings/RemainingStats';
import { SalesCarousel } from '@components/settings/SalesCarousel';
import { VerificationPrompt } from '@components/settings/VerificationPrompt';
import {
  CONTACT_SCREEN_PATH,
  getProfilePath,
  getSalesDetailPath,
  LIKES_HISTORY_SCREEN_PATH,
  MEMBERSHIP_REGISTRATION_SCREEN_PATH,
  NOTIFICATIONS_SCREEN_PATH,
  PRIVACY_POLICY_SCREEN_PATH,
  PURCHASE_BOOSTS_SCREEN_PATH,
  PURCHASE_LIKES_SCREEN_PATH,
  PURCHASE_POINTS_SCREEN_PATH,
  SALES_SCREEN_PATH,
  VERIFICATION_SCREEN_PATH
} from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 設定画面コンポーネント - ユーザー設定とアプリ情報を管理
const SettingsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth(); // 認証済みユーザー情報を取得
  const { logout, loading } = useAuth(); // 認証コンテキストからログアウト機能を取得
  const { profile, loading: profileLoading } = useProfile(user.uid); // プロフィール情報を取得

  // デバッグ用のuseEffect
  useEffect(() => {
    console.log('🎯 SettingsScreen マウント完了');
    console.log('🎯 user:', user);
    console.log('🎯 profile:', profile);
    console.log('🎯 profileLoading:', profileLoading);
  }, [user, profile, profileLoading]);

  // 自分のプロフィール画面への遷移
  const handleUserProfilePress = () => {
    console.log('🎯 プロフィール画面への遷移');
    router.push(getProfilePath('my-user-id') as any);
  };

  // ログアウト処理
  const handleLogout = async () => {
    console.log('🎯 ログアウト処理開始');
    await logout();
    // ログアウト後は認証画面に自動的にリダイレクトされます
  };

  // プライバシーポリシーの表示
  const handlePrivacyPolicy = () => {
    console.log('🎯 プライバシーポリシー画面への遷移');
    router.push(PRIVACY_POLICY_SCREEN_PATH as any);
  };

  // 利用規約の表示
  const handleTermsOfService = () => {
    console.log('🎯 利用規約画面への遷移');
    router.push(PRIVACY_POLICY_SCREEN_PATH as any);
  };

  // お問い合わせの表示
  const handleContact = () => {
    console.log('🎯 お問い合わせ画面への遷移');
    router.push(CONTACT_SCREEN_PATH as any);
  };

  // お知らせの表示
  const handleNotifications = () => {
    console.log('🎯 お知らせ画面への遷移');
    router.push(NOTIFICATIONS_SCREEN_PATH as any);
  };

  // 本人確認の開始
  const handleVerification = () => {
    console.log('🎯 本人確認画面への遷移');
    router.push(VERIFICATION_SCREEN_PATH as any);
  };

  // セールのタップ処理
  const handleSalePress = (sale: any) => {
    console.log('🎯 セールがタップされました:', sale);
    if (sale && sale.id) {
      try {
        router.push(getSalesDetailPath(sale.id) as any);
      } catch (error) {
        console.error('🎯 遷移エラー:', error);
        // フォールバック: セール一覧画面に遷移
        router.push(SALES_SCREEN_PATH as any);
      }
    } else {
      console.error('🎯 セール情報が不正です:', sale);
    }
  };

  // セール詳細画面への遷移
  const handleSalesDetail = () => {
    console.log('🎯 セール詳細画面への遷移を開始します');
    router.push(SALES_SCREEN_PATH as any);
  };

  // 会員アップグレードの表示
  const handleUpgradePress = () => {
    console.log('🎯 会員アップグレードをタップしました');
    router.push(MEMBERSHIP_REGISTRATION_SCREEN_PATH as any);
  };

  // いいね購入画面への遷移
  const handleLikesPurchase = () => {
    console.log('🎯 いいね購入画面への遷移を開始します');
    router.push(PURCHASE_LIKES_SCREEN_PATH as any);
  };

  // ブースト購入画面への遷移
  const handleBoostsPurchase = () => {
    console.log('🎯 ブースト購入画面への遷移を開始します');
    router.push(PURCHASE_BOOSTS_SCREEN_PATH as any);
  };

  // ポイント購入画面への遷移
  const handlePointsPurchase = () => {
    console.log('🎯 ポイント購入画面への遷移を開始します');
    router.push(PURCHASE_POINTS_SCREEN_PATH as any);
  };

  // いいね履歴画面への遷移
  const handleLikesHistory = () => {
    console.log('🎯 いいね履歴画面への遷移を開始します');
    router.push(LIKES_HISTORY_SCREEN_PATH as any);
  };

  console.log('🎯 SettingsScreen レンダリング開始');

  return (
    <SafeAreaView style={SettingsStyles.safeArea}>
      {/* テスト用の赤いテキストを追加 */}
      <View style={{ padding: 20, backgroundColor: 'red' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          🎯 設定画面が表示されています！
        </Text>
      </View>

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

        {/* 会員種別セクション */}
        <View style={SettingsStyles.section}>
          <MembershipDisplay
            membershipType="free"
            onUpgradePress={handleUpgradePress}
          />
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

        {/* 本人確認プロンプト（未認証ユーザーのみ表示） */}
        {profile?.isVerified === false && (
          <VerificationPrompt onPress={handleVerification} />
        )}

        {/* セールカルーセル */}
        <SalesCarousel onSalePress={handleSalePress} />

        {/* セール詳細セクション */}
        <View style={SettingsStyles.section}>
          <Text style={SettingsStyles.sectionTitle}>セール情報</Text>
          <TouchableOpacity style={SettingsStyles.button} onPress={handleSalesDetail}>
            <Text style={SettingsStyles.buttonText}>セール詳細</Text>
            <Text style={SettingsStyles.buttonArrow}>›</Text>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity style={SettingsStyles.button} onPress={handlePrivacyPolicy}>
            <Text style={SettingsStyles.buttonText}>プライバシーポリシー</Text>
            <Text style={SettingsStyles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* 利用規約へのリンク */}
          <TouchableOpacity style={SettingsStyles.button} onPress={handleTermsOfService}>
            <Text style={SettingsStyles.buttonText}>利用規約</Text>
            <Text style={SettingsStyles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* お問い合わせへのリンク */}
          <TouchableOpacity style={SettingsStyles.button} onPress={handleContact}>
            <Text style={SettingsStyles.buttonText}>お問い合わせ</Text>
            <Text style={SettingsStyles.buttonArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ログアウトセクション */}
        <View style={SettingsStyles.section}>
          {/* ログアウトボタン */}
          <LogoutButton loading={loading} onLogout={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

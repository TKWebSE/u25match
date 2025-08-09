import CustomHeader from '@components/common/CustomHeader';
import { AccountInfo } from '@components/settings/AccountInfo';
import { LogoutButton } from '@components/settings/LogoutButton';
import { SalesCarousel } from '@components/settings/SalesCarousel';
import { VerificationPrompt } from '@components/settings/VerificationPrompt';
import { useAuth } from '@contexts/AuthContext';
import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 設定画面コンポーネント - ユーザー設定とアプリ情報を管理
const SettingsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth(); // 認証済みユーザー情報を取得
  const { logout, loading } = useAuth(); // 認証コンテキストからログアウト機能を取得
  const { profile, loading: profileLoading } = useProfile(user.uid); // プロフィール情報を取得

  // 自分のプロフィール画面への遷移
  const handleUserProfilePress = () => {
    router.push(`/(main)/profile/my-user-id`);
  };

  // ログアウト処理
  const handleLogout = async () => {
    await logout();
    // ログアウト後は認証画面に自動的にリダイレクトされます
  };

  // プライバシーポリシーの表示
  const handlePrivacyPolicy = () => {
    router.push('/(main)/privacy-policy');
  };

  // 利用規約の表示
  const handleTermsOfService = () => {
    router.push('/(main)/terms-of-service');
  };

  // お問い合わせの表示
  const handleContact = () => {
    router.push('/(main)/contact');
  };

  // お知らせの表示
  const handleNotifications = () => {
    router.push('/(main)/notifications');
  };

  // 本人確認の開始
  const handleVerification = () => {
    router.push('/(main)/verification');
  };

  // セールのタップ処理
  const handleSalePress = (sale: any) => {
    console.log('セールがタップされました:', sale);
    if (sale && sale.id) {
      try {
        router.push(`/(main)/sales/${sale.id}`);
      } catch (error) {
        console.error('遷移エラー:', error);
        // フォールバック: セール一覧画面に遷移
        router.push('/(main)/sales');
      }
    } else {
      console.error('セール情報が不正です:', sale);
    }
  };

  // セール詳細画面への遷移
  const handleSalesDetail = () => {
    console.log('セール詳細画面への遷移を開始します');
    router.push('/(main)/sales');
  };

  return (
    <SafeAreaView style={SettingsStyles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="設定" />

      <ScrollView style={SettingsStyles.container} showsVerticalScrollIndicator={false}>
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

import CustomHeader from '@components/common/CustomHeader';
import { AccountInfo } from '@components/settings/AccountInfo';
import { LogoutButton } from '@components/settings/LogoutButton';
import { VerificationPrompt } from '@components/settings/VerificationPrompt';
import { useAuth } from '@contexts/AuthContext';
import { useProfile } from '@hooks/useProfile';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 設定画面コンポーネント - ユーザー設定とアプリ情報を管理
const SettingsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth(); // 認証済みユーザー情報を取得
  const { logout, loading } = useAuth(); // 認証コンテキストからログアウト機能を取得
  const { profile, loading: profileLoading } = useProfile(user.uid); // プロフィール情報を取得

  // プロフィール詳細画面への遷移
  const handleProfilePress = () => {
    router.push(`/(main)/profile/${user.uid}`);
  };

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
    Alert.alert(
      'プライバシーポリシー',
      'プライバシーポリシーは現在準備中です。',
      [{ text: 'OK' }]
    );
  };

  // 利用規約の表示
  const handleTermsOfService = () => {
    Alert.alert(
      '利用規約',
      '利用規約は現在準備中です。',
      [{ text: 'OK' }]
    );
  };

  // お問い合わせの表示
  const handleContact = () => {
    Alert.alert(
      'お問い合わせ',
      'お問い合わせは現在準備中です。\nサポートにお問い合わせください。',
      [{ text: 'OK' }]
    );
  };

  // 本人確認の開始
  const handleVerification = () => {
    router.push('/(main)/verification');
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

          {/* プロフィール詳細へのリンク */}
          <TouchableOpacity style={SettingsStyles.button} onPress={handleProfilePress}>
            <Text style={SettingsStyles.buttonText}>プロフィール詳細</Text>
            <Text style={SettingsStyles.buttonArrow}>›</Text>
          </TouchableOpacity>

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

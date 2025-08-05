import CustomHeader from '@components/common/CustomHeader';
import { useAuth } from '@contexts/AuthContext';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 設定画面コンポーネント - ユーザー設定とアプリ情報を管理
const SettingsScreen = () => {
  const router = useRouter();
  const user = useStrictAuth(); // 認証済みユーザー情報を取得
  const { logout, loading } = useAuth(); // 認証コンテキストからログアウト機能を取得

  // プロフィール詳細画面への遷移
  const handleProfilePress = () => {
    router.push(`/(main)/profile/${user.uid}`);
  };

  // ログアウト処理
  const handleLogout = async () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしますか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'ログアウト',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              showSuccessToast('ログアウトしました');
              // ログアウト後は認証画面に自動的にリダイレクトされます
            } catch (error) {
              console.error('ログアウトエラー:', error);
              showErrorToast('ログアウトに失敗しました');
            }
          },
        },
      ]
    );
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="設定" />

      <View style={styles.container}>
        {/* アカウント情報セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アカウント</Text>

          {/* ユーザー情報カード */}
          <View style={styles.userInfo}>
            {/* アバター */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            {/* ユーザー詳細情報 */}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.displayName || 'ユーザー'}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* アプリ情報セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>アプリ情報</Text>

          {/* バージョン情報 */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>バージョン</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          {/* ビルド番号 */}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ビルド番号</Text>
            <Text style={styles.infoValue}>1</Text>
          </View>
        </View>

        {/* その他の設定セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>その他</Text>

          {/* プロフィール詳細へのリンク */}
          <TouchableOpacity style={styles.button} onPress={handleProfilePress}>
            <Text style={styles.buttonText}>プロフィール詳細</Text>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* プライバシーポリシーへのリンク */}
          <TouchableOpacity style={styles.button} onPress={handlePrivacyPolicy}>
            <Text style={styles.buttonText}>プライバシーポリシー</Text>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* 利用規約へのリンク */}
          <TouchableOpacity style={styles.button} onPress={handleTermsOfService}>
            <Text style={styles.buttonText}>利用規約</Text>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>

          {/* お問い合わせへのリンク */}
          <TouchableOpacity style={styles.button} onPress={handleContact}>
            <Text style={styles.buttonText}>お問い合わせ</Text>
            <Text style={styles.buttonArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ログアウトセクション */}
        <View style={styles.section}>
          {/* ログアウトボタン */}
          <TouchableOpacity
            style={[styles.logoutButton, loading && styles.logoutButtonDisabled]}
            onPress={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.logoutButtonText}>ログアウト</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// スタイル定義
const styles = StyleSheet.create({
  // セーフエリア
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  // メインコンテナ
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  // セクション
  section: {
    marginBottom: 30,
  },
  // セクションタイトル
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  // ユーザー情報カード
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // アバター
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  // アバターテキスト
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // ユーザー詳細情報
  userDetails: {
    flex: 1,
  },
  // ユーザー名
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  // ユーザーメール
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  // 情報アイテム
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // 情報ラベル
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  // 情報値
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  // ボタン
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // ボタンテキスト
  buttonText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  // ボタン矢印
  buttonArrow: {
    fontSize: 18,
    color: '#ccc',
    fontWeight: 'bold',
  },
  // ログアウトボタン
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  // ログアウトボタン無効状態
  logoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  // ログアウトボタンテキスト
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default SettingsScreen; 

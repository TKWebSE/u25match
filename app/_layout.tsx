// app/_layout.tsx
// アプリのルートレイアウト - 認証状態の管理とナビゲーション制御
import { AuthProvider, useAuth } from '@contexts/AuthContext';
import { defaultConfig } from '@tamagui/config/v4';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { Slot, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import EntryScreen from './(auth)/entryScreen';

// Tamagui設定の作成
const config = createTamagui(defaultConfig)

type Conf = typeof config

// make imports typed
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

// 認証ゲートコンポーネント - 認証状態に基づいて画面を制御
function AuthGate() {
  const { user, loading, error } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // 認証状態の変更を監視し、適切な画面にリダイレクト
  useEffect(() => {
    console.log('🔐 AuthGate: 認証状態変更', {
      user: user ? { uid: user.uid, email: user.email } : null,
      loading,
      pathname
    });

    // 認証済みユーザーがルートにいる場合はメイン画面にリダイレクト
    if (!loading && user && pathname === '/') {
      console.log('🔐 AuthGate: 認証済みユーザーをメイン画面にリダイレクト');
      router.replace('/(main)/(home)/(tabs)/(explore)');
    }
  }, [user, loading, pathname, router]);

  // ローディング中 - 認証状態の確認中
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>認証状態を確認中...</Text>
      </View>
    );
  }

  // エラーが発生した場合 - 認証エラーの表示
  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>認証エラーが発生しました</Text>
        <Text style={styles.errorDetail}>{error}</Text>
      </View>
    );
  }

  console.log('🔐 AuthGate: 現在の状態', {
    user: user ? { uid: user.uid, email: user.email } : null,
    pathname
  });

  // 未認証の場合 - 認証が必要な画面へのアクセス制御
  if (!user) {
    // 認証関連の画面はそのまま表示（ログイン、サインアップ、エントリー画面）
    if (pathname === '/' ||
      pathname === '/(auth)/loginScreen' ||
      pathname === '/(auth)/signUpScreen') {
      return <Slot />;
    }
    // その他の画面はエントリー画面にリダイレクト
    return <EntryScreen />;
  }

  // 認証済みの場合 - メインアプリの表示
  return <Slot />;
}

// ルートレイアウトコンポーネント - アプリ全体の構造を定義
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <AuthProvider>
          <View style={styles.container}>
            <View style={styles.content}>
              <AuthGate />
              <Toast />
            </View>
          </View>
        </AuthProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  content: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

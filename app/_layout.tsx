// app/_layout.tsx
// アプリのルートレイアウト - アプリ全体の構造を定義
import { LoadingScreen } from '@components/common';
import { AuthProvider } from '@contexts/AuthContext';
import { DrawerProvider } from '@contexts/DrawerContext';
import { cleanupAuth, initializeAuth } from '@stores/authInitializer';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// 初期化ゲートコンポーネント - アプリ起動時の初期化処理
function InitializationGate() {
  const [isInitializing, setIsInitializing] = useState(true);

  // アプリ起動時の初期化制御
  useEffect(() => {
    // Firebase認証状態の監視を開始
    const unsubscribeAuth = initializeAuth();

    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100); // 最低限の初期化時間

    return () => {
      clearTimeout(timer);
      cleanupAuth(unsubscribeAuth); // 認証監視をクリーンアップ
    };
  }, []);

  // 初期化中の表示
  if (isInitializing) {
    return <LoadingScreen message="アプリを起動中..." />;
  }

  // 通常の画面表示
  return <Slot />;
}

// ルートレイアウトコンポーネント - アプリ全体の構造を定義
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DrawerProvider>
          <AuthProvider>
            <InitializationGate />
            <Toast />
          </AuthProvider>
        </DrawerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


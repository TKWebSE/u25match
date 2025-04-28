// app/(auth)/_layout.tsx
// 認証関連画面の共通レイアウト - ログイン済みユーザーのリダイレクト処理を含む
import { LoadingScreen } from '@components/common';
import { EXPLORE_SCREEN_PATH } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();

  // ユーザーがログイン済みの場合はメイン画面にリダイレクト
  useEffect(() => {
    if (user) {
      router.replace(EXPLORE_SCREEN_PATH as any);
    }
  }, [user, router]);

  // 認証済みユーザーのリダイレクト中はローディング表示
  if (user) {
    return <LoadingScreen message="メイン画面に移動中..." />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="entry" />
      <Stack.Screen name="login" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}


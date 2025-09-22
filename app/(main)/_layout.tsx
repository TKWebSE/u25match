// (main)/_layout.tsx
// メインレイアウト - 認証が必要な画面の制御
import { LoadingScreen } from '@components/common';
import { ENTRY_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { PlatformLayout } from '../../src/layouts'; // 正しいパスに修正

export default function MainLayout() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  console.log('mainのレイアウトpathnameは：', pathname);

  // 未認証の場合はエントリー画面にリダイレクト
  useEffect(() => {
    if (!user) {
      console.log('🔐 MainLayout: 未認証ユーザーをエントリー画面にリダイレクト');
      router.replace(ENTRY_SCREEN_PATH as any);
    }
  }, [user, router]);

  // 未認証の場合はローディング表示（リダイレクト中）
  if (!user) {
    return <LoadingScreen message="認証確認中..." />;
  }

  return (
    <PlatformLayout> {/* PlatformLayoutでラップ */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="recommendations/index" />
        <Stack.Screen name="profile/detail/[uid]" />
        <Stack.Screen name="profile/edit/index" />
        <Stack.Screen name="chat/[chatId]" />
        <Stack.Screen name="sales/[id]" />
      </Stack>
    </PlatformLayout>
  );
}



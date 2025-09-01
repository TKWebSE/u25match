// (main)/_layout.tsx
import { Stack, usePathname } from 'expo-router';
import { PlatformLayout } from '../../src/layouts'; // 正しいパスに修正

export default function MainLayout() {
  const pathname = usePathname();
  console.log('mainのレイアウトpathnameは：', pathname);
  return (
    <PlatformLayout> {/* PlatformLayoutでラップ */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="recommendations" />
        <Stack.Screen name="profile/detail/[uid]" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="chat/[chatId]" />
        <Stack.Screen name="sales/[id]" />
      </Stack>
    </PlatformLayout>
  );
} 

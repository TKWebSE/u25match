import { Stack } from 'expo-router';
import { PlatformLayout } from '../../src/layouts'; // 正しいパスに修正

export default function MainLayout() {
  return (
    <PlatformLayout> {/* PlatformLayoutでラップ */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="profile/[uid]" />
        <Stack.Screen name="profile/edit" />
        <Stack.Screen name="chat/[chatId]" />
      </Stack>
    </PlatformLayout>
  );
} 

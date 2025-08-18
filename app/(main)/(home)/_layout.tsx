import { isWeb } from '@utils/platform';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  if (isWeb) {
    // Web版: web-screensディレクトリを使用
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(web-screens)" />
      </Stack>
    );
  }

  // モバイル版: 従来のtabsディレクトリを使用
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
} 

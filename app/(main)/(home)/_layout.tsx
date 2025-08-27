import { Stack } from 'expo-router';

export default function HomeLayout() {
  // Webでもモバイルでも同じtabsディレクトリを使用
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
} 

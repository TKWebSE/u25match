import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="profile/[uid]" />
      <Stack.Screen name="profile/edit" />
    </Stack>
  );
} 

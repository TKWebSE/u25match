import { Stack } from 'expo-router';

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[uid]"
        options={{
          presentation: 'modal',
          title: 'プロフィール',
        }}
      />
    </Stack>
  );
}

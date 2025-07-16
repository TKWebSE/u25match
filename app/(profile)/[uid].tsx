import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>プロフィールID: {uid}</Text>

      {/* モーダルを閉じるボタン */}
      <Button title="とじる" onPress={() => router.back()} />
    </View>
  );
}

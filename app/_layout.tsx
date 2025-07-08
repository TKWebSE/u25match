// app/_layout.tsx
import CustomHeader from '@components/CustomHeader';
import { Slot, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RootLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 共通ヘッダー */}
      <CustomHeader title="ログイン" />

      {/* 各画面コンテンツ */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  content: {
    flex: 1,
  },
});

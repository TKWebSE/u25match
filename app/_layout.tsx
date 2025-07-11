// app/_layout.tsx
import { AuthProvider } from '@/src/contexts/AuthContext';
import CustomHeader from '@components/CustomHeader';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {

  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* 共通ヘッダー */}
        <CustomHeader title="ログイン" />

        {/* 各画面コンテンツ */}
        <View style={styles.content}>
          <Slot />
          <Toast />
        </View>
      </View>
    </AuthProvider>
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

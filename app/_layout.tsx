// app/_layout.tsx
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import CustomHeader from '@components/CustomHeader';
import { Slot } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LoginScreen from './(auth)/loginScreen';

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <CustomHeader title="ログイン" />
        <View style={styles.content}>
          <AuthGate />
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

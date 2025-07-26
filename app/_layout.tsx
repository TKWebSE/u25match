// app/_layout.tsx
import CustomHeader from '@components/CustomHeader';
import { AuthProvider, useAuth } from '@contexts/AuthContext';
import { defaultConfig } from '@tamagui/config/v4';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { Slot, usePathname } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import EntryScreen from './(auth)/entryScreen';

const config = createTamagui(defaultConfig)

type Conf = typeof config

// make imports typed
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

function AuthGate() {
  const { user, loading } = useAuth();
  const segments = usePathname();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  console.log('AuthGate user:', user);
  console.log("[🔍TEST] 現在のパス:", segments);
  if (!user) {
    if (segments == '/' || segments === '/(auth)/loginScreen' || segments === '/(auth)/signUpScreen') {
      return <Slot />;
    }
    return <EntryScreen />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <View style={styles.container}>
          <CustomHeader title="ログイン" />
          <View style={styles.content}>
            <AuthGate />
            <Toast />
          </View>
        </View>
      </AuthProvider>
    </TamaguiProvider>
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

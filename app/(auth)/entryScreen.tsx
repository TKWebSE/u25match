// app/(other)/entryScreen.js
import { LOGIN_SCREEN_PATH, SIGN_UP_SCREEN_PATH } from '@constants/routes';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EntryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 任意でロゴ画像など */}
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}

      <Text style={styles.title}>Under25 Matchへようこそ🎉</Text>
      <Text style={styles.subtitle}>25歳以下限定のマッチングアプリです💖</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(LOGIN_SCREEN_PATH)}
      >
        <Text style={styles.buttonText}>ログインする</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton]}
        onPress={() => router.push(SIGN_UP_SCREEN_PATH)}
      >
        <Text style={styles.buttonText}>新規登録する</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#A084E8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

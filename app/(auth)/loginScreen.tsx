// app/(auth)/loginScreen.js
import { logIn } from '@/src/services/auth';
import ScreenWrapper from '@components/ScreenWrapper';
import { HOME_SCREEN_PATH, SIGN_UP_SCREEN_PATH } from '@constants/routes';
import { showErrorToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function loginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      showErrorToast('メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      await logIn(email, password);
      router.push(HOME_SCREEN_PATH);
    } catch (error: any) {
      showErrorToast(error.message || 'ログインに失敗しました');
    }
  };

  return (
    <ScreenWrapper >
      <Text style={styles.title}>ログイン</Text>

      <TextInput
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="パスワード"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>ログイン</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(SIGN_UP_SCREEN_PATH)}>
        <Text style={styles.linkText}>アカウントがまだ？ 新規登録はこちら</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 48,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  loginButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#6C63FF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
});

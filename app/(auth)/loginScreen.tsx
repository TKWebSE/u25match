// app/(auth)/loginScreen.js
import { logIn } from '@/src/services/auth';
import ScreenWrapper from '@components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';


export default function loginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'エラーだよ🥺',
        text2: 'メールとパスワードを入力してね',
      });
      return;
    }
    try {
      await logIn(email, password);
      router.push('/homeScreen');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'ログイン失敗🥺',
        text2: error.message || '予期せぬエラーが発生しました',
      });
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

      <TouchableOpacity onPress={() => router.push('/signUpScreen')}>
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

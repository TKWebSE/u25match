// app/(auth)/signUpScreen.js
import { signUp } from '@/src/services/auth';
import { createUserProfile } from '@/src/services/firestoreUserProfile';
import { showErrorToast, showSuccessToast } from '@/src/utils/showToast';
import ScreenWrapper from '@components/ScreenWrapper';
import { HOME_SCREEN_PATH, LOGIN_SCREEN_PATH } from '@constants/routes';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default function signUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      showErrorToast('メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      const { user } = await signUp(email, password);
      await createUserProfile(user); // ✅ 関数名修正
      showSuccessToast('登録完了！ようこそ✨');
      router.push(HOME_SCREEN_PATH);
    } catch (error) {
      const message = error instanceof Error ? error.message : '登録に失敗しました';
      showErrorToast(message);
    }
  };

  return (
    <ScreenWrapper >
      <Text style={styles.title}>アカウント新規登録 ✨</Text>

      <TextInput
        placeholder="メールアドレス"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="パスワード（6文字以上）"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>登録する</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push(LOGIN_SCREEN_PATH)}>
        <Text style={styles.linkText}>
          すでにアカウントをお持ちですか？ ログイン
        </Text>
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
  button: {
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

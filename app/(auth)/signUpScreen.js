// app/(auth)/signUpScreen.js
import ScreenWrapper from '@components/ScreenWrapper';
import { signUp } from '@services/auth';
import { createUserProfile } from '@services/firestoreUserProfile';
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
      // Web環境に合わせて Alert → Toast でもOKですが Alert でも今は可
      alert('メールとパスワードを入力してください🥺');
      return;
    }

    try {
      const { user } = await signUp(email, password);
      await createUserProfile(user); // ✅ 関数名修正
      alert('登録完了！ようこそ✨');
      navigation.navigate('Home');
    } catch (error) {
      alert(`登録失敗: ${error.message}`);
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

      <TouchableOpacity onPress={() => router.push('/loginScreen')}>
        <Text style={styles.linkText}>
          すでにアカウントをお持ちですか？ ログイン
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
    padding: 24,
    width: '100%',
  },
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

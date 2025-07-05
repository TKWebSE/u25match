// screen/SignUpScreen.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { signUp } from '../services/auth';
import { createUserInFirestore } from '../services/firestoreUser';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('入力不足', 'メールとパスワードを入力してください🥺');
      return;
    }

    try {
      const { user } = await signUp(email, password);
      await createUserInFirestore(user);
      Alert.alert('登録完了！', 'ようこそ！');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('登録失敗', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
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

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>すでにアカウントをお持ちですか？ ログイン</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
    justifyContent: 'center',
    padding: 24,
    maxWidth: 400,
    alignSelf: 'center',
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
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
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

// app/(auth)/login/index.tsx
// ログイン画面 - ユーザーの認証を行う
import ScreenWrapper from '@components/common/ScreenWrapper';
import { FORGOT_PASSWORD_SCREEN_PATH, SIGN_UP_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { colors } from '@styles/globalStyles';
import { loginUser } from '@usecases/auth';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  // フォーム状態の管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ストアから認証状態を取得
  const { isLoading, error, clearError } = useAuthStore();

  const router = useRouter();

  // ログイン処理の実行
  const handleLogin = async () => {
    // エラーをクリア
    clearError();

    try {
      // ユースケースを呼び出し（バリデーションとログイン処理を実行）
      await loginUser({ email, password });

      showSuccessToast('ログインに成功しました');
      // onAuthStateChangedでuser状態が更新され、自動的にリダイレクトされる
    } catch (error: any) {
      showErrorToast(error.message || 'ログインに失敗しました');
    }
  };

  // パスワードを忘れた場合の処理
  const handleForgotPassword = () => {
    router.push(FORGOT_PASSWORD_SCREEN_PATH as any);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* ヘッダー部分 */}
        <Text style={styles.title}>ログイン</Text>
        <Text style={styles.subtitle}>アカウントにログインしてください</Text>

        {/* 入力説明文 */}
        <Text style={styles.inputDescription}>メールアドレスとパスワードを入力してください</Text>

        <View style={styles.form}>
          {/* メールアドレス入力フィールド */}
          <TextInput
            placeholder="メールアドレス"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            editable={!isLoading}
            autoComplete="email"
          />

          {/* パスワード入力フィールド */}
          <TextInput
            placeholder="パスワード"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            editable={!isLoading}
            autoComplete="password"
          />

          {/* ログインボタン */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>ログイン</Text>
            )}
          </TouchableOpacity>

          {/* パスワードを忘れた場合のリンク */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>パスワードを忘れた場合</Text>
          </TouchableOpacity>

          {/* 区切り線 */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>または</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 新規登録へのリンク */}
          <TouchableOpacity
            onPress={() => {
              console.log('新規登録へ遷移');
              router.push(SIGN_UP_SCREEN_PATH as any);
            }}
            style={styles.signupButton}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>新規登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 48,
    textAlign: 'center',
  },
  inputDescription: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  signupButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

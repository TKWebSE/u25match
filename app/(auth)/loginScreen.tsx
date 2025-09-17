// app/(auth)/loginScreen.tsx
// ログイン画面 - ユーザーの認証を行う
import ScreenWrapper from '@components/common/ScreenWrapper';
import { EXPLORE_SCREEN_PATH, FORGOT_PASSWORD_SCREEN_PATH, SIGN_UP_SCREEN_PATH } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { logIn } from '@services/auth';
import { colors } from '@styles/globalStyles';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 認証コンテキストから必要な機能を取得（状態のみ）
  const { user } = useAuth();
  const router = useRouter();

  // ユーザーがログイン済みの場合はメイン画面にリダイレクト
  useEffect(() => {
    if (user) {
      router.replace(EXPLORE_SCREEN_PATH as any);
    }
  }, [user, router]);

  // ログイン処理の実行
  const handleLogin = async () => {
    // 入力値のバリデーション
    if (!email || !password) {
      showErrorToast('メールアドレスとパスワードを入力してください');
      return;
    }

    // メールアドレスの形式チェック
    if (!email.includes('@')) {
      showErrorToast('有効なメールアドレスを入力してください');
      return;
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      showErrorToast('パスワードは6文字以上で入力してください');
      return;
    }

    try {
      setIsSubmitting(true);

      // services/authのlogIn関数を直接呼び出し
      await logIn(email, password);

      showSuccessToast('ログインに成功しました');
      // onAuthStateChangedでuser状態が更新され、自動的にリダイレクトされる
    } catch (error: any) {
      console.error('ログインエラー:', error);
      showErrorToast(error.message || 'ログインに失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // パスワードを忘れた場合の処理
  const handleForgotPassword = () => {
    router.push(FORGOT_PASSWORD_SCREEN_PATH);
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
            editable={!isSubmitting}
            autoComplete="email"
          />

          {/* パスワード入力フィールド */}
          <TextInput
            placeholder="パスワード"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            editable={!isSubmitting}
            autoComplete="password"
          />

          {/* ログインボタン */}
          <TouchableOpacity
            style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
              router.push(SIGN_UP_SCREEN_PATH);
            }}
            style={styles.signupButton}
            disabled={isSubmitting}
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

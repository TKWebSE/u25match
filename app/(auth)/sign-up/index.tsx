// app/(auth)/sign-up/index.tsx
// サインアップ画面 - 新しいユーザーアカウントの作成
import { useLegalDocuments } from '@components/common';
import ScreenWrapper from '@components/common/ScreenWrapper';
import { LOGIN_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { colors } from '@styles/globalStyles';
import { signUpUser } from '@usecases/auth';
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

export default function SignUpScreen() {
  // フォーム状態の管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ストアから認証状態を取得
  const { isLoading, error, clearError } = useAuthStore();

  const router = useRouter();
  const { showTerms, showPrivacy, Modal } = useLegalDocuments();

  // サインアップ処理の実行
  const handleSignUp = async () => {
    // エラーをクリア
    clearError();

    try {
      // ユースケースを呼び出し（ストア更新は監視システムが担当）
      await signUpUser({ email, password, confirmPassword });
      showSuccessToast('登録完了！ようこそ✨');
      // onAuthStateChangedでuser状態が更新され、自動的にリダイレクトされる
    } catch (error: any) {
      showErrorToast(error.message || 'アカウント作成に失敗しました');
    }
  };


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* ヘッダー部分 */}
        <Text style={styles.title}>アカウント新規登録</Text>
        <Text style={styles.subtitle}>新しいアカウントを作成してください</Text>

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
            placeholder="パスワード（6-32文字、英字+数字）"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            editable={!isLoading}
            autoComplete="new-password"
          />

          {/* パスワード確認入力フィールド */}
          <TextInput
            placeholder="パスワード（確認）"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            editable={!isLoading}
            autoComplete="new-password"
          />

          {/* 登録ボタン */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>登録する</Text>
            )}
          </TouchableOpacity>

          {/* 利用規約へのリンク */}
          <View style={styles.termsLink}>
            <Text style={styles.termsText}>
              登録することで、
              <Text onPress={showTerms} style={styles.linkText}>利用規約</Text>
              および
              <Text onPress={showPrivacy} style={styles.linkText}>プライバシーポリシー</Text>
              に同意したものとみなされます
            </Text>
          </View>

          {/* 区切り線 */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>または</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ログインへのリンク */}
          <TouchableOpacity
            onPress={() => router.push(LOGIN_SCREEN_PATH as any)}
            style={styles.loginButton}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal />
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
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsLink: {
    marginBottom: 24,
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
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
  loginButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

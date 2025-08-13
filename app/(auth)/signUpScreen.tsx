// app/(auth)/signUpScreen.tsx
// サインアップ画面 - 新しいユーザーアカウントの作成
import ScreenWrapper from '@components/common/ScreenWrapper';
import { EXPLORE_SCREEN_PATH, LOGIN_SCREEN_PATH } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { createUserProfile } from '@services/firestoreUserProfile';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../firebaseConfig';

export default function SignUpScreen() {
  // フォーム状態の管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 認証コンテキストから必要な機能を取得
  const { signup, error, clearError, loading } = useAuth();
  const router = useRouter();

  // エラーが変更されたらトーストで表示
  useEffect(() => {
    if (error) {
      showErrorToast(error);
      clearError();
    }
  }, [error, clearError]);

  // フォームのバリデーション
  const validateForm = () => {
    // 必須項目のチェック
    if (!email || !password || !confirmPassword) {
      showErrorToast('すべての項目を入力してください');
      return false;
    }

    // メールアドレスの形式チェック
    if (!email.includes('@')) {
      showErrorToast('有効なメールアドレスを入力してください');
      return false;
    }

    // パスワードの長さチェック
    if (password.length < 6) {
      showErrorToast('パスワードは6文字以上で入力してください');
      return false;
    }

    // パスワードの一致チェック
    if (password !== confirmPassword) {
      showErrorToast('パスワードが一致しません');
      return false;
    }

    return true;
  };

  // サインアップ処理の実行
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // サインアップ実行
      await signup(email, password);

      // ユーザープロファイル作成
      const currentUser = auth.currentUser;
      if (currentUser) {
        await createUserProfile(currentUser.uid, currentUser.email || email);
      }

      showSuccessToast('登録完了！ようこそ✨');
      router.push(EXPLORE_SCREEN_PATH);
    } catch (error: any) {
      console.error('サインアップエラー:', error);
      // エラーはAuthContextで処理されるので、ここでは何もしない
    } finally {
      setIsSubmitting(false);
    }
  };

  // 利用規約・プライバシーポリシーの表示
  const handleTermsAndConditions = () => {
    Alert.alert(
      '利用規約・プライバシーポリシー',
      '利用規約とプライバシーポリシーに同意の上、サービスをご利用ください。',
      [{ text: 'OK' }]
    );
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
            editable={!isSubmitting}
            autoComplete="email"
          />

          {/* パスワード入力フィールド */}
          <TextInput
            placeholder="パスワード（6文字以上）"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            editable={!isSubmitting}
            autoComplete="new-password"
          />

          {/* パスワード確認入力フィールド */}
          <TextInput
            placeholder="パスワード（確認）"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            editable={!isSubmitting}
            autoComplete="new-password"
          />

          {/* 登録ボタン */}
          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>登録する</Text>
            )}
          </TouchableOpacity>

          {/* 利用規約へのリンク */}
          <TouchableOpacity
            onPress={handleTermsAndConditions}
            style={styles.termsLink}
          >
            <Text style={styles.termsText}>
              登録することで、利用規約とプライバシーポリシーに同意したものとみなされます
            </Text>
          </TouchableOpacity>

          {/* 区切り線 */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>または</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ログインへのリンク */}
          <TouchableOpacity
            onPress={() => router.push(LOGIN_SCREEN_PATH)}
            style={styles.loginButton}
            disabled={isSubmitting}
          >
            <Text style={styles.loginButtonText}>ログイン</Text>
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
    backgroundColor: '#6C63FF',
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
    borderColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
});

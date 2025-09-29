// app/(auth)/forgot-password/index.tsx
// パスワードリセット画面 - パスワードを忘れた場合の処理
import ScreenWrapper from '@components/common/ScreenWrapper';
import { LOGIN_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { colors } from '@styles/globalStyles';
import { resetPasswordUser } from '@usecases/auth';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { validateEmailFormat } from '@utils/validation';
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

export default function ForgotPasswordScreen() {
  // フォーム状態の管理
  const [email, setEmail] = useState('');

  // ストアから認証状態を取得
  const { isLoading, clearError } = useAuthStore();

  const router = useRouter();

  // パスワードリセット処理の実行
  const handleResetPassword = async () => {
    // エラーをクリア
    clearError();

    // 入力値のバリデーション
    if (!email) {
      showErrorToast('メールアドレスを入力してください');
      return;
    }

    try {
      // utilsのバリデーション関数を使用
      validateEmailFormat(email);

      // ユースケースを呼び出し
      await resetPasswordUser({ email });

      showSuccessToast('パスワードリセットメールを送信しました');
      // ログイン画面に戻る
      router.push(LOGIN_SCREEN_PATH as any);
    } catch (error: any) {
      showErrorToast(error.message || 'パスワードリセットに失敗しました');
    }
  };

  // ログイン画面に戻る
  const handleBackToLogin = () => {
    router.push(LOGIN_SCREEN_PATH as any);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* ヘッダー部分 */}
        <Text style={styles.title}>パスワードを忘れた場合</Text>
        <Text style={styles.subtitle}>
          登録済みのメールアドレスを入力してください{'\n'}
          パスワードリセット用のメールをお送りします
        </Text>

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

          {/* パスワードリセットボタン */}
          <TouchableOpacity
            style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>パスワードリセットメールを送信</Text>
            )}
          </TouchableOpacity>

          {/* ログイン画面に戻るボタン */}
          <TouchableOpacity
            onPress={handleBackToLogin}
            style={styles.backButton}
            disabled={isLoading}
          >
            <Text style={styles.backButtonText}>ログイン画面に戻る</Text>
          </TouchableOpacity>

          {/* 注意事項 */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>ご注意</Text>
            <Text style={styles.noteText}>
              • パスワードリセットメールは数分以内に届きます{'\n'}
              • メールが届かない場合は、迷惑メールフォルダをご確認ください{'\n'}
              • メールアドレスが登録されていない場合は、新規登録をお願いします
            </Text>
          </View>
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
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 48,
    textAlign: 'center',
    lineHeight: 24,
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
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  resetButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  noteContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'left',
  },
});

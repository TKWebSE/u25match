// app/(auth)/reset-password/index.tsx
// パスワードリセット画面
import ScreenWrapper from '@components/common/ScreenWrapper';
import { LOGIN_SCREEN_PATH } from '@constants/routes';
import { useAuthStore } from '@stores/authStore';
import { colors } from '@styles/globalStyles';
import { resetPassword } from '@usecases/auth';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ResetPasswordScreen() {
  // URLパラメータからoobCodeを取得
  const { oobCode } = useLocalSearchParams<{ oobCode: string }>();

  // フォーム状態の管理
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ストアから認証状態を取得
  const { isLoading } = useAuthStore();

  const router = useRouter();

  // パスワードリセット処理
  const handleResetPassword = async () => {
    try {
      // ユースケースを呼び出し
      await resetPassword({
        oobCode,
        newPassword,
        confirmPassword,
      });

      showSuccessToast('パスワードを更新しました');
      // ログイン画面に遷移
      router.push(LOGIN_SCREEN_PATH as any);
    } catch (error: any) {
      showErrorToast(error.message || 'パスワードの更新に失敗しました');
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
        <Text style={styles.title}>新しいパスワードを設定</Text>
        <Text style={styles.subtitle}>
          新しいパスワードを入力してください{'\n'}
          安全なパスワードを設定しましょう
        </Text>

        <View style={styles.form}>
          {/* 新しいパスワード入力フィールド */}
          <TextInput
            placeholder="新しいパスワード（6-32文字、英字+数字）"
            value={newPassword}
            onChangeText={setNewPassword}
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

          {/* パスワード更新ボタン */}
          <TouchableOpacity
            style={[styles.updateButton, isLoading && styles.updateButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>パスワードを更新</Text>
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

          {/* パスワード要件 */}
          <View style={styles.requirementsContainer}>
            <Text style={styles.requirementsTitle}>パスワード要件</Text>
            <Text style={styles.requirementsText}>
              • 6文字以上32文字以内{'\n'}
              • 英字と数字を含む{'\n'}
              • 推測しにくいパスワードを設定してください
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  updateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  updateButtonDisabled: {
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
  requirementsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  requirementsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'left',
  },
});



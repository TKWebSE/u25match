import { SettingsStyles } from '@styles/settings/SettingsStyles';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import React from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity } from 'react-native';

/**
 * ログアウトボタンのプロパティ
 */
interface LogoutButtonProps {
  /** ログアウト処理の関数 */
  onLogout: () => Promise<void>;
  /** ローディング状態 */
  loading: boolean;
}

/**
 * ログアウトボタンコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - ログアウト確認ダイアログの表示
 * - ログアウト処理の実行
 * - ローディング状態の表示
 * - エラーハンドリング
 */
export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout, loading }) => {
  /**
   * ログアウト確認ダイアログを表示し、ログアウト処理を実行
   */
  const handleLogoutPress = () => {
    Alert.alert(
      'ログアウト',
      'ログアウトしますか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'ログアウト',
          style: 'destructive',
          onPress: async () => {
            try {
              await onLogout();
              showSuccessToast('ログアウトしました');
            } catch (error) {
              console.error('ログアウトエラー:', error);
              showErrorToast('ログアウトに失敗しました');
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[SettingsStyles.logoutButton, loading && SettingsStyles.logoutButtonDisabled]}
      onPress={handleLogoutPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={SettingsStyles.logoutButtonText}>ログアウト</Text>
      )}
    </TouchableOpacity>
  );
}; 

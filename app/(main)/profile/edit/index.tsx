import { getProfilePath } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { mockProfileData } from '@mock/UserEditMock';
import { ProfileData, getChangeSummary, getProfileDiff, hasProfileChanges } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

/**
 * プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - エントリーポイント
 * - 共通のビジネスロジック管理
 * - データの状態管理
 * - プラットフォーム別のUIコンポーネントの自動解決
 * 
 * プラットフォーム固有の実装は以下のファイルで管理されます：
 * - Edit.web.tsx: Web版専用UI（自動的に選択される）
 * - Edit.native.tsx: モバイル版専用UI（自動的に選択される）
 */
const ProfileEditScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);

  // 保存処理
  const handleSave = async (newProfileData: ProfileData) => {
    try {
      // 変更されたフィールドを取得
      const changes = getProfileDiff(mockProfileData, newProfileData);
      const changeSummary = getChangeSummary(mockProfileData, newProfileData);

      console.log('変更されたフィールド:', changeSummary);
      console.log('保存する差分データ:', changes);

      // TODO: 実際の保存処理を実装
      // await updateProfile(changes);

      Alert.alert('保存完了', 'プロフィールを保存しました');

      // 自分のプロフィール画面に遷移
      if (user?.uid) {
        router.push(getProfilePath(user.uid) as any);
      } else {
        // ユーザーIDが取得できない場合は前の画面に戻る
        router.back();
      }
    } catch (error) {
      console.error('保存エラー:', error);
      Alert.alert('エラー', '保存に失敗しました');
    }
  };

  // 戻る処理（キャンセル処理）
  const handleBack = () => {
    // 変更がある場合のみ確認ダイアログを表示
    if (hasProfileChanges(mockProfileData, profileData)) {
      Alert.alert(
        '編集内容を破棄しますか？',
        '保存していない変更があります',
        [
          { text: '続行', style: 'cancel' },
          {
            text: '破棄',
            onPress: () => {
              router.back();
            }
          }
        ]
      );
    } else {
      // 変更がない場合は直接戻る
      router.back();
    }
  };

  // プラットフォーム自動解決によるUI表示
  // React Native/Expoが自動的に以下を選択：
  // - Web版: index.web.tsx
  // - モバイル版: index.native.tsx
  // 
  // このファイル（index.tsx）は、プラットフォーム別のファイルで上書きされる
  // フォールバック用のデフォルト実装として機能する
  return null;
};

export default ProfileEditScreen;

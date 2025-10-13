// src/usecases/profile/updateProfile.ts
// プロフィール更新のユースケース - ユーザープロフィール情報更新処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { profileStore } from '@stores/profileStore';
import { EditableProfileData } from '@utils/profileDiff';

/**
 * ユーザープロフィールを更新するユースケース
 * 
 * フロー:
 * 1. 現在のプロフィール確認
 * 2. 保存開始・エラークリア
 * 3. サービス層でプロフィール更新
 * 4. 更新後のプロフィール情報をストアに設定
 * 5. 編集状態をクリア
 * 6. 成功時はtrueを返し、エラー時はスロー
 * 
 * @param uid - 更新対象のユーザーID
 * @param updates - 更新するプロフィールデータ（差分のみ）
 * @returns プロフィール更新成功時はtrue
 */
export const updateProfile = async (uid: string, updates: Partial<EditableProfileData>): Promise<boolean> => {
  const profileStoreState = profileStore.getState();
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error('自分のプロフィールのみ更新できます');
    }

    const currentProfile = profileStoreState.currentProfile;
    if (!currentProfile || currentProfile.uid !== uid) {
      throw new Error('更新対象のプロフィールが見つかりません');
    }

    // 保存開始
    profileStoreState.setLoading(true);

    // サービス層でプロフィール更新
    await serviceRegistry.profileDetail.updateProfileDetail(uid, {
      ...updates,
      updatedAt: new Date(),
    });

    // 更新後のプロフィール情報をストアに設定
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date(),
    };

    // ストアに保存
    profileStoreState.setCurrentProfile(updatedProfile);

    return true;

  } catch (error: any) {
    throw new Error(error.message || 'プロフィールの更新に失敗しました');
  } finally {
    profileStoreState.setLoading(false);
  }
};

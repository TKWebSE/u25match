// src/usecases/profile/updateProfile.ts
// プロフィール更新のユースケース - ユーザープロフィール情報更新処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { ProfileData, profileStore } from '@stores/profileStore';

/**
 * プロフィール更新に必要なデータ
 */
export interface UpdateProfileData {
  displayName?: string;
  bio?: string;
  age?: number;
  location?: string;
  occupation?: string;
  interests?: string[];
  images?: string[];
}

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
 * @param updates - 更新するプロフィールデータ
 * @returns プロフィール更新成功時はtrue
 */
export const updateProfile = async (uid: string, updates: UpdateProfileData): Promise<boolean> => {
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
    const updatedProfile: ProfileData = {
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

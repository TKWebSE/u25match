// src/usecases/profile/updateProfile.ts
// プロフィール更新のユースケース - ユーザープロフィール情報更新処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
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
 * プロフィール更新処理の結果
 */
export interface UpdateProfileResult {
  success: boolean;        // 更新成功フラグ
  profile?: ProfileData;   // 更新後のプロフィール情報（成功時）
  error?: string;          // エラーメッセージ（失敗時のみ）
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
 * 6. 結果をUIに返却
 * 
 * @param uid - 更新対象のユーザーID
 * @param updates - 更新するプロフィールデータ
 * @returns プロフィール更新結果（成功/失敗・プロフィール・エラー）
 */
export const updateProfile = async (uid: string, updates: UpdateProfileData): Promise<UpdateProfileResult> => {
  try {
    // 現在のプロフィール確認
    const currentProfile = profileStore.getState().currentProfile;
    if (!currentProfile || currentProfile.uid !== uid) {
      return {
        success: false,
        error: '更新対象のプロフィールが見つかりません'
      };
    }

    // 保存開始・エラークリア
    profileStore.getState().setSaving(true);
    profileStore.getState().clearError();

    // サービス層でプロフィール更新
    const result = await serviceRegistry.profileDetail.updateProfileDetail(uid, {
      ...updates,
      updatedAt: new Date(),
    });

    // 更新後のプロフィール情報をストアに設定
    const updatedProfile: ProfileData = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date(),
    };

    profileStore.getState().setCurrentProfile(updatedProfile);

    // 編集状態をクリア
    profileStore.getState().setEditingProfile(null);

    profileStore.getState().setSaving(false);

    return {
      success: true,
      profile: updatedProfile
    };

  } catch (error: any) {
    console.error('プロフィール更新エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    profileStore.getState().setSaving(false);
    profileStore.getState().setError(error.message || 'プロフィールの更新に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'プロフィールの更新に失敗しました'
    };
  }
};

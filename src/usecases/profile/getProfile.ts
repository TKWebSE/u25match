// src/usecases/profile/getProfile.ts
// プロフィール取得のユースケース - ユーザープロフィール情報取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { ProfileData, profileStore } from '@stores/profileStore';

/**
 * プロフィール取得処理の結果
 */
export interface GetProfileResult {
  success: boolean;        // 取得成功フラグ
  profile?: ProfileData;   // プロフィール情報（成功時）
  error?: string;          // エラーメッセージ（失敗時のみ）
}

/**
 * ユーザープロフィールを取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でプロフィール取得
 * 3. プロフィール情報をストアに設定
 * 4. 閲覧履歴に追加（他のユーザーの場合）
 * 5. 結果をUIに返却
 * 
 * @param uid - 取得対象のユーザーID
 * @param isOwnProfile - 自分のプロフィールかどうか（デフォルト: false）
 * @returns プロフィール取得結果（成功/失敗・プロフィール・エラー）
 */
export const getProfile = async (uid: string, isOwnProfile = false): Promise<GetProfileResult> => {
  try {
    // ローディング開始・エラークリア
    profileStore.getState().setLoading(true);
    profileStore.getState().clearError();

    // サービス層でプロフィール取得
    const result = await serviceRegistry.profileDetail.getProfileDetail(uid);

    // プロフィール情報をストアに設定
    const profileData: ProfileData = {
      uid: result.uid,
      displayName: result.displayName,
      bio: result.bio,
      age: result.age,
      location: result.location,
      occupation: result.occupation,
      interests: result.interests || [],
      images: result.images || [],
      isVerified: result.isVerified || false,
      lastActive: result.lastActive ? new Date(result.lastActive) : undefined,
      createdAt: result.createdAt ? new Date(result.createdAt) : undefined,
      updatedAt: result.updatedAt ? new Date(result.updatedAt) : undefined,
    };

    if (isOwnProfile) {
      // 自分のプロフィールの場合は currentProfile に設定
      profileStore.getState().setCurrentProfile(profileData);
    } else {
      // 他のユーザーのプロフィールの場合は閲覧履歴に追加
      profileStore.getState().addViewedProfile(profileData);
    }

    profileStore.getState().setLoading(false);

    return {
      success: true,
      profile: profileData
    };

  } catch (error: any) {
    console.error('プロフィール取得エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    profileStore.getState().setLoading(false);
    profileStore.getState().setError(error.message || 'プロフィールの取得に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'プロフィールの取得に失敗しました'
    };
  }
};

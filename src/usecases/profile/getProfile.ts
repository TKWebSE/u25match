// src/usecases/profile/getProfile.ts
// プロフィール取得のユースケース - ユーザープロフィール情報取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { ProfileData, profileStore } from '@stores/profileStore';

/**
 * ユーザープロフィールを取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層でプロフィール取得
 * 3. プロフィール情報をストアに設定
 * 4. 閲覧履歴に追加（他のユーザーの場合）
 * 5. 成功時はtrueを返し、エラー時はスロー
 * 
 * @param uid - 取得対象のユーザーID
 * @param isOwnProfile - 自分のプロフィールかどうか（デフォルト: false）
 * @returns プロフィール取得成功時はtrue
 */
export const getProfile = async (uid: string, isOwnProfile = false): Promise<boolean> => {
  const profileStoreState = profileStore.getState();

  try {
    // ローディング開始
    profileStoreState.setLoading(true);

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
      profileStoreState.setCurrentProfile(profileData);
    } else {
      profileStoreState.addViewedProfile(profileData);
    }

    profileStoreState.setLoading(false);

    return true;

  } catch (error: any) {
    profileStoreState.setLoading(false);
    throw new Error(error.message || 'プロフィールの取得に失敗しました');
  }
};

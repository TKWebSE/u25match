// src/usecases/profile/getProfile.ts
// プロフィール取得のユースケース - ユーザープロフィール情報取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { ProfileData, profileStore } from '@stores/profileStore';
import { useViewHistoryStore } from '@stores/viewHistoryStore';

/**
 * ユーザープロフィールを取得するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層でプロフィール取得
 * 3. プロフィール情報をストアに設定
 * 4. 閲覧履歴に追加（他のユーザーの場合）
 * 5. 成功時はtrueを返し、エラー時はスロー
 * 
 * @param uid - 取得対象のユーザーID
 * @returns プロフィール取得成功時はtrue
 */
export const getProfile = async (uid: string): Promise<boolean> => {
  const profileStoreState = profileStore.getState();
  const currentUser = authStore.getState().user;

  try {
    // ローディング開始
    profileStoreState.setLoading(true);

    // サービス層でプロフィール取得
    const result = await serviceRegistry.profileDetail.getProfileDetail(uid);

    if (!result.success || !result.data) {
      throw new Error(result.error || 'プロフィールの取得に失敗しました');
    }

    // プロフィール情報をストアに設定
    const profileData: ProfileData = {
      uid: result.data.uid,
      displayName: result.data.name,
      bio: result.data.bio,
      age: result.data.age,
      location: result.data.location,
      occupation: result.data.details.occupation,
      interests: result.data.tags?.map(tag => tag.name) || [],
      images: result.data.images || [],
      isVerified: result.data.isVerified || false,
      lastActive: result.data.lastActiveAt,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
    };

    // プロフィール情報をストアに追加
    profileStoreState.addViewedProfile(profileData);

    // 他人のプロフィールの場合は閲覧履歴に記録
    if (currentUser?.uid !== uid) {
      await useViewHistoryStore.getState().addView(uid);
    }

    return true;

  } catch (error: any) {
    throw new Error(error.message || 'プロフィールの取得に失敗しました');
  } finally {
    profileStoreState.setLoading(false);
  }
};

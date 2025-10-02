// src/stores/profileInitializer.ts
// プロフィール情報の初期化と管理

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from './authStore';
import { ProfileData, profileStore } from './profileStore';

/**
 * 認証状態変更時にプロフィール情報を取得・更新する
 * @param user Firebase認証ユーザー情報
 */
export const initializeProfile = async (user: any) => {
  if (!user) {
    // ログアウト時：プロフィール情報をクリア
    profileStore.getState().reset();
    console.log('✅ プロフィール情報をクリア');
    return;
  }

  try {
    console.log('🔍 プロフィール情報を取得中...', user.uid);
    profileStore.getState().setLoading(true);

    // プロフィール詳細サービスから情報を取得
    const profileService = serviceRegistry.profileDetail;
    const response = await profileService.getProfileDetail(user.uid);

    if (response.success && response.data) {
      // サービスのProfileDetailからストア用のProfileDataに変換
      const profileData: ProfileData = {
        uid: response.data.uid,
        displayName: response.data.name,
        bio: response.data.bio,
        age: response.data.age,
        location: response.data.location,
        occupation: response.data.details.occupation,
        interests: response.data.tags?.map(tag => tag.name) || [],
        images: response.data.images || [],
        isVerified: response.data.isVerified || false,
        lastActive: response.data.lastActiveAt,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt,
        // 設定画面用の情報
        remainingLikes: response.data.remainingLikes || 10,
        remainingBoosts: response.data.remainingBoosts || 5,
        remainingPoints: response.data.remainingPoints || 100,
        membershipType: 'free', // TODO: 実際の会員情報を取得
        email: user.email || undefined,
      };

      profileStore.getState().setCurrentProfile(profileData);
      console.log('✅ プロフィール情報を取得・保存完了');
    } else {
      const errorMessage = response.error || 'プロフィール情報の取得に失敗しました';
      console.error('❌ プロフィール取得失敗:', errorMessage);
    }
  } catch (error) {
    const errorMessage = 'プロフィール情報の取得中にエラーが発生しました';
    console.error('💥 プロフィール取得エラー:', error);
  } finally {
    profileStore.getState().setLoading(false);
  }
};

/**
 * プロフィール情報を手動で更新する
 * @param uid ユーザーID
 */
export const refreshProfile = async (uid: string) => {
  const user = { uid, email: authStore.getState().user?.email };
  await initializeProfile(user);
};

/**
 * プロフィール情報を保存する
 * @param profileData 保存するプロフィール情報
 */
export const saveProfile = async (profileData: ProfileData) => {
  try {
    console.log('💾 プロフィール情報を保存中...', profileData.uid);
    profileStore.getState().setSaving(true);

    // TODO: 実際の保存処理を実装
    // const profileService = serviceRegistry.profileDetail;
    // const response = await profileService.updateProfile(profileData);

    // 仮の成功処理
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機

    profileStore.getState().setCurrentProfile(profileData);
    console.log('✅ プロフィール情報の保存完了');

    return { success: true };
  } catch (error) {
    const errorMessage = 'プロフィール情報の保存中にエラーが発生しました';
    console.error('💥 プロフィール保存エラー:', error);
    return { success: false, error: errorMessage };
  } finally {
    profileStore.getState().setSaving(false);
  }
};

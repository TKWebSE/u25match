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
  const profileStoreState = profileStore.getState();

  if (!user) {
    // ログアウト時：プロフィール情報をクリア
    profileStoreState.reset();
    console.log('✅ プロフィール情報をクリア');
    return;
  }

  try {
    console.log('🔍 プロフィール情報を取得中...', user.uid);
    profileStoreState.setLoading(true);

    // プロフィール詳細サービスから情報を取得
    const profileService = serviceRegistry.profileDetail;
    const response = await profileService.getProfileDetail(user.uid);

    if (response.success && response.data) {
      // ProfileDetail（FirestoreUser）をそのまま保存
      profileStoreState.setCurrentProfile(response.data);
      console.log('✅ プロフィール情報を取得・保存完了');
    } else {
      const errorMessage = response.error || 'プロフィール情報の取得に失敗しました';
      console.error('❌ プロフィール取得失敗:', errorMessage);
    }
  } catch (error) {
    const errorMessage = 'プロフィール情報の取得中にエラーが発生しました';
    console.error('💥 プロフィール取得エラー:', error);
  } finally {
    profileStoreState.setLoading(false);
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
  const profileStoreState = profileStore.getState();

  try {
    console.log('💾 プロフィール情報を保存中...', profileData.uid);
    profileStoreState.setLoading(true);

    // TODO: 実際の保存処理を実装
    // const profileService = serviceRegistry.profileDetail;
    // const response = await profileService.updateProfileDetail(profileData.uid, profileData);

    // 仮の成功処理
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機

    profileStoreState.setCurrentProfile(profileData);
    console.log('✅ プロフィール情報の保存完了');

    return { success: true };
  } catch (error) {
    const errorMessage = 'プロフィール情報の保存中にエラーが発生しました';
    console.error('💥 プロフィール保存エラー:', error);
    return { success: false, error: errorMessage };
  } finally {
    profileStoreState.setLoading(false);
  }
};

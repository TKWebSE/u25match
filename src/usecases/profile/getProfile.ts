// src/usecases/profile/getProfile.ts
// プロフィール取得のユースケース - ユーザープロフィール情報取得処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { ProfileDetail } from '@services/profile/types';
import { authStore } from '@stores/authStore';
import { profileStore } from '@stores/profileStore';
import { useViewHistoryStore } from '@stores/viewHistoryStore';

/**
 * プロフィール取得の戻り値型
 */
export interface GetProfileResult {
  profile: ProfileDetail;
  hasLiked: boolean;  // いいね済みかどうか
}

/**
 * ユーザープロフィールを取得するユースケース
 * 
 * フロー:
 * 1. 自分のプロフィール && ストアにキャッシュあり → キャッシュを返す（API呼び出しなし）
 * 2. キャッシュなし → サービス層でプロフィール取得
 * 3. 自分のプロフィールの場合 → ストアに保存（次回キャッシュ用）
 * 4. 他人のプロフィールの場合 → 閲覧履歴に記録 & いいね済みかチェック
 * 5. ProfileDetail（FirestoreUser）といいね状態を返す
 * 
 * @param uid - 取得対象のユーザーID
 * @returns 取得したプロフィール詳細データといいね状態
 */
export const getProfile = async (uid: string): Promise<GetProfileResult> => {
  const profileStoreState = profileStore.getState();
  const currentUser = authStore.getState().user;

  try {
    // 自分のプロフィールで、既にストアにある場合はそれを返す（キャッシュヒット）
    // UIDの一致も確認して、別ユーザーのプロフィールが混入しないようにする
    if (
      currentUser?.uid === uid &&
      profileStoreState.currentProfile &&
      profileStoreState.currentProfile.uid === uid
    ) {
      return {
        profile: profileStoreState.currentProfile,
        hasLiked: false, // 自分のプロフィールなのでhasLikedは常にfalse
      };
    }

    // サービス層でプロフィール取得
    const result = await serviceRegistry.profileDetail.getProfileDetail(uid);

    // データの存在確認（安全なチェック）
    if (!result.success || !result.data) {
      throw new Error(result.error || 'プロフィールデータが取得できませんでした');
    }

    const profileDetail = result.data;

    // 自分のプロフィールの場合のみ、ストアに保存
    if (currentUser?.uid === uid) {
      profileStoreState.setCurrentProfile(profileDetail);
      console.log('✅ プロフィールをストアに保存');
      return {
        profile: profileDetail,
        hasLiked: false, // 自分のプロフィールなのでhasLikedは常にfalse
      };
    }

    // 他人のプロフィールの場合の処理
    let hasLiked = false;

    if (currentUser) {
      // 閲覧履歴に記録（失敗しても無視）
      useViewHistoryStore.getState().addView(uid).catch(err => {
        console.error('❌ 閲覧履歴の記録に失敗:', err);
      });

      // いいね済みかチェック
      try {
        hasLiked = await serviceRegistry.profileDetail.checkIfLiked(currentUser.uid, uid);
        console.log(`✅ いいね済みチェック完了: ${hasLiked}`);
      } catch (err) {
        console.error('❌ いいね済みチェックに失敗:', err);
        // エラーが発生してもhasLiked=falseとして続行
      }
    }

    return {
      profile: profileDetail,
      hasLiked,
    };

  } catch (error: any) {
    throw new Error(error.message || 'プロフィールの取得に失敗しました');
  }
};

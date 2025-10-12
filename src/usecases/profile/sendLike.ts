// src/usecases/profile/sendLike.ts
// いいね送信のユースケース - いいね送信処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';

/**
 * いいねを送信するユースケース
 * 
 * フロー:
 * 1. ログインチェック
 * 2. サービス層でいいね送信
 * 3. 成功時はtrueを返し、エラー時はスロー
 * 
 * @param targetUid - いいねを送る対象のユーザーID
 * @returns いいね送信成功時はtrue
 */
export const sendLike = async (targetUid: string): Promise<boolean> => {
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser) {
      throw new Error('ログインが必要です');
    }

    if (currentUser.uid === targetUid) {
      throw new Error('自分自身にいいねを送ることはできません');
    }

    // サービス層でいいね送信
    const result = await serviceRegistry.profileDetail.sendLike(targetUid);

    if (!result.success) {
      throw new Error(result.error || 'いいねの送信に失敗しました');
    }

    return true;

  } catch (error: any) {
    throw new Error(error.message || 'いいねの送信に失敗しました');
  }
};


// src/usecases/purchase/purchaseLikes.ts
// いいね購入のユースケース - いいね決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { profileStore } from '@stores/profileStore';
import { purchaseStore } from '@stores/purchaseStore';
import { getProfile } from '@usecases/profile/getProfile';

/**
 * いいね購入に必要なデータ
 */
export interface PurchaseLikesData {
  planId: string;        // 購入プランID
  amount: number;        // 購入いいね数
  pointsCost: number;    // 消費ポイント数
}

/**
 * いいね購入処理の結果
 */
export interface PurchaseLikesResult {
  transactionId: string; // 取引ID
}

/**
 * いいねを購入するユースケース
 * 
 * フロー:
 * 1. ログインチェック
 * 2. ポイント残高チェック（不足時はエラースロー）
 * 3. ローディング開始
 * 4. サービス層でいいね購入処理
 * 5. 購入成功時、プロフィールを再取得（ポイント・いいね更新）
 * 6. 購入履歴に記録
 * 7. エラー時は呼び出し元にスロー
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（取引ID）
 * @throws ポイント不足またはその他のエラーが発生した場合は例外をスロー
 */
export const purchaseLikes = async (data: PurchaseLikesData): Promise<PurchaseLikesResult> => {
  const { planId, amount, pointsCost } = data;
  const purchaseStoreState = purchaseStore.getState();
  const profileStoreState = profileStore.getState();
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser) {
      throw new Error('ログインが必要です');
    }

    // ポイント残高チェック（profileから取得）
    const currentPoints = profileStoreState.currentProfile?.remainingPoints ?? 0;
    if (currentPoints < pointsCost) {
      throw new Error('ポイントが不足しています');
    }

    // ローディング開始
    purchaseStoreState.setLoading(true);

    // サービス層でいいね購入処理
    const result = await serviceRegistry.payment.purchaseLikes({
      planId,
      amount,
      pointsCost,
    });

    // 購入成功時、プロフィールを再取得（ポイント・いいね更新）
    try {
      await getProfile(currentUser.uid);
    } catch (error) {
      // プロフィール取得失敗は購入処理に影響させない
      console.warn('プロフィール再取得に失敗しました:', error);
    }

    // 購入履歴に記録
    purchaseStoreState.addPurchaseHistory({
      id: result.transactionId,
      type: 'likes',
      amount,
      pointsCost,
      purchasedAt: new Date(),
      status: 'completed',
    });

    return {
      transactionId: result.transactionId
    };

  } catch (error: any) {
    throw error;
  } finally {
    purchaseStoreState.setLoading(false);
  }
};

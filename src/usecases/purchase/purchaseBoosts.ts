// src/usecases/purchase/purchaseBoosts.ts
// ブースト購入のユースケース - ブースト決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { profileStore } from '@stores/profileStore';
import { purchaseStore } from '@stores/purchaseStore';
import { getProfile } from '@usecases/profile/getProfile';

/**
 * ブースト購入に必要なデータ
 */
export interface PurchaseBoostsData {
  planId: string;        // 購入プランID
  amount: number;        // 購入ブースト数
  pointsCost: number;    // 消費ポイント数
}

/**
 * ブースト購入処理の結果
 */
export interface PurchaseBoostsResult {
  transactionId: string; // 取引ID
}

/**
 * ブーストを購入するユースケース
 * 
 * フロー:
 * 1. ログインチェック
 * 2. ポイント残高チェック（不足時はエラースロー）
 * 3. ローディング開始
 * 4. サービス層でブースト購入処理
 * 5. 購入成功時、プロフィールを再取得（ポイント・ブースト更新）
 * 6. 購入履歴に記録
 * 7. エラー時は呼び出し元にスロー
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（取引ID）
 * @throws ポイント不足またはその他のエラーが発生した場合は例外をスロー
 */
export const purchaseBoosts = async (data: PurchaseBoostsData): Promise<PurchaseBoostsResult> => {
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

    // サービス層でブースト購入処理
    const result = await serviceRegistry.payment.purchaseBoosts({
      planId,
      amount,
      pointsCost,
    });

    // 購入成功時、プロフィールを再取得（ポイント・ブースト更新）
    await getProfile(currentUser.uid);

    // 購入履歴に記録
    purchaseStoreState.addPurchaseHistory({
      id: result.transactionId,
      type: 'boosts',
      amount,
      pointsCost,
      purchasedAt: new Date(),
      status: 'completed',
    });

    return {
      transactionId: result.transactionId
    };

  } catch (error: any) {
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    purchaseStoreState.setLoading(false);
  }
};

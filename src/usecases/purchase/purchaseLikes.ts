// src/usecases/purchase/purchaseLikes.ts
// いいね購入のユースケース - いいね決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { purchaseStore } from '@stores/purchaseStore';

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
 * 1. ポイント残高チェック（不足時はエラースロー）
 * 2. ローディング開始
 * 3. サービス層でいいね購入処理
 * 4. 購入成功時、ポイント消費・いいね追加
 * 5. 購入履歴に記録
 * 6. エラー時は呼び出し元にスロー
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（取引ID）
 * @throws ポイント不足またはその他のエラーが発生した場合は例外をスロー
 */
export const purchaseLikes = async (data: PurchaseLikesData): Promise<PurchaseLikesResult> => {
  const { planId, amount, pointsCost } = data;
  const purchaseStoreState = purchaseStore.getState();

  try {
    // ポイント残高チェック
    const currentPoints = purchaseStoreState.currentPoints;
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

    // 購入成功時、ポイント消費・いいね追加
    purchaseStoreState.consumePoints(pointsCost);
    purchaseStoreState.setCurrentLikes(purchaseStoreState.currentLikes + amount);

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
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    purchaseStoreState.setLoading(false);
  }
};

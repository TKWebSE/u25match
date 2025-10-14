// src/usecases/purchase/purchaseBoosts.ts
// ブースト購入のユースケース - ブースト決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { purchaseStore } from '@stores/purchaseStore';

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
 * 1. ポイント残高チェック（不足時はエラースロー）
 * 2. ローディング開始
 * 3. サービス層でブースト購入処理
 * 4. 購入成功時、ポイント消費・ブースト追加
 * 5. 購入履歴に記録
 * 6. エラー時は呼び出し元にスロー
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（取引ID）
 * @throws ポイント不足またはその他のエラーが発生した場合は例外をスロー
 */
export const purchaseBoosts = async (data: PurchaseBoostsData): Promise<PurchaseBoostsResult> => {
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

    // サービス層でブースト購入処理
    const result = await serviceRegistry.payment.purchaseBoosts({
      planId,
      amount,
      pointsCost,
    });

    // 購入成功時、ポイント消費・ブースト追加
    purchaseStoreState.consumePoints(pointsCost);
    purchaseStoreState.setCurrentBoosts(purchaseStoreState.currentBoosts + amount);

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
    console.error('ブースト購入エラー:', error);
    // エラーを呼び出し元に再スロー
    throw error;
  } finally {
    purchaseStoreState.setLoading(false);
  }
};

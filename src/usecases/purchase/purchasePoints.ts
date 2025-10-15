// src/usecases/purchase/purchasePoints.ts
// ポイント購入のユースケース - ポイント決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { purchaseStore } from '@stores/purchaseStore';
import { getProfile } from '@usecases/profile/getProfile';

/**
 * ポイント購入に必要なデータ
 */
export interface PurchasePointsData {
  planId: string;        // 購入プランID
  amount: number;        // 購入ポイント数
  price: number;         // 価格（円）
  paymentMethod: string; // 決済方法（credit_card, apple_pay, google_pay）
}

/**
 * ポイント購入処理の結果
 */
export interface PurchasePointsResult {
  transactionId: string; // 取引ID
}

/**
 * ポイントを購入するユースケース
 * 
 * フロー:
 * 1. ローディング開始
 * 2. サービス層で決済処理
 * 3. 購入成功時、プロフィールを再取得（ポイント更新）
 * 4. 購入履歴に記録
 * 5. エラー時は呼び出し元にスロー
 * 
 * @param data - 購入データ（プラン・金額・決済方法）
 * @returns 購入結果（取引ID）
 * @throws エラーが発生した場合は例外をスロー
 */
export const purchasePoints = async (data: PurchasePointsData): Promise<PurchasePointsResult> => {
  const { planId, amount, price, paymentMethod } = data;
  const purchaseStoreState = purchaseStore.getState();
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser) {
      throw new Error('ログインが必要です');
    }

    // ローディング開始
    purchaseStoreState.setLoading(true);

    // サービス層で決済処理
    const result = await serviceRegistry.payment.purchasePoints({
      planId,
      amount,
      price,
      paymentMethod,
    });

    // 購入成功時、プロフィールを再取得（ポイント更新）
    await getProfile(currentUser.uid);

    // 購入履歴に記録
    purchaseStoreState.addPurchaseHistory({
      id: result.transactionId,
      type: 'points',
      amount,
      price,
      paymentMethod,
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

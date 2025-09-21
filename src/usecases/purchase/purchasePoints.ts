// src/usecases/purchase/purchasePoints.ts
// ポイント購入のユースケース - ポイント決済・購入処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { purchaseStore } from '@stores/purchaseStore';

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
  success: boolean;      // 購入成功フラグ
  transactionId?: string; // 取引ID（成功時）
  error?: string;        // エラーメッセージ（失敗時のみ）
}

/**
 * ポイントを購入するユースケース
 * 
 * フロー:
 * 1. ローディング開始・エラークリア
 * 2. サービス層で決済処理
 * 3. 購入成功時、ポイントをストアに追加
 * 4. 購入履歴に記録
 * 5. 結果をUIに返却
 * 
 * @param data - 購入データ（プラン・金額・決済方法）
 * @returns 購入結果（成功/失敗・取引ID・エラー）
 */
export const purchasePoints = async (data: PurchasePointsData): Promise<PurchasePointsResult> => {
  const { planId, amount, price, paymentMethod } = data;

  try {
    // ローディング開始・エラークリア
    purchaseStore.getState().setLoading(true);
    purchaseStore.getState().clearError();

    // サービス層で決済処理
    const result = await serviceRegistry.payment.purchasePoints({
      planId,
      amount,
      price,
      paymentMethod,
    });

    // 購入成功時、ポイントをストアに追加
    const currentPoints = purchaseStore.getState().currentPoints;
    purchaseStore.getState().setCurrentPoints(currentPoints + amount);

    // 購入履歴に記録
    purchaseStore.getState().addPurchaseHistory({
      id: result.transactionId,
      type: 'points',
      amount,
      price,
      paymentMethod,
      purchasedAt: new Date(),
      status: 'completed',
    });

    purchaseStore.getState().setLoading(false);

    return {
      success: true,
      transactionId: result.transactionId
    };

  } catch (error: any) {
    console.error('ポイント購入エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    purchaseStore.getState().setLoading(false);
    purchaseStore.getState().setError(error.message || 'ポイントの購入に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'ポイントの購入に失敗しました'
    };
  }
};

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
  success: boolean;      // 購入成功フラグ
  transactionId?: string; // 取引ID（成功時）
  error?: string;        // エラーメッセージ（失敗時のみ）
}

/**
 * ブーストを購入するユースケース
 * 
 * フロー:
 * 1. ポイント残高チェック
 * 2. ローディング開始・エラークリア
 * 3. サービス層でブースト購入処理
 * 4. 購入成功時、ポイント消費・ブースト追加
 * 5. 購入履歴に記録
 * 6. 結果をUIに返却
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（成功/失敗・取引ID・エラー）
 */
export const purchaseBoosts = async (data: PurchaseBoostsData): Promise<PurchaseBoostsResult> => {
  const { planId, amount, pointsCost } = data;

  try {
    // ポイント残高チェック
    const currentPoints = purchaseStore.getState().currentPoints;
    if (currentPoints < pointsCost) {
      return {
        success: false,
        error: 'ポイントが不足しています'
      };
    }

    // ローディング開始・エラークリア
    purchaseStore.getState().setLoading(true);
    purchaseStore.getState().clearError();

    // サービス層でブースト購入処理
    const result = await serviceRegistry.payment.purchaseBoosts({
      planId,
      amount,
      pointsCost,
    });

    // 購入成功時、ポイント消費・ブースト追加
    purchaseStore.getState().consumePoints(pointsCost);
    const currentBoosts = purchaseStore.getState().currentBoosts;
    purchaseStore.getState().setCurrentBoosts(currentBoosts + amount);

    // 購入履歴に記録
    purchaseStore.getState().addPurchaseHistory({
      id: result.transactionId,
      type: 'boosts',
      amount,
      pointsCost,
      purchasedAt: new Date(),
      status: 'completed',
    });

    purchaseStore.getState().setLoading(false);

    return {
      success: true,
      transactionId: result.transactionId
    };

  } catch (error: any) {
    console.error('ブースト購入エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    purchaseStore.getState().setLoading(false);
    purchaseStore.getState().setError(error.message || 'ブーストの購入に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'ブーストの購入に失敗しました'
    };
  }
};

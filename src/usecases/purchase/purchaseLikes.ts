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
  success: boolean;      // 購入成功フラグ
  transactionId?: string; // 取引ID（成功時）
  error?: string;        // エラーメッセージ（失敗時のみ）
}

/**
 * いいねを購入するユースケース
 * 
 * フロー:
 * 1. ポイント残高チェック
 * 2. ローディング開始・エラークリア
 * 3. サービス層でいいね購入処理
 * 4. 購入成功時、ポイント消費・いいね追加
 * 5. 購入履歴に記録
 * 6. 結果をUIに返却
 * 
 * @param data - 購入データ（プラン・数量・ポイント消費）
 * @returns 購入結果（成功/失敗・取引ID・エラー）
 */
export const purchaseLikes = async (data: PurchaseLikesData): Promise<PurchaseLikesResult> => {
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

    // サービス層でいいね購入処理
    const result = await serviceRegistry.payment.purchaseLikes({
      planId,
      amount,
      pointsCost,
    });

    // 購入成功時、ポイント消費・いいね追加
    purchaseStore.getState().consumePoints(pointsCost);
    const currentLikes = purchaseStore.getState().currentLikes;
    purchaseStore.getState().setCurrentLikes(currentLikes + amount);

    // 購入履歴に記録
    purchaseStore.getState().addPurchaseHistory({
      id: result.transactionId,
      type: 'likes',
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
    console.error('いいね購入エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    purchaseStore.getState().setLoading(false);
    purchaseStore.getState().setError(error.message || 'いいねの購入に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'いいねの購入に失敗しました'
    };
  }
};

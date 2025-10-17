// src/services/payment/prod.ts
// 🌐 決済サービスの本番実装

import { PaymentService } from './types';

export class ProdPaymentService implements PaymentService {
  /**
   * 💳 ポイントを購入（本番）
   * @param data 購入データ（プランID・金額・価格・決済方法）
   * @returns 取引ID
   */
  async purchasePoints(data: { planId: string; amount: number; price: number; paymentMethod: string }): Promise<{ transactionId: string }> {
    try {
      const response = await fetch('/api/payment/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`ポイントの購入に失敗しました: ${response.statusText}`);
      }

      const result = await response.json();
      return { transactionId: result.transactionId };
    } catch (error: any) {
      throw new Error(error.message || 'ポイントの購入に失敗しました');
    }
  }

  /**
   * 🚀 ブーストを購入（本番）
   * @param data 購入データ（プランID・数量・ポイントコスト）
   * @returns 取引ID
   */
  async purchaseBoosts(data: { planId: string; amount: number; pointsCost: number }): Promise<{ transactionId: string }> {
    try {
      const response = await fetch('/api/payment/boosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`ブーストの購入に失敗しました: ${response.statusText}`);
      }

      const result = await response.json();
      return { transactionId: result.transactionId };
    } catch (error: any) {
      throw new Error(error.message || 'ブーストの購入に失敗しました');
    }
  }

  /**
   * ❤️ いいねを購入（本番）
   * @param data 購入データ（プランID・数量・ポイントコスト）
   * @returns 取引ID
   */
  async purchaseLikes(data: { planId: string; amount: number; pointsCost: number }): Promise<{ transactionId: string }> {
    try {
      const response = await fetch('/api/payment/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`いいねの購入に失敗しました: ${response.statusText}`);
      }

      const result = await response.json();
      return { transactionId: result.transactionId };
    } catch (error: any) {
      throw new Error(error.message || 'いいねの購入に失敗しました');
    }
  }
}

// src/services/payment/mock.ts

import { BaseService } from '../core/BaseService';
import { PaymentService } from './types';

export class MockPaymentService extends BaseService implements PaymentService {
  async purchasePoints(data: { planId: string; amount: number; price: number; paymentMethod: string }) {
    await this.delay(2000);
    return { transactionId: `points_${Date.now()}` };
  }

  async purchaseBoosts(data: { planId: string; amount: number; pointsCost: number }) {
    await this.delay(1000);
    return { transactionId: `boosts_${Date.now()}` };
  }

  async purchaseLikes(data: { planId: string; amount: number; pointsCost: number }) {
    await this.delay(1000);
    return { transactionId: `likes_${Date.now()}` };
  }
}

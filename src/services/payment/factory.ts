// src/services/payment/factory.ts
// 🏭 決済サービス工場 - 環境判定と生成の責任のみ

import { getServiceMode } from '@utils/serviceConfig';
import { MockPaymentService } from './mock';
import { ProdPaymentService } from './prod';
import { PaymentService } from './types';

export function createPaymentService(): PaymentService {
  const mode = getServiceMode('PAYMENT');

  if (mode === 'firebase') {
    return new ProdPaymentService();
  } else {
    return new MockPaymentService();
  }
}

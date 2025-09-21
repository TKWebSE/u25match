// src/services/payment/factory.ts

import { isDevMode } from '@utils/devMode';
import { MockPaymentService } from './mock';
import { PaymentService } from './types';

export function createPaymentService(): PaymentService {
  if (isDevMode()) {
    return new MockPaymentService();
  }
  return new MockPaymentService(); // TODO: 本番実装
}

// src/services/payment/factory.ts
// 🏭 決済サービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
import { MockPaymentService } from './mock';
import { PaymentService } from './types';

export function createPaymentService(): PaymentService {
  const mode = getServiceMode('PAYMENT');
  const configInfo = getServiceConfigInfo('PAYMENT');

  console.log('🔧 決済サービス生成中...');
  console.log('📋 決済サービス設定:', configInfo);

  if (mode === 'firebase') {
    console.log('🔥 Firebase決済サービスを生成');
    // TODO: 本番実装
    return new MockPaymentService();
  } else {
    console.log('🎭 モック決済サービスを生成');
    return new MockPaymentService();
  }
}

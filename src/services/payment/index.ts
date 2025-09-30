// src/services/payment/index.ts
// 決済サービスのエントリーポイント

import { createPaymentService } from './factory';

// サービス実装のエクスポート
export { MockPaymentService } from './mock';
export { ProdPaymentService } from './prod';
export { PaymentService } from './types';

// ファクトリー関数のエクスポート
export { createPaymentService } from './factory';

// デフォルトエクスポート（ServiceRegistryで使用）
export default createPaymentService;

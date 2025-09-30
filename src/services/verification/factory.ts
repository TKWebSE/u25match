// src/services/verification/factory.ts
// 🏭 本人確認サービス工場 - 環境判定と生成の責任のみ

import { getServiceMode } from '@utils/serviceConfig';
import { MockVerificationService } from './mock';
import { VerificationService } from './types';

export function createVerificationService(): VerificationService {
  const mode = getServiceMode('VERIFICATION');

  if (mode === 'firebase') {
    // TODO: 本番実装
    return new MockVerificationService();
  } else {
    return new MockVerificationService();
  }
}

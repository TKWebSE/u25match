// src/services/verification/factory.ts
// 🏭 本人確認サービス工場 - 環境判定と生成の責任のみ

import { getServiceConfigInfo, getServiceMode } from '@utils/serviceConfig';
import { MockVerificationService } from './mock';
import { VerificationService } from './types';

export function createVerificationService(): VerificationService {
  const mode = getServiceMode('VERIFICATION');
  const configInfo = getServiceConfigInfo('VERIFICATION');

  console.log('🔧 本人確認サービス生成中...');
  console.log('📋 本人確認サービス設定:', configInfo);

  if (mode === 'firebase') {
    console.log('🔥 Firebase本人確認サービスを生成');
    // TODO: 本番実装
    return new MockVerificationService();
  } else {
    console.log('🎭 モック本人確認サービスを生成');
    return new MockVerificationService();
  }
}

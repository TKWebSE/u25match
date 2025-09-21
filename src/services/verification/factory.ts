// src/services/verification/factory.ts

import { isDevMode } from '@utils/devMode';
import { MockVerificationService } from './mock';
import { VerificationService } from './types';

export function createVerificationService(): VerificationService {
  if (isDevMode()) {
    return new MockVerificationService();
  }
  return new MockVerificationService(); // TODO: 本番実装
}

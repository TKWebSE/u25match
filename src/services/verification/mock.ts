// src/services/verification/mock.ts

import { BaseService } from '../core/BaseService';
import { VerificationService } from './types';

export class MockVerificationService extends BaseService implements VerificationService {
  async uploadDocument(data: { file: File; documentType: string }) {
    await this.delay(1000);
    return { documentId: `mock_doc_${Date.now()}` };
  }

  async resubmitDocument(data: { file: File; documentType: string; previousDocumentId: string }) {
    await this.delay(1000);
    return { documentId: `mock_resubmit_${Date.now()}` };
  }

  async getStatus() {
    await this.delay(500);
    return {
      status: 'under_review',
      documents: [],
      reviewHistory: [],
      lastUpdated: new Date()
    };
  }
}

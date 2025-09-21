// src/services/verification/types.ts

export interface VerificationService {
  uploadDocument(data: { file: File; documentType: string }): Promise<{ documentId: string }>;
  resubmitDocument(data: { file: File; documentType: string; previousDocumentId: string }): Promise<{ documentId: string }>;
  getStatus(): Promise<{ status: string; documents?: any[]; reviewHistory?: any[]; lastUpdated?: Date }>;
}

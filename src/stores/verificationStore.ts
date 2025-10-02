// src/stores/verificationStore.ts
// 本人確認状態管理ストア - 書類アップロード・審査状況・認証ステータスを担当

import { create } from 'zustand';

/**
 * 本人確認のステータス
 */
export type VerificationStatus =
  | 'not_started'    // 未開始
  | 'uploading'      // アップロード中
  | 'uploaded'       // アップロード完了
  | 'under_review'   // 審査中
  | 'approved'       // 承認済み
  | 'rejected'       // 拒否
  | 'expired';       // 期限切れ

/**
 * アップロードされた書類の情報
 */
export interface UploadedDocument {
  id: string;
  type: 'identity_card' | 'passport' | 'driver_license'; // 書類の種類
  fileName: string;
  uploadedAt: Date;
  status: VerificationStatus;
  rejectionReason?: string; // 拒否理由（拒否時のみ）
}

/**
 * 本人確認関連の状態
 */
interface VerificationState {
  status: VerificationStatus;           // 全体のステータス
  documents: UploadedDocument[];        // アップロード済み書類一覧
  currentUpload: {                      // 現在のアップロード状況
    isUploading: boolean;
    progress: number;                   // アップロード進捗（0-100）
    fileName?: string;
  };
  reviewHistory: any[];                 // 審査履歴
  isLoading: boolean;                   // 処理中フラグ
}

/**
 * 本人確認関連のアクション
 */
interface VerificationActions {
  setStatus: (status: VerificationStatus) => void;
  setDocuments: (documents: UploadedDocument[]) => void;
  addDocument: (document: UploadedDocument) => void;
  updateDocument: (id: string, updates: Partial<UploadedDocument>) => void;
  removeDocument: (id: string) => void;
  setUploadProgress: (progress: number, fileName?: string) => void;
  setUploading: (isUploading: boolean) => void;
  setReviewHistory: (history: any[]) => void;
  addReviewHistory: (review: any) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void; // 状態をリセット
}

type VerificationStore = VerificationState & VerificationActions;

/**
 * 本人確認ストア
 */
export const verificationStore = create<VerificationStore>((set) => ({
  // 初期状態
  status: 'not_started',
  documents: [],
  currentUpload: {
    isUploading: false,
    progress: 0,
  },
  reviewHistory: [],
  isLoading: false,
  error: null,

  // アクション
  setStatus: (status) => set({ status }),
  setDocuments: (documents) => set({ documents }),
  addDocument: (document) => set((state) => ({
    documents: [...state.documents, document]
  })),
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(doc =>
      doc.id === id ? { ...doc, ...updates } : doc
    )
  })),
  removeDocument: (id) => set((state) => ({
    documents: state.documents.filter(doc => doc.id !== id)
  })),
  setUploadProgress: (progress, fileName) => set((state) => ({
    currentUpload: {
      ...state.currentUpload,
      progress,
      fileName: fileName || state.currentUpload.fileName
    }
  })),
  setUploading: (isUploading) => set((state) => ({
    currentUpload: {
      ...state.currentUpload,
      isUploading,
      progress: isUploading ? 0 : state.currentUpload.progress
    }
  })),
  setReviewHistory: (reviewHistory) => set({ reviewHistory }),
  addReviewHistory: (review) => set((state) => ({
    reviewHistory: [review, ...state.reviewHistory]
  })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    status: 'not_started',
    documents: [],
    currentUpload: { isUploading: false, progress: 0 },
    reviewHistory: [],
    isLoading: false,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useVerificationStore = () => verificationStore();

// src/usecases/verification/resubmitDocument.ts
// 本人確認書類再提出のユースケース - 拒否された書類の再アップロード処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { UploadedDocument, verificationStore } from '@stores/verificationStore';

/**
 * 書類再提出に必要なデータ
 */
export interface ResubmitDocumentData {
  file: File;                                                    // 新しいファイル
  documentType: 'identity_card' | 'passport' | 'driver_license'; // 書類の種類
  previousDocumentId: string;                                    // 前回の書類ID
}

/**
 * 書類再提出処理の結果
 */
export interface ResubmitDocumentResult {
  success: boolean;        // 再提出成功フラグ
  documentId?: string;     // 新しい書類ID（成功時）
  error?: string;          // エラーメッセージ（失敗時のみ）
}

/**
 * 本人確認書類を再提出するユースケース
 * 
 * フロー:
 * 1. 前回書類の拒否状態確認
 * 2. ファイル形式・サイズバリデーション
 * 3. 古い書類の削除・新しい書類のアップロード
 * 4. 書類情報をストアで更新
 * 5. ステータス更新（rejected → under_review）
 * 6. 再提出履歴に記録
 * 7. 結果をUIに返却
 * 
 * @param data - 再提出データ（ファイル・書類種別・前回ID）
 * @returns 再提出結果（成功/失敗・書類ID・エラー）
 */
export const resubmitDocument = async (data: ResubmitDocumentData): Promise<ResubmitDocumentResult> => {
  const { file, documentType, previousDocumentId } = data;

  try {
    // 前回書類の拒否状態確認
    const previousDocument = verificationStore.getState().documents.find(
      doc => doc.id === previousDocumentId
    );

    if (!previousDocument || previousDocument.status !== 'rejected') {
      return {
        success: false,
        error: '再提出可能な書類が見つかりません'
      };
    }

    // ファイル形式・サイズバリデーション
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'JPG、PNG、PDFファイルのみアップロード可能です'
      };
    }

    if (file.size > maxSize) {
      return {
        success: false,
        error: 'ファイルサイズは10MB以下にしてください'
      };
    }

    // アップロード開始・進捗管理
    verificationStore.getState().clearError();
    verificationStore.getState().setUploading(true);
    verificationStore.getState().setUploadProgress(0, file.name);

    // 進捗更新のシミュレーション
    const progressInterval = setInterval(() => {
      const currentProgress = verificationStore.getState().currentUpload.progress;
      if (currentProgress < 90) {
        verificationStore.getState().setUploadProgress(currentProgress + 10);
      }
    }, 200);

    // サービス層で書類再提出
    const result = await serviceRegistry.verification.resubmitDocument({
      file,
      documentType,
      previousDocumentId,
    });

    // 進捗完了
    clearInterval(progressInterval);
    verificationStore.getState().setUploadProgress(100);

    // 古い書類を削除・新しい書類を追加
    verificationStore.getState().removeDocument(previousDocumentId);

    const newDocument: UploadedDocument = {
      id: result.documentId,
      type: documentType,
      fileName: file.name,
      uploadedAt: new Date(),
      status: 'uploaded',
    };

    verificationStore.getState().addDocument(newDocument);

    // ステータス更新（rejected → under_review）
    verificationStore.getState().setStatus('under_review');

    // 再提出履歴に記録
    verificationStore.getState().addReviewHistory({
      id: `resubmit_${Date.now()}`,
      action: 'document_resubmitted',
      documentType,
      fileName: file.name,
      previousDocumentId,
      rejectionReason: previousDocument.rejectionReason,
      timestamp: new Date(),
    });

    verificationStore.getState().setUploading(false);

    return {
      success: true,
      documentId: result.documentId
    };

  } catch (error: any) {
    console.error('書類再提出エラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    verificationStore.getState().setUploading(false);
    verificationStore.getState().setUploadProgress(0);
    verificationStore.getState().setError(error.message || '書類の再提出に失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || '書類の再提出に失敗しました'
    };
  }
};

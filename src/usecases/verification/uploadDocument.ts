// src/usecases/verification/uploadDocument.ts
// 本人確認書類アップロードのユースケース - 書類アップロード・検証処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { UploadedDocument, verificationStore } from '@stores/verificationStore';

/**
 * 書類アップロードに必要なデータ
 */
export interface UploadDocumentData {
  file: File;                                                    // アップロードファイル
  documentType: 'identity_card' | 'passport' | 'driver_license'; // 書類の種類
}

/**
 * 本人確認書類をアップロードするユースケース
 * 
 * フロー:
 * 1. ファイル形式・サイズバリデーション
 * 2. アップロード開始・進捗管理
 * 3. サービス層でファイルアップロード
 * 4. 書類情報をストアに追加
 * 5. ステータス更新（uploaded → under_review）
 * 6. 結果をUIに返却
 * 
 * @param data - アップロードデータ（ファイル・書類種別）
 * @returns アップロード結果（成功/失敗）
 */
export const uploadDocument = async (data: UploadDocumentData): Promise<boolean> => {
  const { file, documentType } = data;
  const store = verificationStore.getState();

  try {
    // ファイル形式・サイズバリデーション
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('JPG、PNG、PDFファイルのみアップロード可能です');
    }

    if (file.size > maxSize) {
      throw new Error('ファイルサイズは10MB以下にしてください');
    }

    // アップロード開始・進捗管理
    store.setUploading(true);
    store.setUploadProgress(0, file.name);

    // 進捗更新のシミュレーション（実際のアップロード時に調整）
    const progressInterval = setInterval(() => {
      const currentProgress = verificationStore.getState().currentUpload.progress;
      if (currentProgress < 90) {
        verificationStore.getState().setUploadProgress(currentProgress + 10);
      }
    }, 200);

    // サービス層でファイルアップロード
    const result = await serviceRegistry.verification.uploadDocument({
      file,
      documentType,
    });

    // 進捗完了
    clearInterval(progressInterval);
    store.setUploadProgress(100);

    // 書類情報をストアに追加
    const document: UploadedDocument = {
      id: result.documentId,
      type: documentType,
      fileName: file.name,
      uploadedAt: new Date(),
      status: 'uploaded',
    };

    store.addDocument(document);

    // ステータス更新（uploaded → under_review）
    store.setStatus('under_review');

    // 審査履歴に記録
    store.addReviewHistory({
      id: `upload_${Date.now()}`,
      action: 'document_uploaded',
      documentType,
      fileName: file.name,
      timestamp: new Date(),
    });

    return true;

  } catch (error: any) {
    throw error;

  } finally {
    store.setUploading(false);
  }
};

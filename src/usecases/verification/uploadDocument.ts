// src/usecases/verification/uploadDocument.ts
// 本人確認書類アップロード（表裏2枚同時・最小実装）
// - 呼び出し側は front/back の2枚を必須で渡す
// - ストアや進捗管理、ID返却は行わない

import { serviceRegistry } from '@services/core/ServiceRegistry';

// アップロード要求データ（表面/裏面の2枚必須）
export interface UploadDocumentData {
  files: {
    front: File;
    back: File;
  };
  documentType: 'identity_card' | 'passport' | 'driver_license';
}

// 表裏2枚を同時にアップロードする（IDは返さない）
export const uploadDocument = async (data: UploadDocumentData): Promise<void> => {
  const { files, documentType } = data;
  const { front, back } = files;

  try {
    // 入力必須チェック
    if (!front || !back) {
      throw new Error('表面と裏面の両方のファイルを選択してください');
    }

    // 簡易バリデーション（必要最小限）
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const check = (f: File) => {
      if (!allowedTypes.includes(f.type)) throw new Error('JPG、PNG、PDFのみアップロード可能です');
      if (f.size > maxSize) throw new Error('ファイルサイズは10MB以下にしてください');
    };

    // バリデーションを実行する
    check(front);
    check(back);

    // 単枚APIを2回並列実行
    await Promise.all([
      serviceRegistry.verification.uploadDocument({ file: front, documentType }),
      serviceRegistry.verification.uploadDocument({ file: back, documentType }),
    ]);
  } catch (error) {
    throw error;
  }
};

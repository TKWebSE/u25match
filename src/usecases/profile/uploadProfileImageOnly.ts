// src/usecases/profile/uploadProfileImageOnly.ts
// プロフィール画像アップロード専用ユースケース - 画像アップロードのみを担当（プロフィール更新は行わない）

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { authStore } from '@stores/authStore';
import { getUploadRequiredIndices, uriToFile } from '@utils/imageUtils';
import { validateImageFileSize, validateImageFileType } from '@utils/validation/imageValidation';

/**
 * プロフィール画像をアップロードするユースケース（画像アップロードのみ）
 * 
 * このユースケースは画像のアップロードのみを行い、プロフィール更新は行いません。
 * プロフィール編集画面で複数画像を一括アップロード→最後にまとめて保存する用途に使用します。
 * 
 * フロー:
 * 1. ログインチェック
 * 2. ファイル形式・サイズバリデーション
 * 3. サービス層で画像アップロード
 * 4. アップロード後の画像URLを返す
 * 
 * @param uid - 対象のユーザーID
 * @param file - アップロードファイル
 * @param imageIndex - 画像のインデックス（複数画像対応）
 * @returns アップロード後の画像URL
 */
export const uploadProfileImageOnly = async (
  uid: string,
  file: File,
  imageIndex: number
): Promise<string> => {
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error('自分のプロフィール画像のみアップロードできます');
    }

    // バリデーション
    validateImageFileType(file);
    validateImageFileSize(file);

    // サービス層で画像アップロード（プロフィール更新は行わない）
    const uploadResult = await serviceRegistry.profileDetail.uploadProfileImage(uid, file, imageIndex);

    // アップロード後の画像URLを返す
    return uploadResult.imageUrl;

  } catch (error: any) {
    throw new Error(error.message || 'プロフィール画像のアップロードに失敗しました');
  }
};

/**
 * 複数のプロフィール画像を一括アップロードするユースケース
 * 
 * このユースケースは、画像配列から新規画像（ローカルURI）を検出し、
 * それらを一括でアップロードして、すべての画像URLの配列を返します。
 * 
 * ビジネスロジック:
 * 1. ログインチェック
 * 2. 新規画像（ローカルURI）のインデックスを取得
 * 3. 各新規画像をループでアップロード
 *    - URIからFileに変換
 *    - バリデーション実施
 *    - Firebase Storageにアップロード
 *    - 進捗コールバックを呼び出し
 * 4. アップロード済みURLの配列を返す
 * 
 * @param uid - 対象のユーザーID
 * @param images - 画像URL/URIの配列（既存URLと新規URIが混在）
 * @param onProgress - 進捗コールバック（例: "画像アップロード中 2/3"）
 * @returns アップロード後のすべての画像URLの配列
 */
export const uploadMultipleProfileImages = async (
  uid: string,
  images: string[],
  onProgress?: (progress: string) => void
): Promise<string[]> => {
  const currentUser = authStore.getState().user;

  try {
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error('自分のプロフィール画像のみアップロードできます');
    }

    // 新規画像（ローカルURI）のインデックスを取得
    const uploadIndices = getUploadRequiredIndices(images);

    // アップロードが不要な場合はそのまま返す
    if (uploadIndices.length === 0) {
      return images;
    }

    // アップロード処理
    const uploadedImages = [...images];

    for (let i = 0; i < uploadIndices.length; i++) {
      const index = uploadIndices[i];
      const localUri = images[index];

      // 進捗コールバック
      if (onProgress) {
        onProgress(`画像アップロード中 ${i + 1}/${uploadIndices.length}`);
      }

      try {
        // URIからFileに変換
        const file = await uriToFile(localUri);

        // バリデーション
        validateImageFileType(file);
        validateImageFileSize(file);

        // サービス層で画像アップロード
        const uploadResult = await serviceRegistry.profileDetail.uploadProfileImage(uid, file, index);

        // アップロード後のURLで置き換え
        uploadedImages[index] = uploadResult.imageUrl;
      } catch (uploadError: any) {
        // 個別の画像アップロードエラー
        throw new Error(`画像${i + 1}のアップロードに失敗しました: ${uploadError.message}`);
      }
    }

    return uploadedImages;

  } catch (error: any) {
    throw new Error(error.message || '画像のアップロードに失敗しました');
  }
};


// src/usecases/profile/uploadProfileImage.ts
// プロフィール画像アップロードのユースケース - プロフィール画像アップロード・更新処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { profileStore } from '@stores/profileStore';

/**
 * 画像アップロードに必要なデータ
 */
export interface UploadProfileImageData {
  file: File;              // アップロードファイル
  imageIndex?: number;     // 画像のインデックス（複数画像対応）
}

/**
 * 画像アップロード処理の結果
 */
export interface UploadProfileImageResult {
  success: boolean;        // アップロード成功フラグ
  imageUrl?: string;       // 画像URL（成功時）
  error?: string;          // エラーメッセージ（失敗時のみ）
}

/**
 * プロフィール画像をアップロードするユースケース
 * 
 * フロー:
 * 1. 現在のプロフィール確認
 * 2. ファイル形式・サイズバリデーション
 * 3. 保存開始・エラークリア
 * 4. サービス層で画像アップロード
 * 5. プロフィール情報の画像URLを更新
 * 6. ストア状態を更新
 * 7. 結果をUIに返却
 * 
 * @param uid - 対象のユーザーID
 * @param data - アップロードデータ（ファイル・インデックス）
 * @returns 画像アップロード結果（成功/失敗・画像URL・エラー）
 */
export const uploadProfileImage = async (uid: string, data: UploadProfileImageData): Promise<UploadProfileImageResult> => {
  const { file, imageIndex = 0 } = data;
  const profileStoreState = profileStore.getState();

  try {
    // 現在のプロフィール確認
    const currentProfile = profileStoreState.currentProfile;
    if (!currentProfile || currentProfile.uid !== uid) {
      return {
        success: false,
        error: '更新対象のプロフィールが見つかりません'
      };
    }

    // ファイル形式・サイズバリデーション
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'JPG、PNG、WebPファイルのみアップロード可能です'
      };
    }

    if (file.size > maxSize) {
      return {
        success: false,
        error: 'ファイルサイズは5MB以下にしてください'
      };
    }

    // 保存開始・エラークリア
    profileStoreState.setSaving(true);
    profileStoreState.clearError();

    // サービス層で画像アップロード
    const uploadResult = await serviceRegistry.profileDetail.uploadProfileImage(uid, file, imageIndex);

    // プロフィール情報の画像URLを更新
    const currentImages = currentProfile.images || [];
    const updatedImages = [...currentImages];
    updatedImages[imageIndex] = uploadResult.imageUrl;

    // サービス層でプロフィール更新
    await serviceRegistry.profileDetail.updateProfileDetail(uid, {
      images: updatedImages,
      updatedAt: new Date(),
    });

    // ストア状態を更新
    const updatedProfile = {
      ...currentProfile,
      images: updatedImages,
      updatedAt: new Date(),
    };

    profileStoreState.setCurrentProfile(updatedProfile);

    // 編集中の場合は編集状態も更新
    const editingProfile = profileStoreState.editingProfile;
    if (editingProfile) {
      profileStoreState.updateEditingProfile({ images: updatedImages });
    }

    profileStoreState.setSaving(false);

    return {
      success: true,
      imageUrl: uploadResult.imageUrl
    };

  } catch (error: any) {
    console.error('プロフィール画像アップロードエラー:', error);

    // エラー処理（ストアにエラー情報を設定）
    profileStoreState.setSaving(false);
    profileStoreState.setError(error.message || 'プロフィール画像のアップロードに失敗しました');

    // UIに結果を返却
    return {
      success: false,
      error: error.message || 'プロフィール画像のアップロードに失敗しました'
    };
  }
};

// src/usecases/profile/uploadProfileImage.ts
// プロフィール画像アップロードのユースケース - プロフィール画像アップロード・更新処理を担当

import { serviceRegistry } from '@services/core/ServiceRegistry';
import { profileStore } from '@stores/profileStore';
import { validateImageFileSize, validateImageFileType } from '@utils/validation/imageValidation';

/**
 * 画像アップロードに必要なデータ
 */
export interface UploadProfileImageData {
  file: File;              // アップロードファイル
  imageIndex?: number;     // 画像のインデックス（複数画像対応）
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
 * 7. 成功時はtrueを返し、エラー時はスロー
 * 
 * @param uid - 対象のユーザーID
 * @param data - アップロードデータ（ファイル・インデックス）
 * @returns 画像アップロード成功時はtrue
 */
export const uploadProfileImage = async (uid: string, data: UploadProfileImageData): Promise<boolean> => {
  const { file, imageIndex = 0 } = data;
  const profileStoreState = profileStore.getState();

  try {
    const currentProfile = profileStoreState.currentProfile;
    if (!currentProfile || currentProfile.uid !== uid) {
      throw new Error('更新対象のプロフィールが見つかりません');
    }

    // バリデーション
    validateImageFileType(file);
    validateImageFileSize(file);

    // 保存開始
    profileStoreState.setSaving(true);

    // サービス層で画像アップロード
    const uploadResult = await serviceRegistry.profileDetail.uploadProfileImage(uid, file, imageIndex);

    const currentImages = currentProfile.images || [];
    const updatedImages = [...currentImages];
    updatedImages[imageIndex] = uploadResult.imageUrl;

    await serviceRegistry.profileDetail.updateProfileDetail(uid, {
      images: updatedImages,
      updatedAt: new Date(),
    });

    const updatedProfile = {
      ...currentProfile,
      images: updatedImages,
      updatedAt: new Date(),
    };

    profileStoreState.setCurrentProfile(updatedProfile);

    const editingProfile = profileStoreState.editingProfile;
    if (editingProfile) {
      profileStoreState.updateEditingProfile({ images: updatedImages });
    }

    profileStoreState.setSaving(false);

    return true;

  } catch (error: any) {
    profileStoreState.setSaving(false);
    throw new Error(error.message || 'プロフィール画像のアップロードに失敗しました');
  }
};

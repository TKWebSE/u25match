import { useVerificationStore } from '@stores/verificationStore';
import { uploadDocument } from '@usecases/verification';
import { uriToFile } from '@utils/imageUtils';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

type ImageSide = 'front' | 'back';

/**
 * 本人確認フロー用のフック
 */
export const useVerificationFlow = () => {
  const router = useRouter();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const { currentUpload } = useVerificationStore();

  // 指定された面の画像URIを更新
  const updateImage = useCallback(
    (side: ImageSide, uri: string | null) => {
      if (side === 'front') {
        setFrontImage(uri);
        return;
      }
      setBackImage(uri);
    },
    []
  );

  // 指定された面の画像を削除
  const removeImage = useCallback(
    (side: ImageSide) => {
      updateImage(side, null);
    },
    [updateImage]
  );

  // カメラで撮影して画像を取得
  const takePhoto = useCallback(
    async (side: ImageSide) => {
      try {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          Alert.alert('権限が必要です', '写真を撮影するためにカメラへのアクセス権限が必要です。');
          return;
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          updateImage(side, result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert('エラー', '写真の撮影中にエラーが発生しました。');
      }
    },
    [updateImage]
  );

  // ギャラリーから画像を選択
  const pickFromGallery = useCallback(
    async (side: ImageSide) => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          Alert.alert('権限が必要です', '写真を選択するためにギャラリーへのアクセス権限が必要です。');
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          updateImage(side, result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert('エラー', '写真の選択中にエラーが発生しました。');
      }
    },
    [updateImage]
  );

  // 画像選択手段をユーザーに提示
  const showImagePickerOptions = useCallback(
    (side: ImageSide) => {
      Alert.alert('写真を選択', '写真を撮影するか、ギャラリーから選択してください。', [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'カメラで撮影', onPress: () => takePhoto(side) },
        { text: 'ギャラリーから選択', onPress: () => pickFromGallery(side) },
      ]);
    },
    [pickFromGallery, takePhoto]
  );

  // 本人確認書類のアップロード処理を実行
  const handleStartVerification = useCallback(async () => {
    if (!frontImage || !backImage) {
      showErrorToast('身分証明書の表裏両方の写真をアップロードしてください');
      return;
    }

    try {
      const frontFile = await uriToFile(frontImage, 'front.jpg');
      await uploadDocument({
        file: frontFile,
        documentType: 'identity_card',
      });

      const backFile = await uriToFile(backImage, 'back.jpg');
      await uploadDocument({
        file: backFile,
        documentType: 'identity_card',
      });

      showSuccessToast('本人確認の申請を受け付けました。審査完了まで1-3営業日程度かかります。');
      router.back();
    } catch (error: any) {
      showErrorToast(error.message || '本人確認の申請に失敗しました');
    }
  }, [backImage, frontImage, router]);

  return {
    frontImage,
    backImage,
    isUploading: currentUpload.isUploading,
    showImagePickerOptions,
    removeImage,
    handleStartVerification,
  };
};


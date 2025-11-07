import { HeaderSection, NoticeList, PhotoUploader, StepsSection, VerificationActions } from '@components/verification';
import { useVerificationStore } from '@stores/verificationStore';
import { uploadDocument } from '@usecases/verification';
import { uriToFile } from '@utils/imageUtils';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 本人確認画面
 *
 * 主な責務：
 * - 本人確認手順の案内
 * - 必要書類の説明
 * - 書類アップロード処理の実行
 * - 注意事項の表示
 */
const VerificationScreen = () => {
  const router = useRouter();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const { currentUpload } = useVerificationStore();
  const isUploading = currentUpload.isUploading;

  /**
   * 写真選択方法を選択する処理
   */
  const showImagePickerOptions = (type: 'front' | 'back') => {
    Alert.alert(
      '写真を選択',
      '写真を撮影するか、ギャラリーから選択してください。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'カメラで撮影', onPress: () => takePhoto(type) },
        { text: 'ギャラリーから選択', onPress: () => pickFromGallery(type) },
      ]
    );
  };

  /**
   * カメラで写真を撮影する処理
   */
  const takePhoto = async (type: 'front' | 'back') => {
    try {
      // カメラの権限をリクエスト
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
        if (type === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      Alert.alert('エラー', '写真の撮影中にエラーが発生しました。');
    }
  };

  /**
   * ギャラリーから写真を選択する処理
   */
  const pickFromGallery = async (type: 'front' | 'back') => {
    try {
      // ギャラリーの権限をリクエスト
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
        if (type === 'front') {
          setFrontImage(result.assets[0].uri);
        } else {
          setBackImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      Alert.alert('エラー', '写真の選択中にエラーが発生しました。');
    }
  };

  /**
   * 写真を削除する処理
   */
  const removeImage = (type: 'front' | 'back') => {
    if (type === 'front') {
      setFrontImage(null);
    } else {
      setBackImage(null);
    }
  };

  /**
   * 本人確認の開始処理
   */
  const handleStartVerification = async () => {
    if (!frontImage || !backImage) {
      showErrorToast('身分証明書の表裏両方の写真をアップロードしてください');
      return;
    }

    try {
      // 表面のアップロード
      const frontFile = await uriToFile(frontImage, 'front.jpg');
      await uploadDocument({
        file: frontFile,
        documentType: 'identity_card',
      });

      // 裏面のアップロード
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeaderSection />
        <StepsSection />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>身分証明書の写真をアップロード</Text>
          <PhotoUploader
            label="表面（顔写真がある面）"
            imageUri={frontImage}
            onSelect={() => showImagePickerOptions('front')}
            onRemove={() => removeImage('front')}
          />
          <PhotoUploader
            label="裏面"
            imageUri={backImage}
            onSelect={() => showImagePickerOptions('back')}
            onRemove={() => removeImage('back')}
          />
        </View>

        <NoticeList />
        <VerificationActions isLoading={isUploading} onSubmit={handleStartVerification} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
});

export default VerificationScreen;

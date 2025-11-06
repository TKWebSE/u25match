import { useVerificationStore } from '@stores/verificationStore';
import { uploadDocument } from '@usecases/verification';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 本人確認スクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - 本人確認の手順説明
 * - 必要な書類の案内
 * - 本人確認の開始処理
 * - 注意事項の表示
 */
const VerificationScreen = () => {
  const router = useRouter();
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const { isUploading, error } = useVerificationStore();

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
      const frontFile = await createFileFromUri(frontImage, 'front.jpg');
      const frontResult = await uploadDocument({
        file: frontFile,
        documentType: 'identity_card',
      });

      if (!frontResult.success) {
        showErrorToast(frontResult.error || '表面のアップロードに失敗しました');
        return;
      }

      // 裏面のアップロード
      const backFile = await createFileFromUri(backImage, 'back.jpg');
      const backResult = await uploadDocument({
        file: backFile,
        documentType: 'identity_card',
      });

      if (!backResult.success) {
        showErrorToast(backResult.error || '裏面のアップロードに失敗しました');
        return;
      }

      showSuccessToast('本人確認の申請を受け付けました。審査完了まで1-3営業日程度かかります。');
      router.back();
    } catch (error: any) {
      showErrorToast(error.message || '本人確認の申請に失敗しました');
    }
  };

  /**
   * URIからFileオブジェクトを作成
   */
  const createFileFromUri = async (uri: string, fileName: string): Promise<File> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new File([blob], fileName, { type: 'image/jpeg' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>
          <Text style={styles.title}>本人確認を完了しましょう</Text>
          <Text style={styles.subtitle}>
            本人確認を完了すると、より多くのユーザーとマッチングできるようになります
          </Text>
        </View>

        {/* 手順セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>本人確認の手順</Text>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>身分証明書の準備</Text>
              <Text style={styles.stepDescription}>
                運転免許証、マイナンバーカード、パスポートのいずれかをご用意ください
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>写真の撮影</Text>
              <Text style={styles.stepDescription}>
                身分証明書の表裏を撮影してください
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>審査完了</Text>
              <Text style={styles.stepDescription}>
                審査完了まで1-3営業日程度かかります
              </Text>
            </View>
          </View>
        </View>

        {/* 写真アップロードセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>身分証明書の写真をアップロード</Text>

          {/* 表面の写真 */}
          <View style={styles.photoSection}>
            <Text style={styles.photoLabel}>表面（顔写真がある面）</Text>
            <TouchableOpacity
              style={styles.photoContainer}
              onPress={() => showImagePickerOptions('front')}
            >
              {frontImage ? (
                <View style={styles.photoPreview}>
                  <Image source={{ uri: frontImage }} style={styles.photoImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage('front')}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderIcon}>📷</Text>
                  <Text style={styles.photoPlaceholderText}>タップして写真を選択</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* 裏面の写真 */}
          <View style={styles.photoSection}>
            <Text style={styles.photoLabel}>裏面</Text>
            <TouchableOpacity
              style={styles.photoContainer}
              onPress={() => showImagePickerOptions('back')}
            >
              {backImage ? (
                <View style={styles.photoPreview}>
                  <Image source={{ uri: backImage }} style={styles.photoImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage('back')}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderIcon}>📷</Text>
                  <Text style={styles.photoPlaceholderText}>タップして写真を選択</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 注意事項セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>注意事項</Text>

          <View style={styles.noticeContainer}>
            <Text style={styles.noticeText}>
              • 身分証明書の情報は暗号化され、安全に管理されます
            </Text>
            <Text style={styles.noticeText}>
              • 本人確認は一度のみ必要です
            </Text>
            <Text style={styles.noticeText}>
              • 審査中は通常通りアプリをご利用いただけます
            </Text>
            <Text style={styles.noticeText}>
              • 身分証明書の有効期限が切れている場合は使用できません
            </Text>
            <Text style={styles.noticeText}>
              • 写真は鮮明で、文字が読み取れるように撮影してください
            </Text>
          </View>
        </View>

        {/* 開始ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.startButton, isUploading && styles.startButtonDisabled]}
            onPress={handleStartVerification}
            disabled={isUploading}
          >
            <Text style={styles.startButtonText}>
              {isUploading ? 'アップロード中...' : '本人確認を開始'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * スタイル定義
 */
const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: 'center' as const,
    marginBottom: 30,
    paddingTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3182CE',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row' as const,
    marginBottom: 20,
    alignItems: 'flex-start' as const,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3182CE',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
    flexShrink: 0,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noticeContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center' as const,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600' as const,
  },
  // 写真アップロード用スタイル
  photoSection: {
    marginBottom: 20,
  },
  photoLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  photoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed' as const,
    overflow: 'hidden' as const,
  },
  photoPlaceholder: {
    height: 200,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  photoPlaceholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
  },
  photoPreview: {
    position: 'relative' as const,
  },
  photoImage: {
    width: '100%' as const,
    height: 200,
    resizeMode: 'cover' as const,
  },
  removeButton: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
};

export default VerificationScreen;

import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

interface ProfileImageEditProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

/**
 * プロフィール画像編集コンポーネント
 * Webとモバイルの両方に対応
 */
export const ProfileImageEdit: React.FC<ProfileImageEditProps> = ({
  images,
  onImagesChange,
  maxImages = 4
}) => {
  const [isUploading, setIsUploading] = useState(false);

  // 画像選択の権限をリクエスト
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '権限が必要です',
        '画像を選択するためにカメラロールへのアクセス権限が必要です。',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  // 画像を選択
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3], // UserCardと同じ比率（2:3）
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: maxImages - images.length
      });

      if (!result.canceled && result.assets) {
        const newImageUris = result.assets.map(asset => asset.uri);
        const updatedImages = [...images, ...newImageUris].slice(0, maxImages);
        onImagesChange(updatedImages);
      }
    } catch (error) {
      console.error('画像選択エラー:', error);
      Alert.alert('エラー', '画像の選択に失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  // カメラで撮影
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '権限が必要です',
        '写真を撮影するためにカメラへのアクセス権限が必要です。',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setIsUploading(true);

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [2, 3], // UserCardと同じ比率（2:3）
        quality: 0.8
      });

      if (!result.canceled && result.assets) {
        const newImageUri = result.assets[0].uri;
        const updatedImages = [...images, newImageUri].slice(0, maxImages);
        onImagesChange(updatedImages);
      }
    } catch (error) {
      console.error('写真撮影エラー:', error);
      Alert.alert('エラー', '写真の撮影に失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  // 画像を削除
  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  // 画像選択オプションを表示
  const showImageOptions = () => {
    Alert.alert(
      '画像を追加',
      '画像を追加する方法を選択してください',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: 'カメラロールから選択', onPress: pickImage },
        { text: 'カメラで撮影', onPress: takePhoto }
      ]
    );
  };

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>プロフィール画像</Text>
      <Text style={ProfileEditStyles.inputLabel}>
        最大{maxImages}枚まで追加できます（{images.length}/{maxImages}）
      </Text>

      <View style={ProfileEditStyles.imageGrid}>
        {/* 既存の画像を表示 */}
        {images.map((imageUri, index) => (
          <View key={index} style={ProfileEditStyles.imageContainer}>
            <Image source={{ uri: imageUri }} style={ProfileEditStyles.image} />
            <TouchableOpacity
              style={ProfileEditStyles.imageRemoveButton}
              onPress={() => removeImage(index)}
            >
              <Text style={ProfileEditStyles.imageRemoveButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* 画像追加ボタン */}
        {images.length < maxImages && (
          <TouchableOpacity
            style={[ProfileEditStyles.imageContainer, ProfileEditStyles.imageAddButton]}
            onPress={showImageOptions}
            disabled={isUploading}
          >
            <Text style={ProfileEditStyles.imageAddButtonText}>
              {isUploading ? 'アップロード中...' : '+'}
            </Text>
            <Text style={ProfileEditStyles.imageAddButtonSubtext}>画像を追加</Text>
          </TouchableOpacity>
        )}
      </View>

      {images.length === 0 && (
        <View style={ProfileEditStyles.emptyState}>
          <Text style={ProfileEditStyles.emptyStateText}>
            プロフィール画像を追加して、あなたの魅力をアピールしましょう！
          </Text>
        </View>
      )}
    </View>
  );
};



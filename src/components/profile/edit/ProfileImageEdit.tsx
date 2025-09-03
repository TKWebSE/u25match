import { colors } from '@styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  maxImages = 6
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
        aspect: [1, 1],
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
        aspect: [1, 1],
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
    <View style={styles.container}>
      <Text style={styles.title}>プロフィール画像</Text>
      <Text style={styles.subtitle}>
        最大{maxImages}枚まで追加できます（{images.length}/{maxImages}）
      </Text>

      <View style={styles.imageGrid}>
        {/* 既存の画像を表示 */}
        {images.map((imageUri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* 画像追加ボタン */}
        {images.length < maxImages && (
          <TouchableOpacity
            style={[styles.imageContainer, styles.addButton]}
            onPress={showImageOptions}
            disabled={isUploading}
          >
            <Text style={styles.addButtonText}>
              {isUploading ? 'アップロード中...' : '+'}
            </Text>
            <Text style={styles.addButtonSubtext}>画像を追加</Text>
          </TouchableOpacity>
        )}
      </View>

      {images.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            プロフィール画像を追加して、あなたの魅力をアピールしましょう！
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray300,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  addButtonSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  emptyState: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.gray100,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

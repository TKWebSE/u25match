import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProfileTagsEditProps {
  tags: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
  onTagsChange: (tags: Array<{ id: string; name: string; imageUrl: string }>) => void;
}

// タグキーから画像を取得する関数
const getTagImage = (tagName: string): any => {
  // デフォルト画像
  return require('@assets/tag-images/cat.jpg');
};

// 個別のタグ表示コンポーネント（編集機能なし）
const TagItemEdit: React.FC<{
  tag: { id: string; name: string; imageUrl: string };
}> = ({ tag }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    console.warn(`タグ画像の読み込みに失敗しました: ${tag.name}`);
    setImageError(true);
  };

  return (
    <View style={ProfileEditStyles.tagItem}>
      {/* Detailと同じレイアウト：画像とテキストを横並びで表示 */}
      <View style={ProfileEditStyles.tagContent}>
        <Image
          source={getTagImage(tag.name)}
          style={ProfileEditStyles.tagImage}
          onError={handleImageError}
        />
        {/* タグ名（表示のみ） */}
        <Text style={ProfileEditStyles.tagText}>{tag.name}</Text>
      </View>
    </View>
  );
};

export const ProfileTagsEdit: React.FC<ProfileTagsEditProps> = ({ tags, onTagsChange }) => {
  const router = useRouter();

  const handleEditTagPress = () => {
    // タグリスト画面に遷移
    router.push('/tags' as any);
  };

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>興味・趣味</Text>

      {/* タグ一覧 */}
      <View style={ProfileEditStyles.tagsContainer}>
        {tags.map((tag) => (
          <TagItemEdit
            key={tag.id}
            tag={tag}
          />
        ))}
      </View>

      {/* タグ編集ボタン */}
      <TouchableOpacity
        onPress={handleEditTagPress}
        style={ProfileEditStyles.addTagButton}
        activeOpacity={0.8}
      >
        <Text style={ProfileEditStyles.addTagButtonText}>✏️ タグを編集</Text>
      </TouchableOpacity>

      {tags.length === 0 && (
        <View style={ProfileEditStyles.emptyState}>
          <Text style={ProfileEditStyles.emptyStateText}>
            興味や趣味のタグを追加して、共通の話題を見つけやすくしましょう！
          </Text>
        </View>
      )}
    </View>
  );
};

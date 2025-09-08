import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import { isWeb } from '@utils/platform';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

// 個別のタグ編集コンポーネント
const TagItemEdit: React.FC<{
  tag: { id: string; name: string; imageUrl: string };
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
}> = ({ tag, onDelete, onEdit }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(tag.name);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverIn = () => {
    if (isWeb) {
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (isWeb) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleImageError = () => {
    console.warn(`タグ画像の読み込みに失敗しました: ${tag.name}`);
    setImageError(true);
  };

  const handleSave = () => {
    if (editName.trim()) {
      onEdit(tag.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(tag.name);
    setIsEditing(false);
  };

  return (
    <Animated.View
      style={[
        ProfileEditStyles.tagItem,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      {/* Detailと同じレイアウト：画像とテキストを横並びで表示 */}
      <View style={ProfileEditStyles.tagContent}>
        <Image
          source={getTagImage(tag.name)}
          style={ProfileEditStyles.tagImage}
          onError={handleImageError}
        />
        {/* タグ名（編集可能） */}
        {isEditing ? (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <TextInput
              style={[
                ProfileEditStyles.input,
                { flex: 1, minHeight: 32, fontSize: 15, fontWeight: '600' }
              ]}
              value={editName}
              onChangeText={setEditName}
              placeholder="タグ名"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity onPress={handleSave} style={{ padding: 4 }}>
              <Text style={{ color: '#10B981', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={{ padding: 4 }}>
              <Text style={{ color: '#EF4444', fontSize: 16, fontWeight: 'bold' }}>✗</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={ProfileEditStyles.tagText}>{tag.name}</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={() => setIsEditing(true)} style={{ padding: 4 }}>
                <Text style={{ color: '#3B82F6', fontSize: 14 }}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(tag.id)} style={{ padding: 4 }}>
                <Text style={{ color: '#EF4444', fontSize: 16, fontWeight: 'bold' }}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

export const ProfileTagsEdit: React.FC<ProfileTagsEditProps> = ({ tags, onTagsChange }) => {
  const router = useRouter();

  const deleteTag = (id: string) => {
    onTagsChange(tags.filter(tag => tag.id !== id));
  };

  const editTag = (id: string, newName: string) => {
    onTagsChange(tags.map(tag =>
      tag.id === id ? { ...tag, name: newName } : tag
    ));
  };

  const handleAddTagPress = () => {
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
            onDelete={deleteTag}
            onEdit={editTag}
          />
        ))}
      </View>

      {/* タグ追加ボタン */}
      <TouchableOpacity
        onPress={handleAddTagPress}
        style={ProfileEditStyles.addTagButton}
        activeOpacity={0.8}
      >
        <Text style={ProfileEditStyles.addTagButtonText}>+ タグを追加</Text>
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

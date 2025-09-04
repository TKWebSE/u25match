import { tagDataMap, TagKey } from '@constants/tagDataMap';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import { isWeb } from '@utils/platform';
import React, { useCallback, useEffect, useState } from 'react';
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileTagsEditProps {
  tags: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
  onTagsChange: (tags: Array<{ id: string; name: string; imageUrl: string }>) => void;
}

// 利用可能なタグのリスト
const availableTags = Object.keys(tagDataMap) as TagKey[];

// タグ名からタグキーを取得する関数
const getTagKeyFromName = (tagName: string): TagKey | null => {
  // 完全一致を探す
  const exactMatch = availableTags.find(key =>
    tagDataMap[key].description === tagName
  );
  if (exactMatch) return exactMatch;

  // 部分一致を探す
  const partialMatch = availableTags.find(key =>
    tagName.includes(tagDataMap[key].description) ||
    tagDataMap[key].description.includes(tagName)
  );
  if (partialMatch) return partialMatch;

  return null;
};

// タグキーから画像を取得する関数
const getTagImage = (tagName: string): any => {
  const tagKey = getTagKeyFromName(tagName);
  if (tagKey) {
    return tagDataMap[tagKey].image;
  }
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
      {/* タグ名（編集可能） */}
      {isEditing ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <TextInput
            style={[
              ProfileEditStyles.input,
              { flex: 1, minHeight: 32, fontSize: 14 }
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={ProfileEditStyles.tagText}>{tag.name}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={{ padding: 4 }}>
            <Text style={{ color: '#3B82F6', fontSize: 14 }}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(tag.id)} style={{ padding: 4 }}>
            <Text style={{ color: '#EF4444', fontSize: 16, fontWeight: 'bold' }}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

export const ProfileTagsEdit: React.FC<ProfileTagsEditProps> = ({ tags, onTagsChange }) => {
  const [newTagName, setNewTagName] = useState('');
  const [localTagName, setLocalTagName] = useState('');
  const [showAvailableTags, setShowAvailableTags] = useState(false);

  // デバウンス処理（500ms後にローカル状態を更新）
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewTagName(localTagName);
    }, 500);

    return () => clearTimeout(timer);
  }, [localTagName]);

  const handleTagNameChange = useCallback((text: string) => {
    setLocalTagName(text);
  }, []);

  const addTag = () => {
    if (newTagName.trim() && !tags.find(tag => tag.name === newTagName.trim())) {
      const newTag = {
        id: Date.now().toString(),
        name: newTagName.trim(),
        imageUrl: ''
      };
      onTagsChange([...tags, newTag]);
      setNewTagName('');
    }
  };

  const addTagFromList = (tagKey: TagKey) => {
    const tagDescription = tagDataMap[tagKey].description;
    if (!tags.find(tag => tag.name === tagDescription)) {
      const newTag = {
        id: Date.now().toString(),
        name: tagDescription,
        imageUrl: ''
      };
      onTagsChange([...tags, newTag]);
    }
    setShowAvailableTags(false);
  };

  const deleteTag = (id: string) => {
    onTagsChange(tags.filter(tag => tag.id !== id));
  };

  const editTag = (id: string, newName: string) => {
    onTagsChange(tags.map(tag =>
      tag.id === id ? { ...tag, name: newName } : tag
    ));
  };

  // 既に選択されているタグを除外
  const availableTagsToShow = availableTags.filter(tagKey =>
    !tags.find(tag => tag.name === tagDataMap[tagKey].description)
  );

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>興味・趣味</Text>

      {/* 新しいタグ追加 */}
      <View style={ProfileEditStyles.tagInputContainer}>
        <TextInput
          style={[ProfileEditStyles.input, ProfileEditStyles.tagInput]}
          value={localTagName}
          onChangeText={handleTagNameChange}
          placeholder="新しいタグを追加"
          placeholderTextColor="#9CA3AF"
          onSubmitEditing={addTag}
        />
        <TouchableOpacity
          onPress={addTag}
          style={ProfileEditStyles.tagAddButton}
        >
          <Text style={ProfileEditStyles.tagAddButtonText}>追加</Text>
        </TouchableOpacity>
      </View>

      {/* 利用可能なタグから選択 */}
      {availableTagsToShow.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={() => setShowAvailableTags(!showAvailableTags)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: '#F3F4F6',
              borderRadius: 8,
              marginBottom: 8
            }}
          >
            <Text style={{ flex: 1, color: '#6B7280', fontSize: 14 }}>
              利用可能なタグから選択 ({availableTagsToShow.length}件)
            </Text>
            <Text style={{ color: '#6B7280', fontSize: 16 }}>
              {showAvailableTags ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {showAvailableTags && (
            <View style={ProfileEditStyles.tagsContainer}>
              {availableTagsToShow.map((tagKey) => (
                <TouchableOpacity
                  key={tagKey}
                  onPress={() => addTagFromList(tagKey)}
                  style={[ProfileEditStyles.tagItem, { backgroundColor: '#E5E7EB' }]}
                >
                  <Text style={[ProfileEditStyles.tagText, { color: '#374151' }]}>
                    {tagDataMap[tagKey].description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

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

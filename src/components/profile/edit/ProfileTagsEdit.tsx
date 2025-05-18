import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { isWeb } from '@utils/platform';
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

// タグ名に応じた画像を取得する関数
const getTagImage = (tagName: string): any => {
  const tagImages: { [key: string]: any } = {
    // 既存のタグ
    'コーヒー': require('@assets/tag-images/coffee.jpg'),
    'たこパーティー': require('@assets/tag-images/takoparty.jpg'),
    'ゲーム': require('@assets/tag-images/game.jpg'),
    'ライブ': require('@assets/tag-images/musiclive.jpg'),
    '犬': require('@assets/tag-images/dog.jpg'),
    '猫': require('@assets/tag-images/cat.jpg'),
    '音楽': require('@assets/tag-images/musiclive.jpg'),
    '写真': require('@assets/tag-images/cat.jpg'),
    'カフェ': require('@assets/tag-images/coffee.jpg'),
    'アート': require('@assets/tag-images/musiclive.jpg'),
    '映画': require('@assets/tag-images/game.jpg'),
    '旅行': require('@assets/tag-images/party.jpg'),
    '釣り': require('@assets/tag-images/cat.jpg'),
    'カメラ': require('@assets/tag-images/cat.jpg'),
    'エンジニア': require('@assets/tag-images/game.jpg'),
  };

  // まず通常のマッピングを確認
  if (tagImages[tagName]) {
    return tagImages[tagName];
  }

  // タグ名に部分一致するものを探す
  const partialMatch = Object.keys(tagImages).find(key =>
    tagName.includes(key) || key.includes(tagName)
  );

  if (partialMatch) {
    return tagImages[partialMatch];
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
        ProfileDetailStyles.tagItem,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      {/* タグ画像 */}
      {!imageError ? (
        <Image
          source={getTagImage(tag.name)}
          style={ProfileDetailStyles.tagImage}
          resizeMode="cover"
          onError={handleImageError}
        />
      ) : (
        <View style={[ProfileDetailStyles.tagImage, { backgroundColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: 16, color: '#718096' }}>🏷️</Text>
        </View>
      )}

      {/* タグ名（編集可能） */}
      {isEditing ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <TextInput
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              borderRadius: 4,
              paddingHorizontal: 4,
              paddingVertical: 2,
              fontSize: 12,
              minWidth: 60
            }}
            value={editName}
            onChangeText={setEditName}
            placeholder="タグ名"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={handleSave} style={{ marginLeft: 4 }}>
            <Text style={{ color: '#10B981', fontSize: 12 }}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={{ marginLeft: 4 }}>
            <Text style={{ color: '#EF4444', fontSize: 12 }}>✗</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Text style={ProfileDetailStyles.tagText}>{tag.name}</Text>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={{ marginLeft: 4 }}>
            <Text style={{ color: '#3B82F6', fontSize: 12 }}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(tag.id)} style={{ marginLeft: 4 }}>
            <Text style={{ color: '#EF4444', fontSize: 12 }}>×</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

export const ProfileTagsEdit: React.FC<ProfileTagsEditProps> = ({ tags, onTagsChange }) => {
  const [newTagName, setNewTagName] = useState('');

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

  const deleteTag = (id: string) => {
    onTagsChange(tags.filter(tag => tag.id !== id));
  };

  const editTag = (id: string, newName: string) => {
    onTagsChange(tags.map(tag =>
      tag.id === id ? { ...tag, name: newName } : tag
    ));
  };

  return (
    <View style={ProfileDetailStyles.tagsSection}>
      <Text style={ProfileDetailStyles.tagsTitle}>興味・趣味</Text>

      {/* 新しいタグ追加 */}
      <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginRight: 8
          }}
          value={newTagName}
          onChangeText={setNewTagName}
          placeholder="新しいタグを追加"
          placeholderTextColor="#9CA3AF"
          onSubmitEditing={addTag}
        />
        <TouchableOpacity
          onPress={addTag}
          style={{
            backgroundColor: '#3B82F6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>追加</Text>
        </TouchableOpacity>
      </View>

      {/* タグ一覧 */}
      <View style={ProfileDetailStyles.tagsContainer}>
        {tags.map((tag) => (
          <TagItemEdit
            key={tag.id}
            tag={tag}
            onDelete={deleteTag}
            onEdit={editTag}
          />
        ))}
      </View>
    </View>
  );
};

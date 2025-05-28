import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React, { useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';

interface ProfileTagsProps {
  tags: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
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

    // モックデータで使用されているタグ
    '写真': require('@assets/tag-images/cat.jpg'), // カメラ関連なので猫の画像を使用
    'カフェ': require('@assets/tag-images/coffee.jpg'),
    'アート': require('@assets/tag-images/musiclive.jpg'), // アート関連なので音楽ライブの画像を使用
    '映画': require('@assets/tag-images/game.jpg'), // エンターテイメント関連なのでゲームの画像を使用
    '旅行': require('@assets/tag-images/party.jpg'),

    // その他の一般的なタグ
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

// 個別のタグコンポーネント
const TagItem: React.FC<{ tag: { id: string; name: string; imageUrl: string } }> = ({ tag }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => {
    console.warn(`タグ画像の読み込みに失敗しました: ${tag.name}`);
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={ProfileDetailStyles.tagItem}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
        <View style={ProfileDetailStyles.tagContent}>
          <Image
            source={getTagImage(tag.name)}
            style={ProfileDetailStyles.tagImage}
            onError={handleImageError}
          />
          <Text style={ProfileDetailStyles.tagText}>{tag.name}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 * モバイル版タグ表示コンポーネント
 * 
 * @param tags - タグ配列
 */
export const MobileProfileTags: React.FC<ProfileTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <View style={ProfileDetailStyles.tagsSection}>
      <Text style={ProfileDetailStyles.tagsTitle}>興味・趣味</Text>
      <View style={ProfileDetailStyles.tagsContainer}>
        {tags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </View>
    </View>
  );
};

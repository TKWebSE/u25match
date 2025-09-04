import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface ProfileBioEditProps {
  bio: string;
  onBioChange: (bio: string) => void;
}

/**
 * 自己紹介編集コンポーネント
 * 
 * @param bio - 自己紹介テキスト
 * @param onBioChange - 自己紹介変更時のコールバック
 */
export const ProfileBioEdit: React.FC<ProfileBioEditProps> = ({ bio, onBioChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localBio, setLocalBio] = useState(bio);
  const maxLength = 500;

  // デバウンス処理（500ms後に親に通知）
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localBio !== bio) {
        onBioChange(localBio);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localBio, bio, onBioChange]);

  // 外部からbioが変更された場合はローカル状態を更新
  useEffect(() => {
    setLocalBio(bio);
  }, [bio]);

  const handleTextChange = useCallback((text: string) => {
    setLocalBio(text);
  }, []);

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>自己紹介</Text>

      <View style={ProfileEditStyles.inputContainer}>
        <Text style={ProfileEditStyles.inputLabel}>
          あなたの魅力を伝える文章を書いてください
        </Text>
        <TextInput
          style={[
            ProfileEditStyles.input,
            ProfileEditStyles.inputMultiline,
            isFocused && ProfileEditStyles.inputFocused
          ]}
          value={localBio}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="自己紹介を入力してください。趣味、性格、将来の目標など、あなたらしさを表現してみてください。"
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          maxLength={maxLength}
        />
        <Text style={ProfileEditStyles.inputHelperText}>
          {localBio.length}/{maxLength} 文字
        </Text>
      </View>
    </View>
  );
};

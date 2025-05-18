import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
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
  return (
    <View style={ProfileDetailStyles.bioContainer}>
      <Text style={ProfileDetailStyles.bioTitle}>自己紹介</Text>
      <TextInput
        style={[ProfileDetailStyles.bio, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, minHeight: 100 }]}
        value={bio}
        onChangeText={onBioChange}
        placeholder="自己紹介を入力してください"
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
      />
    </View>
  );
};

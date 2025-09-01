import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileBioProps {
  bio: string;
}

/**
 * Web版自己紹介コンポーネント
 * 
 * @param bio - 自己紹介テキスト
 */
export const WebProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  return (
    <View style={ProfileDetailStyles.bioContainer}>
      <Text style={ProfileDetailStyles.bioTitle}>自己紹介</Text>
      <Text style={ProfileDetailStyles.bio}>{bio}</Text>
    </View>
  );
};

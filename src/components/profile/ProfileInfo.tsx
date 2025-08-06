import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileInfoProps {
  name: string;
  age: number;
  onlineStatus: string;
  likeCount: number;
}

/**
 * プロフィール情報コンポーネント
 * 
 * @param name - ユーザー名
 * @param age - 年齢
 * @param onlineStatus - オンライン状態
 * @param likeCount - いいね数
 */
export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  age,
  onlineStatus,
  likeCount
}) => {
  return (
    <View style={ProfileDetailStyles.header}>
      <Text style={ProfileDetailStyles.name}>
        {name}（{age}歳）
      </Text>
      <Text style={ProfileDetailStyles.online}>{onlineStatus}</Text>
      <Text style={ProfileDetailStyles.likes}>💖 {likeCount} いいね</Text>
    </View>
  );
}; 

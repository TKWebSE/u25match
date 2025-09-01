import { VerificationMark } from '@components/common/VerificationMark';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileInfoProps {
  name: string;
  age: number;
  location: string;
  onlineStatus: string;
  likeCount: number;
  isVerified?: boolean;
}

/**
 * モバイル版プロフィール情報コンポーネント
 * 
 * @param name - ユーザー名
 * @param age - 年齢
 * @param location - 出身地
 * @param onlineStatus - オンライン状態
 * @param likeCount - いいね数
 * @param isVerified - 本人確認済みかどうか
 */
export const MobileProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  age,
  location,
  onlineStatus,
  likeCount,
  isVerified = false
}) => {
  return (
    <View style={ProfileDetailStyles.header}>
      <View style={ProfileDetailStyles.nameContainer}>
        <Text style={ProfileDetailStyles.name}>
          {name}（{age}歳）
        </Text>
        <VerificationMark isVerified={isVerified} />
      </View>
      <Text style={ProfileDetailStyles.location}>{location}</Text>
      <Text style={ProfileDetailStyles.online}>{onlineStatus}</Text>
      <Text style={ProfileDetailStyles.likes}>💖 {likeCount} いいね</Text>
    </View>
  );
};

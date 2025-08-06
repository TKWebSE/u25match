import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileInfoProps {
  name: string;
  age: number;
  location: string; // 出身地を追加
  onlineStatus: string;
  likeCount: number;
  isVerified?: boolean; // 本人確認済みフラグ
}

/**
 * プロフィール情報コンポーネント
 * 
 * @param name - ユーザー名
 * @param age - 年齢
 * @param location - 出身地
 * @param onlineStatus - オンライン状態
 * @param likeCount - いいね数
 * @param isVerified - 本人確認済みかどうか
 */
export const ProfileInfo: React.FC<ProfileInfoProps> = ({
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
        <Text style={[
          ProfileDetailStyles.verificationMark,
          isVerified ? ProfileDetailStyles.verifiedMark : ProfileDetailStyles.unverifiedMark
        ]}>
          ✓
        </Text>
      </View>
      <Text style={ProfileDetailStyles.location}>{location}</Text>
      <Text style={ProfileDetailStyles.online}>{onlineStatus}</Text>
      <Text style={ProfileDetailStyles.likes}>💖 {likeCount} いいね</Text>
    </View>
  );
}; 

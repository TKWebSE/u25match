import { VerificationMark } from '@components/common/VerificationMark';
import { SettingsStyles } from '@styles/settings/SettingsStyles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserAvatar } from './UserAvatar';

/**
 * アカウント情報のプロパティ
 */
interface AccountInfoProps {
  /** 認証ユーザー情報 */
  authUser: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
  /** プロフィール情報 */
  profile?: {
    uid: string;
    age?: number;
    location?: string;
    isVerified?: boolean;
  };
  /** タップ時の処理 */
  onPress: () => void;
}

/**
 * アカウント情報カードコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - ユーザーアバターの表示
 * - 名前、年齢、出身地の表示
 * - タップ時の処理
 */
export const AccountInfo: React.FC<AccountInfoProps> = ({
  authUser,
  profile,
  onPress,
}) => {
  return (
    <TouchableOpacity style={SettingsStyles.userInfo} onPress={onPress} activeOpacity={0.7}>
      {/* アバター */}
      <View style={SettingsStyles.avatarContainer}>
        <UserAvatar
          images={authUser.photoURL ? [authUser.photoURL] : []}
          email={authUser.email || undefined}
          size={50}
        />
      </View>

      {/* ユーザー詳細情報 */}
      <View style={SettingsStyles.userDetails}>
        {/* 名前と認証マーク */}
        <View style={SettingsStyles.nameContainer}>
          <Text style={SettingsStyles.userName}>{authUser.displayName || 'ユーザー'}</Text>
          <VerificationMark isVerified={profile?.isVerified} />
        </View>

        {/* 年齢と出身地 */}
        {(profile?.age || profile?.location) && (
          <Text style={SettingsStyles.userEmail}>
            {profile.age ? `${profile.age}歳` : ''}
            {profile.age && profile.location ? ' ' : ''}
            {profile.location || ''}
          </Text>
        )}
      </View>

      {/* 編集アイコン（カードの右端） */}
      <View style={SettingsStyles.editIcon}>
        <Text style={SettingsStyles.editIconText}>⚙️</Text>
      </View>
    </TouchableOpacity>
  );
}; 

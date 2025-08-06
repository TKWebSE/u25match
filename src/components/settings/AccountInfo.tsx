import { SettingsStyles } from '@styles/settings/SettingsStyles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { UserAvatar } from './UserAvatar';

/**
 * アカウント情報のプロパティ
 */
interface AccountInfoProps {
  /** ユーザーの画像URL配列 */
  images?: (string | null)[];
  /** ユーザーのメールアドレス */
  email?: string;
  /** ユーザーの名前 */
  name?: string;
  /** ユーザーの年齢 */
  age?: number;
  /** ユーザーの出身地 */
  location?: string;
  /** 本人確認済みかどうか */
  isVerified?: boolean;
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
  images,
  email,
  name,
  age,
  location,
  isVerified = false,
  onPress,
}) => {
  return (
    <TouchableOpacity style={SettingsStyles.userInfo} onPress={onPress} activeOpacity={0.7}>
      {/* アバター */}
      <UserAvatar
        images={images}
        email={email}
        size={50}
      />

      {/* ユーザー詳細情報 */}
      <View style={SettingsStyles.userDetails}>
        {/* 名前 */}
        <Text style={SettingsStyles.userName}>{name || 'ユーザー'}</Text>

        {/* 年齢と出身地 */}
        <Text style={SettingsStyles.userEmail}>
          {age ? `${age}歳` : ''}
          {age && location ? ' • ' : ''}
          {location || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}; 

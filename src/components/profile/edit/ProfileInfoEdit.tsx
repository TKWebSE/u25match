import { VerificationMark } from '@components/common/VerificationMark';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface ProfileInfoEditProps {
  name: string;
  age: number;
  location: string;
  isVerified?: boolean;
  onNameChange: (name: string) => void;
  onAgeChange: (age: number) => void;
  onLocationChange: (location: string) => void;
}

/**
 * プロフィール情報編集コンポーネント
 * 
 * @param name - ユーザー名
 * @param age - 年齢
 * @param location - 出身地
 * @param isVerified - 本人確認済みかどうか（編集不可）
 * @param onNameChange - 名前変更時のコールバック
 * @param onAgeChange - 年齢変更時のコールバック
 * @param onLocationChange - 出身地変更時のコールバック
 */
export const ProfileInfoEdit: React.FC<ProfileInfoEditProps> = ({
  name,
  age,
  location,
  isVerified = false,
  onNameChange,
  onAgeChange,
  onLocationChange,
}) => {
  return (
    <View style={ProfileDetailStyles.header}>
      <View style={ProfileDetailStyles.nameContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TextInput
            style={[ProfileDetailStyles.name, { flex: 1, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 }]}
            value={name}
            onChangeText={onNameChange}
            placeholder="名前を入力"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={{ fontSize: 16, marginHorizontal: 8 }}>（</Text>
          <TextInput
            style={[ProfileDetailStyles.name, { width: 60, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 8, textAlign: 'center' }]}
            value={age.toString()}
            onChangeText={(text) => {
              const numAge = parseInt(text) || 0;
              onAgeChange(numAge);
            }}
            placeholder="年齢"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 16, marginHorizontal: 8 }}>歳）</Text>
        </View>
        <VerificationMark isVerified={isVerified} />
      </View>
      <TextInput
        style={[ProfileDetailStyles.location, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 }]}
        value={location}
        onChangeText={onLocationChange}
        placeholder="出身地を入力"
        placeholderTextColor="#9CA3AF"
      />

    </View>
  );
};

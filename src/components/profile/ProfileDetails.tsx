import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileDetailsProps {
  details: Record<string, string>;
}

/**
 * 詳細プロフィールコンポーネント
 * 
 * @param details - プロフィール詳細情報のオブジェクト
 */
export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ details }) => {
  return (
    <View style={ProfileDetailStyles.detailsSection}>
      {Object.entries(details).map(([label, value]) => (
        <View key={label} style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>{label}</Text>
          <Text style={ProfileDetailStyles.detailValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}; 

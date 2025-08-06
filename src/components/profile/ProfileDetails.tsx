import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

interface ProfileDetailsProps {
  details: {
    height: number;
    occupation: string;
    education: string;
    interests: string[];
    languages: string[];
    smoking: boolean;
    drinking: string;
    relationshipGoal: string;
  };
}

/**
 * 詳細プロフィールコンポーネント
 * 
 * @param details - プロフィール詳細情報のオブジェクト
 */
export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ details }) => {
  return (
    <View style={ProfileDetailStyles.detailsSection}>
      <Text style={ProfileDetailStyles.detailsTitle}>詳細プロフィール</Text>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>身長</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.height}cm</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>職業</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.occupation}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>学歴</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.education}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>趣味</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.interests.join(', ')}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>言語</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.languages.join(', ')}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>喫煙</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.smoking ? 'はい' : 'いいえ'}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>飲酒</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.drinking}</Text>
      </View>
      <View style={ProfileDetailStyles.detailRow}>
        <Text style={ProfileDetailStyles.detailLabel}>恋愛観</Text>
        <Text style={ProfileDetailStyles.detailValue}>{details.relationshipGoal}</Text>
      </View>
    </View>
  );
}; 

import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

/**
 * プロフィール詳細情報の型定義
 * 
 * @interface ProfileDetailsEditProps
 * @property {Object} details - プロフィール詳細情報のオブジェクト
 * @property {number} details.height - 身長（必須）
 * @property {number} [details.weight] - 体重（オプション）
 * @property {string} [details.bodyType] - 体型（オプション）
 * @property {string} [details.bloodType] - 血液型（オプション）
 * @property {string} [details.hometown] - 出身地（オプション）
 * @property {string} details.occupation - 職業（必須）
 * @property {string} details.education - 学歴（必須）
 * @property {string} [details.income] - 年収（オプション）
 * @property {string} [details.familyStructure] - 同居人（オプション）
 * @property {string[]} [details.pets] - ペット（オプション）
 * @property {string[]} details.languages - 言語（必須）
 * @property {boolean} details.smoking - 喫煙（必須）
 * @property {string} details.drinking - 飲酒（必須）
 * @property {string} [details.children] - 子供（オプション）
 * @property {('土日' | '平日' | '不定期')[]} [details.travelPreferences] - 休日（オプション）
 * @property {string} [details.sleepSchedule] - 寝る時間（オプション）
 * @property {string} [details.marriageTimeline] - 結婚予定（オプション）
 * @property {string} [details.marriageViews] - 結婚観（オプション）
 * @property {string} [details.livingTogether] - 同居希望（オプション）
 * @property {string} [details.marriageHistory] - 結婚歴（オプション）
 * @property {string} [details.marriageIntention] - 結婚の意思（オプション）
 * @property {string} [details.wantChildren] - 子供が欲しいか（オプション）
 */
interface ProfileDetailsEditProps {
  details: {
    height: number;
    weight?: number;
    bodyType?: string;
    bloodType?: string;
    hometown?: string;
    occupation: string;
    education: string;
    income?: string;
    familyStructure?: string;
    pets?: string[];
    languages: string[];
    smoking: boolean;
    drinking: string;
    children?: string;
    travelPreferences?: ('土日' | '平日' | '不定期')[];
    sleepSchedule?: string;
    marriageTimeline?: string;
    marriageViews?: string;
    livingTogether?: string;
    marriageHistory?: string;
    marriageIntention?: string;
    wantChildren?: string;
  };
  onDetailsChange: (details: any) => void;
}

/**
 * 詳細プロフィール編集コンポーネント
 * 
 * ユーザーの詳細なプロフィール情報を編集するコンポーネントです。
 * 情報は以下のセクションに分けて編集できます：
 * - 基本情報（身長、体重、体型、血液型、出身地）
 * - 職業・学歴（職業、学歴、年収、休日）
 * - 家族・生活（同居人、子供、ペット）
 * - 生活習慣（タバコ、お酒、寝る時間）
 * - 結婚・将来設計（結婚歴、結婚の意思、子供が欲しいか、結婚予定、結婚観、同居希望）
 * 
 * @param {ProfileDetailsEditProps} props - コンポーネントのプロパティ
 * @param {Object} props.details - プロフィール詳細情報のオブジェクト
 * @param {Function} props.onDetailsChange - 詳細情報変更時のコールバック
 * @returns {React.ReactElement} 詳細プロフィール編集コンポーネント
 */
export const ProfileDetailsEdit: React.FC<ProfileDetailsEditProps> = ({ details, onDetailsChange }) => {
  const updateDetail = (key: string, value: any) => {
    onDetailsChange({
      ...details,
      [key]: value
    });
  };

  return (
    <ScrollView style={ProfileDetailStyles.detailsSection}>
      {/* メインタイトル */}
      <Text style={ProfileDetailStyles.detailsTitle}>詳細プロフィール</Text>

      {/* 基本情報セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>基本情報</Text>

        {/* 身長（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>身長</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.height.toString()}
            onChangeText={(text) => updateDetail('height', parseInt(text) || 0)}
            placeholder="身長を入力"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <Text style={{ marginLeft: 8 }}>cm</Text>
        </View>

        {/* 体重（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>体重</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.weight?.toString() || ''}
            onChangeText={(text) => updateDetail('weight', text ? parseInt(text) : undefined)}
            placeholder="体重を入力（オプション）"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <Text style={{ marginLeft: 8 }}>kg</Text>
        </View>

        {/* 体型（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>体型</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.bodyType || ''}
            onChangeText={(text) => updateDetail('bodyType', text || undefined)}
            placeholder="体型を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 血液型（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>血液型</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.bloodType || ''}
            onChangeText={(text) => updateDetail('bloodType', text || undefined)}
            placeholder="血液型を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 出身地（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>出身地</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.hometown || ''}
            onChangeText={(text) => updateDetail('hometown', text || undefined)}
            placeholder="出身地を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 職業・学歴セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>職業・学歴</Text>

        {/* 職業（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>職業</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.occupation}
            onChangeText={(text) => updateDetail('occupation', text)}
            placeholder="職業を入力"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 学歴（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>学歴</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.education}
            onChangeText={(text) => updateDetail('education', text)}
            placeholder="学歴を入力"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 年収（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>年収</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.income || ''}
            onChangeText={(text) => updateDetail('income', text || undefined)}
            placeholder="年収を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 生活習慣セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>生活習慣</Text>

        {/* タバコ（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>タバコ</Text>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TextInput
              style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
              value={details.smoking ? 'はい' : 'いいえ'}
              onChangeText={(text) => updateDetail('smoking', text === 'はい')}
              placeholder="はい/いいえ"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* お酒（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>お酒</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.drinking}
            onChangeText={(text) => updateDetail('drinking', text)}
            placeholder="飲酒について入力"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 寝る時間（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>寝る時間</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.sleepSchedule || ''}
            onChangeText={(text) => updateDetail('sleepSchedule', text || undefined)}
            placeholder="寝る時間を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* 結婚・将来設計セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>結婚・将来設計</Text>

        {/* 結婚歴（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>結婚歴</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.marriageHistory || ''}
            onChangeText={(text) => updateDetail('marriageHistory', text || undefined)}
            placeholder="結婚歴を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 結婚の意思（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>結婚の意思</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.marriageIntention || ''}
            onChangeText={(text) => updateDetail('marriageIntention', text || undefined)}
            placeholder="結婚の意思を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* 子供が欲しいか（オプション項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>子供が欲しいか</Text>
          <TextInput
            style={[ProfileDetailStyles.detailValue, { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flex: 1 }]}
            value={details.wantChildren || ''}
            onChangeText={(text) => updateDetail('wantChildren', text || undefined)}
            placeholder="子供が欲しいかを入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>
    </ScrollView>
  );
};

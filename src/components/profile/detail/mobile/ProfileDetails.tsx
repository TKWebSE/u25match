import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, View } from 'react-native';

/**
 * プロフィール詳細情報の型定義
 * 
 * @interface ProfileDetailsProps
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
 * @property {string} details.smoking - 喫煙（必須）
 * @property {string} details.drinking - 飲酒（必須）
 * @property {string} [details.children] - 子供の有無（オプション）
 * @property {string[]} [details.holidayPreferences] - 休日（オプション）
 * @property {string} [details.sleepSchedule] - 寝る時間（オプション）
 * @property {string} [details.marriageTimeline] - 結婚予定（オプション）
 * @property {string} [details.marriageViews] - 結婚観（オプション）
 * @property {string} [details.livingTogether] - 同居希望（オプション）
 * @property {string} [details.marriageHistory] - 結婚歴（オプション）
 * @property {string} [details.marriageIntention] - 結婚の意思（オプション）
 * @property {string} [details.wantChildren] - 子供が欲しいか（オプション）
 */
interface ProfileDetailsProps {
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
    smoking: string;
    drinking: string;
    children?: string;
    holidayPreferences?: string[];
    sleepSchedule?: string;
    marriageTimeline?: string;
    marriageViews?: string;
    livingTogether?: string;
    marriageHistory?: string;
    marriageIntention?: string;
    wantChildren?: string;
  };
}

/**
 * モバイル版詳細プロフィールコンポーネント
 * 
 * ユーザーの詳細なプロフィール情報を表示するコンポーネントです。
 * 情報は以下のセクションに分けて表示されます：
 * - 基本情報（身長、体重、体型、血液型、出身地）
 * - 職業・学歴（職業、学歴、年収、休日）
 * - 家族・生活（同居人、子供、ペット）
 * - 生活習慣（タバコ、お酒、寝る時間）
 * - 結婚・将来設計（結婚歴、結婚の意思、子供が欲しいか、結婚予定、結婚観、同居希望）
 * 
 * @param {ProfileDetailsProps} props - コンポーネントのプロパティ
 * @param {Object} props.details - プロフィール詳細情報のオブジェクト
 * @returns {React.ReactElement} 詳細プロフィールコンポーネント
 * 
 * @example
 * ```tsx
 * <MobileProfileDetails details={userProfileDetails} />
 * ```
 */
export const MobileProfileDetails: React.FC<ProfileDetailsProps> = ({ details }) => {
  return (
    <View style={ProfileDetailStyles.detailsSection}>
      {/* メインタイトル */}
      <Text style={ProfileDetailStyles.detailsTitle}>詳細プロフィール</Text>

      {/* 基本情報セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>基本情報</Text>

        {/* 身長（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>身長</Text>
          <Text style={ProfileDetailStyles.detailValue}>{details.height}cm</Text>
        </View>

        {/* 体重（オプション項目） */}
        {details.weight && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>体重</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.weight}kg</Text>
          </View>
        )}

        {/* 体型（オプション項目） */}
        {details.bodyType && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>体型</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.bodyType}</Text>
          </View>
        )}

        {/* 血液型（オプション項目） */}
        {details.bloodType && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>血液型</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.bloodType}</Text>
          </View>
        )}

        {/* 出身地（オプション項目） */}
        {details.hometown && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>出身地</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.hometown}</Text>
          </View>
        )}
      </View>

      {/* 職業・学歴セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>職業・学歴</Text>

        {/* 職業（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>職業</Text>
          <Text style={ProfileDetailStyles.detailValue}>{details.occupation}</Text>
        </View>

        {/* 学歴（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>学歴</Text>
          <Text style={ProfileDetailStyles.detailValue}>{details.education}</Text>
        </View>

        {/* 年収（オプション項目） */}
        {details.income && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>年収</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.income}</Text>
          </View>
        )}

        {/* 休日（オプション項目） */}
        {details.holidayPreferences && details.holidayPreferences.length > 0 && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>休日</Text>
            <Text style={ProfileDetailStyles.detailValue}>
              {details.holidayPreferences.join('、')}
            </Text>
          </View>
        )}
      </View>

      {/* 家族・生活セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>家族・生活</Text>

        {/* 同居人（オプション項目） */}
        {details.familyStructure && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>同居人</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.familyStructure}</Text>
          </View>
        )}

        {/* 子供（オプション項目） */}
        {details.children && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>子供</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.children}</Text>
          </View>
        )}

        {/* ペット（オプション項目） */}
        {details.pets && details.pets.length > 0 && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>ペット</Text>
            <Text style={ProfileDetailStyles.detailValue}>
              {details.pets.join('、')}
            </Text>
          </View>
        )}

        {/* 第一言語（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>第一言語</Text>
          <Text style={ProfileDetailStyles.detailValue}>
            {Array.isArray(details.languages) ? details.languages[0] : details.languages}
          </Text>
        </View>
      </View>

      {/* 生活習慣セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>生活習慣</Text>

        {/* タバコ（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>タバコ</Text>
          <Text style={ProfileDetailStyles.detailValue}>{details.smoking}</Text>
        </View>

        {/* お酒（必須項目） */}
        <View style={ProfileDetailStyles.detailRow}>
          <Text style={ProfileDetailStyles.detailLabel}>お酒</Text>
          <Text style={ProfileDetailStyles.detailValue}>{details.drinking}</Text>
        </View>

        {/* 寝る時間（オプション項目） */}
        {details.sleepSchedule && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>寝る時間</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.sleepSchedule}</Text>
          </View>
        )}
      </View>

      {/* 結婚・将来設計セクション */}
      <View style={ProfileDetailStyles.detailSection}>
        <Text style={ProfileDetailStyles.detailSectionTitle}>結婚・将来設計</Text>

        {/* 結婚歴（オプション項目） */}
        {details.marriageHistory && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>結婚歴</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.marriageHistory}</Text>
          </View>
        )}

        {/* 結婚の意思（オプション項目） */}
        {details.marriageIntention && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>結婚の意思</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.marriageIntention}</Text>
          </View>
        )}

        {/* 子供が欲しいか（オプション項目） */}
        {details.wantChildren && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>子供が欲しいか</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.wantChildren}</Text>
          </View>
        )}

        {/* 結婚予定（オプション項目） */}
        {details.marriageTimeline && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>結婚予定</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.marriageTimeline}</Text>
          </View>
        )}

        {/* 結婚観（オプション項目） */}
        {details.marriageViews && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>結婚観</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.marriageViews}</Text>
          </View>
        )}

        {/* 同居希望（オプション項目） */}
        {details.livingTogether && (
          <View style={ProfileDetailStyles.detailRow}>
            <Text style={ProfileDetailStyles.detailLabel}>同居希望</Text>
            <Text style={ProfileDetailStyles.detailValue}>{details.livingTogether}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

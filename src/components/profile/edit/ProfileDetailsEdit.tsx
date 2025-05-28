import { BloodTypeName } from '@/src/constants/userEdit/bloodTypes';
import { BodyTypeName } from '@/src/constants/userEdit/bodyTypes';
import { ChildrenName } from '@/src/constants/userEdit/children';
import { DrinkingName } from '@/src/constants/userEdit/drinking';
import { EducationName } from '@/src/constants/userEdit/education';
import { FamilyStructureName } from '@/src/constants/userEdit/familyStructure';
import { HolidayPreferenceName } from '@/src/constants/userEdit/holidayPreferences';
import { IncomeName } from '@/src/constants/userEdit/income';
import { LanguageName } from '@/src/constants/userEdit/languages';
import { MarriageHistoryName } from '@/src/constants/userEdit/marriageHistory';
import { MarriageIntentionName } from '@/src/constants/userEdit/marriageIntention';
import { PetName } from '@/src/constants/userEdit/pets';
import { PrefectureName } from '@/src/constants/userEdit/prefectures';
import { WantChildrenName } from '@/src/constants/userEdit/wantChildren';
import { BloodTypeSelector } from '@components/common/BloodTypeSelector';
import { BodyTypeSelector } from '@components/common/BodyTypeSelector';
import { ChildrenSelector } from '@components/common/ChildrenSelector';
import { DrinkingSelector } from '@components/common/DrinkingSelector';
import { EducationSelector } from '@components/common/EducationSelector';
import { FamilyStructureSelector } from '@components/common/FamilyStructureSelector';
import { HolidayPreferencesSelector } from '@components/common/HolidayPreferencesSelector';
import { IncomeSelector } from '@components/common/IncomeSelector';
import { LanguagesSelector } from '@components/common/LanguagesSelector';
import { MarriageHistorySelector } from '@components/common/MarriageHistorySelector';
import { MarriageIntentionSelector } from '@components/common/MarriageIntentionSelector';
import { PetsSelector } from '@components/common/PetsSelector';
import { PrefectureSelector } from '@components/common/PrefectureSelector';
import { SmokingSelector } from '@components/common/SmokingSelector';
import { WantChildrenSelector } from '@components/common/WantChildrenSelector';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

/**
 * プロフィール詳細情報の型定義
 * 既存のProfileDetails型と互換性を保つため、string型も許可
 */
export interface ProfileDetails {
  height: number;
  weight?: number;
  bodyType?: BodyTypeName | string;
  bloodType?: BloodTypeName | string;
  hometown?: PrefectureName | string;
  occupation: string;
  education: EducationName | string;
  income?: IncomeName | string;
  familyStructure?: FamilyStructureName | string;
  pets?: PetName[] | string[];
  languages: LanguageName[] | string[];
  smoking: boolean;
  drinking: DrinkingName | string;
  children?: ChildrenName | string;
  holidayPreferences?: HolidayPreferenceName[];
  sleepSchedule?: string;
  marriageTimeline?: string;
  marriageViews?: string;
  livingTogether?: string;
  marriageHistory?: MarriageHistoryName | string;
  marriageIntention?: MarriageIntentionName | string;
  wantChildren?: WantChildrenName | string;
}

/**
 * プロフィール詳細編集コンポーネントのプロパティ
 * 
 * @interface ProfileDetailsEditProps
 * @property {ProfileDetails} details - プロフィール詳細情報のオブジェクト
 * @property {Function} onDetailsChange - 詳細情報変更時のコールバック関数
 */
interface ProfileDetailsEditProps {
  details: ProfileDetails;
  onDetailsChange: (details: ProfileDetails) => void;
}

/**
 * 詳細プロフィール編集コンポーネント
 * 
 * ユーザーの詳細なプロフィール情報を編集するコンポーネントです。
 * 情報は以下のセクションに分けて編集できます：
 * - 基本情報（身長、体重、体型、血液型、出身地）
 * - 職業・学歴（職業、学歴、年収）
 * - 家族・生活（同居人、子供、ペット）
 * - 生活習慣（タバコ、お酒、寝る時間）
 * - 休日・趣味（休日）
 * - 結婚・将来設計（結婚歴、結婚の意思、子供が欲しいか、結婚予定、結婚観、同居希望）
 * 
 * @param {ProfileDetailsEditProps} props - コンポーネントのプロパティ
 * @param {Object} props.details - プロフィール詳細情報のオブジェクト
 * @param {Function} props.onDetailsChange - 詳細情報変更時のコールバック
 * @returns {React.ReactElement} 詳細プロフィール編集コンポーネント
 */
export const ProfileDetailsEdit: React.FC<ProfileDetailsEditProps> = ({ details, onDetailsChange }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [localValues, setLocalValues] = useState({
    height: details.height.toString(),
    weight: details.weight?.toString() || '',
    occupation: details.occupation,
    sleepSchedule: details.sleepSchedule || '',
  });

  // デバウンス処理（500ms後に親に通知）
  useEffect(() => {
    const timer = setTimeout(() => {
      const updates: Partial<ProfileDetails> = {};

      // 身長の更新
      const heightValue = parseInt(localValues.height);
      if (!isNaN(heightValue) && heightValue !== details.height) {
        updates.height = heightValue;
      }

      // 体重の更新
      const weightValue = localValues.weight ? parseInt(localValues.weight) : undefined;
      if (weightValue !== details.weight) {
        updates.weight = weightValue;
      }

      // 職業の更新
      if (localValues.occupation !== details.occupation) {
        updates.occupation = localValues.occupation;
      }

      // 就寝時間の更新
      if (localValues.sleepSchedule !== (details.sleepSchedule || '')) {
        updates.sleepSchedule = localValues.sleepSchedule;
      }

      // 変更があった場合のみ親コンポーネントに通知
      if (Object.keys(updates).length > 0) {
        onDetailsChange({ ...details, ...updates });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValues, details, onDetailsChange]);

  // 外部からdetailsが変更された場合はローカル状態を更新
  useEffect(() => {
    setLocalValues({
      height: details.height.toString(),
      weight: details.weight?.toString() || '',
      occupation: details.occupation,
      sleepSchedule: details.sleepSchedule || '',
    });
  }, [details]);

  const updateDetail = (key: string, value: any) => {
    onDetailsChange({
      ...details,
      [key]: value
    });
  };

  const handleTextChange = useCallback((field: keyof typeof localValues, value: string) => {
    setLocalValues(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>詳細プロフィール</Text>

      {/* 基本情報セクション */}
      <View style={ProfileEditStyles.detailSection}>
        <Text style={ProfileEditStyles.detailSectionTitle}>基本情報</Text>

        {/* 身長（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>身長</Text>
          <TextInput
            style={[
              ProfileEditStyles.detailValue,
              focusedField === 'height' && ProfileEditStyles.inputFocused
            ]}
            value={localValues.height}
            onChangeText={(text) => handleTextChange('height', text)}
            onFocus={() => setFocusedField('height')}
            onBlur={() => setFocusedField(null)}
            placeholder="身長を入力"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <Text style={{ marginLeft: 8, color: '#6B7280' }}>cm</Text>
        </View>

        {/* 体重（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>体重</Text>
          <TextInput
            style={[
              ProfileEditStyles.detailValue,
              focusedField === 'weight' && ProfileEditStyles.inputFocused
            ]}
            value={localValues.weight}
            onChangeText={(text) => handleTextChange('weight', text)}
            onFocus={() => setFocusedField('weight')}
            onBlur={() => setFocusedField(null)}
            placeholder="体重を入力（オプション）"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
          <Text style={{ marginLeft: 8, color: '#6B7280' }}>kg</Text>
        </View>

        {/* 体型（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>体型</Text>
          <BodyTypeSelector
            selectedBodyType={details.bodyType as BodyTypeName}
            onBodyTypeChange={(bodyType) => updateDetail('bodyType', bodyType)}
            placeholder="体型を選択（オプション）"
          />
        </View>

        {/* 血液型（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>血液型</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <BloodTypeSelector
              selectedBloodType={details.bloodType as BloodTypeName}
              onBloodTypeChange={(bloodType) => updateDetail('bloodType', bloodType)}
              placeholder="血液型を選択（オプション）"
            />
            <Text style={{ marginLeft: 8, color: '#6B7280' }}>型</Text>
          </View>
        </View>

        {/* 出身地（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>出身地</Text>
          <PrefectureSelector
            selectedPrefecture={details.hometown as PrefectureName}
            onPrefectureChange={(hometown) => updateDetail('hometown', hometown)}
            placeholder="出身地を選択（オプション）"
          />
        </View>
      </View>

      {/* 職業・学歴セクション */}
      <View style={ProfileEditStyles.detailSection}>
        <Text style={ProfileEditStyles.detailSectionTitle}>職業・学歴</Text>

        {/* 職業（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>職業</Text>
          <View style={{ flex: 1 }}>
            <TextInput
              style={[
                ProfileEditStyles.detailValue,
                focusedField === 'occupation' && ProfileEditStyles.inputFocused
              ]}
              value={localValues.occupation}
              onChangeText={(text) => handleTextChange('occupation', text)}
              onFocus={() => setFocusedField('occupation')}
              onBlur={() => setFocusedField(null)}
              placeholder="職業を入力（30文字以内）"
              placeholderTextColor="#9CA3AF"
              maxLength={30}
            />
            <Text style={ProfileEditStyles.inputHelperText}>
              {localValues.occupation.length}/30 文字
            </Text>
          </View>
        </View>

        {/* 学歴（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>学歴</Text>
          <EducationSelector
            selectedEducation={details.education as EducationName}
            onEducationChange={(education) => updateDetail('education', education)}
            placeholder="学歴を選択"
          />
        </View>

        {/* 年収（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>年収</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <IncomeSelector
              selectedIncome={details.income as IncomeName}
              onIncomeChange={(income) => updateDetail('income', income)}
              placeholder="年収を選択"
            />
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#000000' }}>万円</Text>
          </View>
        </View>

        {/* 休日（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>休日</Text>
          <HolidayPreferencesSelector
            selectedPreference={details.holidayPreferences?.[0]}
            onPreferenceChange={(preference) => updateDetail('holidayPreferences', [preference])}
            placeholder="休日を選択"
          />
        </View>
      </View>

      {/* 家族・生活セクション */}
      <View style={ProfileEditStyles.detailSection}>
        <Text style={ProfileEditStyles.detailSectionTitle}>家族・生活</Text>

        {/* 同居人（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>同居人</Text>
          <FamilyStructureSelector
            selectedStructure={details.familyStructure as FamilyStructureName}
            onStructureChange={(familyStructure) => updateDetail('familyStructure', familyStructure)}
            placeholder="同居人を選択（オプション）"
          />
        </View>

        {/* 子供（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>子供</Text>
          <ChildrenSelector
            selectedChildren={details.children as ChildrenName}
            onChildrenChange={(children) => updateDetail('children', children)}
            placeholder="子供の有無を選択"
          />
        </View>

        {/* ペット（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>ペット</Text>
          <PetsSelector
            selectedPets={details.pets as PetName[]}
            onPetsChange={(pets) => updateDetail('pets', pets)}
            placeholder="ペットを選択（オプション）"
          />
        </View>

        {/* 第一言語（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>第一言語</Text>
          <LanguagesSelector
            selectedLanguage={Array.isArray(details.languages) ? details.languages[0] as LanguageName : details.languages as LanguageName}
            onLanguageChange={(language) => updateDetail('languages', [language])}
            placeholder="第一言語を選択"
          />
        </View>
      </View>

      {/* 生活習慣セクション */}
      <View style={ProfileEditStyles.detailSection}>
        <Text style={ProfileEditStyles.detailSectionTitle}>生活習慣</Text>

        {/* タバコ（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>タバコ</Text>
          <SmokingSelector
            selectedSmoking={details.smoking ? '吸う' : '吸わない'}
            onSmokingChange={(smoking) => updateDetail('smoking', smoking === '吸う')}
            placeholder="喫煙習慣を選択"
          />
        </View>

        {/* お酒（必須項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>お酒</Text>
          <DrinkingSelector
            selectedDrinking={details.drinking as DrinkingName}
            onDrinkingChange={(drinking) => updateDetail('drinking', drinking)}
            placeholder="飲酒習慣を選択"
          />
        </View>

        {/* 寝る時間（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>寝る時間</Text>
          <TextInput
            style={[
              ProfileEditStyles.detailValue,
              focusedField === 'sleepSchedule' && ProfileEditStyles.inputFocused
            ]}
            value={localValues.sleepSchedule}
            onChangeText={(text) => handleTextChange('sleepSchedule', text)}
            onFocus={() => setFocusedField('sleepSchedule')}
            onBlur={() => setFocusedField(null)}
            placeholder="寝る時間を入力（オプション）"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>


      {/* 結婚・将来設計セクション */}
      <View style={ProfileEditStyles.detailSection}>
        <Text style={ProfileEditStyles.detailSectionTitle}>結婚・将来設計</Text>

        {/* 結婚歴（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>結婚歴</Text>
          <MarriageHistorySelector
            selectedMarriageHistory={details.marriageHistory as MarriageHistoryName}
            onMarriageHistoryChange={(marriageHistory) => updateDetail('marriageHistory', marriageHistory)}
            placeholder="結婚歴を選択（オプション）"
          />
        </View>

        {/* 結婚の意思（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>結婚の意思</Text>
          <MarriageIntentionSelector
            selectedMarriageIntention={details.marriageIntention as MarriageIntentionName}
            onMarriageIntentionChange={(marriageIntention) => updateDetail('marriageIntention', marriageIntention)}
            placeholder="結婚の意思を選択（オプション）"
          />
        </View>

        {/* 子供が欲しいか（オプション項目） */}
        <View style={ProfileEditStyles.detailRow}>
          <Text style={ProfileEditStyles.detailLabel}>子供が欲しいか</Text>
          <WantChildrenSelector
            selectedWantChildren={details.wantChildren as WantChildrenName}
            onWantChildrenChange={(wantChildren) => updateDetail('wantChildren', wantChildren)}
            placeholder="子供が欲しいかを選択（オプション）"
          />
        </View>
      </View>
    </View>
  );
};

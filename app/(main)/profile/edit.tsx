import { ProfileBioEdit, ProfileDetailsEdit, ProfileInfoEdit, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { isWeb } from '@utils/platform';
import { ProfileData, getChangeSummary, getProfileDiff, hasProfileChanges } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - プロフィール情報の編集
 * - 画像の編集
 * - 保存機能
 */
const ProfileEditScreen = () => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();

  // プロフィール情報の状態管理
  const [originalProfileData, setOriginalProfileData] = useState<ProfileData>({
    name: '田中太郎',
    age: 25,
    location: '東京都',
    bio: 'こんにちは！趣味は読書と映画鑑賞です。よろしくお願いします。',
    tags: [
      { id: '1', name: 'コーヒー', imageUrl: '' },
      { id: '2', name: '読書', imageUrl: '' },
      { id: '3', name: '映画', imageUrl: '' },
    ],
    details: {
      height: 170,
      weight: 65,
      bodyType: '普通',
      bloodType: 'A型',
      hometown: '東京都',
      occupation: '会社員',
      education: '大学卒業',
      income: '400万円',
      familyStructure: '一人暮らし',
      pets: ['猫'],
      languages: ['日本語', '英語'],
      smoking: false,
      drinking: 'たまに',
      children: 'なし',
      travelPreferences: ['土日' as const],
      sleepSchedule: '23:00',
      marriageTimeline: '未定',
      marriageViews: 'お互いを理解し合える関係',
      livingTogether: '結婚後',
      marriageHistory: 'なし',
      marriageIntention: 'はい',
      wantChildren: 'はい',
    }
  });

  const [profileData, setProfileData] = useState<ProfileData>(originalProfileData);

  // Web版でのコンテンツ幅と余白の計算
  const contentWidth = isWeb ? Math.min(windowWidth * 0.9, 900) : windowWidth;
  const contentMargin = isWeb ? (windowWidth - contentWidth) / 2 : 0;

  // 保存処理
  const handleSave = () => {
    // 変更があるかチェック
    if (!hasProfileChanges(originalProfileData, profileData)) {
      Alert.alert('変更なし', '変更された内容がありません');
      return;
    }

    // 変更されたフィールドを取得
    const changes = getProfileDiff(originalProfileData, profileData);
    const changeSummary = getChangeSummary(originalProfileData, profileData);

    Alert.alert(
      '保存確認',
      `以下の項目を保存しますか？\n\n${changeSummary.join('\n')}`,
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '保存',
          onPress: async () => {
            try {
              // TODO: 実際の保存処理を実装
              console.log('変更されたフィールド:', changeSummary);
              console.log('保存する差分データ:', changes);

              // ここでFirestoreなどのDBに保存
              // await updateProfile(changes);

              Alert.alert('保存完了', 'プロフィールを保存しました');

              // 元のデータを更新
              setOriginalProfileData(profileData);

              // 自分のプロフィール画面に遷移
              router.push(getProfilePath('my-user-id') as any);
            } catch (error) {
              console.error('保存エラー:', error);
              Alert.alert('エラー', '保存に失敗しました');
            }
          }
        }
      ]
    );
  };

  // 戻る処理（キャンセル処理）
  const handleBack = () => {
    // 変更がある場合のみ確認ダイアログを表示
    if (hasProfileChanges(originalProfileData, profileData)) {
      Alert.alert(
        '編集内容を破棄しますか？',
        '保存していない変更があります',
        [
          { text: '続行', style: 'cancel' },
          {
            text: '破棄',
            onPress: () => {
              // 元のデータに戻す
              setProfileData(originalProfileData);
              router.back();
            }
          }
        ]
      );
    } else {
      // 変更がない場合は直接戻る
      router.back();
    }
  };

  return (
    <SafeAreaView style={ProfileDetailStyles.safeArea}>
      <ScrollView style={ProfileDetailStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* コンテンツ全体に余白を適用 */}
        <View style={[ProfileDetailStyles.contentContainer, { marginHorizontal: contentMargin }]}>



          {/* プロフィール情報編集 */}
          <ProfileInfoEdit
            name={profileData.name}
            age={profileData.age}
            location={profileData.location}
            isVerified={true}
            onNameChange={(name) => setProfileData(prev => ({ ...prev, name }))}
            onAgeChange={(age) => setProfileData(prev => ({ ...prev, age }))}
            onLocationChange={(location) => setProfileData(prev => ({ ...prev, location }))}
          />

          {/* 自己紹介編集 */}
          <ProfileBioEdit
            bio={profileData.bio}
            onBioChange={(bio) => setProfileData(prev => ({ ...prev, bio }))}
          />

          {/* タグ編集 */}
          <ProfileTagsEdit
            tags={profileData.tags}
            onTagsChange={(tags) => setProfileData(prev => ({ ...prev, tags }))}
          />

          {/* 詳細プロフィール編集 */}
          <ProfileDetailsEdit
            details={profileData.details}
            onDetailsChange={(details) => setProfileData(prev => ({ ...prev, details }))}
          />
        </View>
      </ScrollView>

      {/* 保存ボタン（いいねボタンと同じ配置） */}
      <View style={ProfileDetailStyles.likeButtonContainer}>
        <TouchableOpacity
          onPress={handleSave}
          style={{
            backgroundColor: '#10B981',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
          }}>
            保存
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

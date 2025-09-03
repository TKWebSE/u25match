import { ProfileBioEdit, ProfileDetailsEdit, ProfileImageEdit, ProfileInfoEdit, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { mockProfileData } from '@mock/UserEditMock';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { ProfileData, getChangeSummary, getProfileDiff, hasProfileChanges } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * モバイル版専用プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - モバイルに最適化されたレイアウト
 * - 縦並びの編集インターフェース
 * - タッチ操作に最適化されたUI
 * - ビジネスロジックとUI表示の両方
 */
const ProfileEditScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);

  // デバッグ用ログ
  console.log('🔍 index.native.tsx - mockProfileData:', mockProfileData);
  console.log('🔍 index.native.tsx - profileData:', profileData);

  // 保存処理
  const handleSave = async (newProfileData: ProfileData) => {
    try {
      // 変更されたフィールドを取得
      const changes = getProfileDiff(mockProfileData, newProfileData);
      const changeSummary = getChangeSummary(mockProfileData, newProfileData);

      console.log('変更されたフィールド:', changeSummary);
      console.log('保存する差分データ:', changes);

      // TODO: 実際の保存処理を実装
      // await updateProfile(changes);

      Alert.alert('保存完了', 'プロフィールを保存しました');

      // 元のデータを更新
      setProfileData(newProfileData);

      // 自分のプロフィール画面に遷移
      if (user?.uid) {
        router.push(getProfilePath(user.uid) as any);
      } else {
        // ユーザーIDが取得できない場合は前の画面に戻る
        router.back();
      }
    } catch (error) {
      console.error('保存エラー:', error);
      Alert.alert('エラー', '保存に失敗しました');
    }
  };

  // 戻る処理（キャンセル処理）
  const handleBack = () => {
    // 変更がある場合のみ確認ダイアログを表示
    if (hasProfileChanges(mockProfileData, profileData)) {
      Alert.alert(
        '編集内容を破棄しますか？',
        '保存していない変更があります',
        [
          { text: '続行', style: 'cancel' },
          {
            text: '破棄',
            onPress: () => {
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
        <View style={ProfileDetailStyles.contentContainer}>
          {/* モバイル版用のヘッダー */}
          <View style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
            backgroundColor: 'white',
            marginBottom: 20
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1F2937',
              textAlign: 'center'
            }}>
              プロフィール編集
            </Text>
          </View>

          <View style={{ padding: 20 }}>
            {/* プロフィール画像編集 */}
            <ProfileImageEdit
              images={profileData.images}
              onImagesChange={(images) => setProfileData(prev => ({ ...prev, images }))}
              maxImages={6}
            />

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

            {/* モバイル版用のボタン */}
            <View style={{ marginTop: 30, gap: 15 }}>
              <TouchableOpacity
                onPress={() => handleSave(profileData)}
                style={{
                  backgroundColor: '#10B981',
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16
                }}>
                  保存
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBack}
                style={{
                  backgroundColor: '#6B7280',
                  paddingVertical: 16,
                  borderRadius: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16
                }}>
                  キャンセル
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

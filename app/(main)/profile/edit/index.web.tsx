import { ProfileBioEdit, ProfileDetailsEdit, ProfileImageEdit, ProfileInfoEdit, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { mockProfileData } from '@mock/UserEditMock';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import { ProfileData, getChangeSummary, getProfileDiff } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Animated, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Web版専用プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - デスクトップに最適化されたレイアウト
 * - サイドバー付きの編集インターフェース
 * - より詳細な編集オプション
 * - ビジネスロジックとUI表示の両方
 */
const ProfileEditScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { width: windowWidth } = useWindowDimensions();

  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);

  // ボタンアニメーション用のstate
  const [saveButtonScale] = useState(new Animated.Value(1));

  // デバッグ用ログ
  console.log('🔍 index.web.tsx - mockProfileData:', mockProfileData);
  console.log('🔍 index.web.tsx - profileData:', profileData);

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

  // ボタンホバー効果
  const handleButtonPressIn = () => {
    Animated.timing(saveButtonScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.timing(saveButtonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Web版用の設定
  const contentWidth = Math.min(windowWidth * 0.9, 1200);
  const contentMargin = (windowWidth - contentWidth) / 2;



  // Web版用のヘッダー
  const WebHeader = () => (
    <View style={ProfileEditStyles.header}>
      <Text style={ProfileEditStyles.headerTitle}>プロフィール編集</Text>
      <Text style={ProfileEditStyles.headerSubtitle}>
        あなたの魅力を最大限にアピールしましょう
      </Text>
    </View>
  );

  // Web版用のサイドバー
  const LocalWebSidebar = () => (
    <View style={ProfileEditStyles.webSidebar}>
      <Text style={ProfileEditStyles.webSidebarTitle}>編集項目</Text>

      <View style={ProfileEditStyles.webSidebarItem}>
        <Text style={ProfileEditStyles.webSidebarItemTitle}>プロフィール画像</Text>
        <Text style={ProfileEditStyles.webSidebarItemDescription}>
          最大4枚まで追加可能
        </Text>
      </View>

      <View style={ProfileEditStyles.webSidebarItem}>
        <Text style={ProfileEditStyles.webSidebarItemTitle}>基本情報</Text>
        <Text style={ProfileEditStyles.webSidebarItemDescription}>
          名前、居住地
        </Text>
      </View>

      <View style={ProfileEditStyles.webSidebarItem}>
        <Text style={ProfileEditStyles.webSidebarItemTitle}>自己紹介</Text>
        <Text style={ProfileEditStyles.webSidebarItemDescription}>
          あなたの魅力を伝える文章
        </Text>
      </View>

      <View style={ProfileEditStyles.webSidebarItem}>
        <Text style={ProfileEditStyles.webSidebarItemTitle}>タグ</Text>
        <Text style={ProfileEditStyles.webSidebarItemDescription}>
          趣味や興味を表すタグ
        </Text>
      </View>

      <View style={ProfileEditStyles.webSidebarItem}>
        <Text style={ProfileEditStyles.webSidebarItemTitle}>詳細情報</Text>
        <Text style={ProfileEditStyles.webSidebarItemDescription}>
          身長、体重、職業など
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={ProfileEditStyles.container}>
      <ScrollView style={ProfileEditStyles.content} showsVerticalScrollIndicator={false}>
        <View style={[ProfileEditStyles.webContainer, { marginHorizontal: contentMargin }]}>
          <WebHeader />

          <View style={{ flexDirection: 'row' }}>
            {/* <LocalWebSidebar /> */}

            <View style={{ flex: 1, padding: 20 }}>
              {/* プロフィール画像編集 */}
              <ProfileImageEdit
                images={profileData.images}
                onImagesChange={(images) => setProfileData(prev => ({ ...prev, images }))}
                maxImages={4}
              />

              {/* プロフィール情報編集 */}
              <ProfileInfoEdit
                name={profileData.name}
                location={profileData.location}
                isVerified={true}
                onNameChange={(name) => setProfileData(prev => ({ ...prev, name }))}
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

              {/* 保存ボタン */}
              <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
                <Animated.View style={{ transform: [{ scale: saveButtonScale }] }}>
                  <TouchableOpacity
                    onPress={() => handleSave(profileData)}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                    style={[ProfileEditStyles.button, {
                      minWidth: 200,
                      paddingHorizontal: 40,
                      paddingVertical: 16
                    }]}
                    activeOpacity={0.8}
                  >
                    <Text style={[ProfileEditStyles.buttonText, {
                      fontSize: 18,
                      fontWeight: '700'
                    }]}>保存</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

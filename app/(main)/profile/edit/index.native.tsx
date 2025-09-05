import { ProfileBioEdit, ProfileDetailsEdit, ProfileImageEdit, ProfileInfoEdit, ProfileInfoEditRef, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { mockProfileData } from '@mock/UserEditMock';
import { ProfileEditMobile } from '@styles/profile/mobile';
import { ProfileData, getChangeSummary, getProfileDiff, hasProfileChanges } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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

  // モバイル専用のスタイルを使用
  const ProfileEditStyles = ProfileEditMobile;

  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<ProfileData>(mockProfileData);

  // スクロール制御用のref
  const scrollViewRef = useRef<ScrollView>(null);
  const profileInfoRef = useRef<ProfileInfoEditRef>(null);

  // ボタンアニメーション用のstate
  const [saveButtonScale] = useState(new Animated.Value(1));
  const [cancelButtonScale] = useState(new Animated.Value(1));

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

  // フィールドフォーカス時のスクロール処理
  const handleFieldFocus = (fieldName: string) => {
    // 少し遅延を入れてキーボードの表示を待つ
    setTimeout(() => {
      if (scrollViewRef.current) {
        // 基本情報セクションの位置にスクロール
        scrollViewRef.current.scrollTo({
          y: 200, // プロフィール画像の下あたり
          animated: true,
        });
      }
    }, 100);
  };

  // ボタンホバー効果
  const handleButtonPressIn = (buttonScale: Animated.Value) => {
    Animated.timing(buttonScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = (buttonScale: Animated.Value) => {
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
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
    <SafeAreaView style={ProfileEditStyles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={ProfileEditStyles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={ProfileEditStyles.scrollContent}
      >
        {/* モバイル版用のヘッダー */}
        <View style={ProfileEditStyles.header}>
          <Text style={ProfileEditStyles.headerTitle}>プロフィール編集</Text>
          <Text style={ProfileEditStyles.headerSubtitle}>
            あなたの魅力を最大限にアピールしましょう
          </Text>
        </View>

        {/* プロフィール画像編集 */}
        <ProfileImageEdit
          images={profileData.images}
          onImagesChange={(images) => setProfileData(prev => ({ ...prev, images }))}
          maxImages={4}
        />

        {/* プロフィール情報編集 */}
        <ProfileInfoEdit
          ref={profileInfoRef}
          name={profileData.name}
          location={profileData.location}
          isVerified={true}
          onNameChange={(name) => setProfileData(prev => ({ ...prev, name }))}
          onLocationChange={(location) => setProfileData(prev => ({ ...prev, location }))}
          onFocus={handleFieldFocus}
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
      </ScrollView>

      {/* 固定ボタンエリア */}
      <View style={ProfileEditStyles.fixedFooter}>
        <View style={ProfileEditStyles.footerButtons}>
          <Animated.View style={{ transform: [{ scale: saveButtonScale }], flex: 1 }}>
            <TouchableOpacity
              onPress={() => handleSave(profileData)}
              onPressIn={() => handleButtonPressIn(saveButtonScale)}
              onPressOut={() => handleButtonPressOut(saveButtonScale)}
              style={[ProfileEditStyles.button, ProfileEditStyles.footerButton]}
              activeOpacity={0.8}
            >
              <Text style={ProfileEditStyles.buttonText}>保存</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: cancelButtonScale }], flex: 1 }}>
            <TouchableOpacity
              onPress={handleBack}
              onPressIn={() => handleButtonPressIn(cancelButtonScale)}
              onPressOut={() => handleButtonPressOut(cancelButtonScale)}
              style={[ProfileEditStyles.button, ProfileEditStyles.buttonSecondary, ProfileEditStyles.footerButton]}
              activeOpacity={0.8}
            >
              <Text style={[ProfileEditStyles.buttonText, ProfileEditStyles.buttonSecondaryText]}>キャンセル</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

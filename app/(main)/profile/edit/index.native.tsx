import { LoadingState } from '@components/common';
import { ProfileBioEdit, ProfileDetailsEdit, ProfileImageEdit, ProfileInfoEdit, ProfileInfoEditRef, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { useStrictAuth } from '@hooks/auth';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import { getProfile } from '@usecases/profile/getProfile';
import { updateProfile } from '@usecases/profile/updateProfile';
import { EditableProfileData, getProfileDiff } from '@utils/profileDiff';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
  const user = useStrictAuth();

  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<EditableProfileData | null>(null);
  const [initialData, setInitialData] = useState<EditableProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // スクロール制御用のref
  const scrollViewRef = useRef<ScrollView>(null);
  const profileInfoRef = useRef<ProfileInfoEditRef>(null);

  // ボタンアニメーション用のstate
  const [saveButtonScale] = useState(new Animated.Value(1));
  const [cancelButtonScale] = useState(new Animated.Value(1));

  // プロフィールデータを取得
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);

        const result = await getProfile(user.uid);

        setProfileData(result.profile);
        setInitialData(result.profile); // 差分比較用の初期データ
      } catch (error: any) {
        showErrorToast(error.message || 'プロフィールの取得に失敗しました');
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user.uid]);



  // 保存処理
  const handleSave = async () => {
    // ローディングガードで弾かれるはずだが、TypeScriptの型チェックのため
    if (!initialData || !profileData) return;

    try {
      // 変更されたフィールドを取得（初期データと比較）
      const changes = getProfileDiff(initialData, profileData);

      // 変更がない場合は何もしない
      if (Object.keys(changes).length === 0) {
        showErrorToast('変更がありません');
        return;
      }

      // プロフィールを更新
      await updateProfile(user.uid, changes);

      showSuccessToast('プロフィールを保存しました');

      // 自分のプロフィール画面に遷移
      router.push(getProfilePath(user.uid) as any);
    } catch (error: any) {
      showErrorToast(error.message || '保存に失敗しました');
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
    if (initialData && profileData) {
      const changes = getProfileDiff(initialData, profileData);
      if (Object.keys(changes).length > 0) {
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
        return;
      }
    }
    // 変更がない場合は直接戻る
    router.back();
  };

  // ローディング中の表示
  if (isLoading || !profileData || !initialData) {
    return <LoadingState />;
  }

  return (
    <SafeAreaView style={ProfileEditStyles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={ProfileEditStyles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          onImagesChange={(images) => setProfileData({ ...profileData, images })}
          maxImages={4}
        />

        {/* プロフィール情報編集 */}
        <ProfileInfoEdit
          ref={profileInfoRef}
          name={profileData.name}
          location={profileData.location}
          isVerified={true}
          onNameChange={(name) => setProfileData({ ...profileData, name })}
          onLocationChange={(location) => setProfileData({ ...profileData, location })}
          onFocus={handleFieldFocus}
        />

        {/* 自己紹介編集 */}
        <ProfileBioEdit
          bio={profileData.bio}
          onBioChange={(bio) => setProfileData({ ...profileData, bio })}
        />

        {/* タグ編集 */}
        <ProfileTagsEdit
          tags={profileData.tags}
          onTagsChange={(tags) => setProfileData({ ...profileData, tags })}
        />

        {/* 詳細プロフィール編集 */}
        <ProfileDetailsEdit
          details={profileData.details}
          onDetailsChange={(details) => setProfileData({ ...profileData, details })}
        />

        {/* モバイル版用のボタン */}
        <View style={ProfileEditStyles.footer}>
          <View style={ProfileEditStyles.footerButtons}>
            <Animated.View style={{ transform: [{ scale: saveButtonScale }], flex: 1 }}>
              <TouchableOpacity
                onPress={handleSave}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

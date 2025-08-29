import { ProfileBioEdit, ProfileDetailsEdit, ProfileInfoEdit, ProfileTagsEdit } from '@components/profile/edit';
import { getProfilePath } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { mockProfileData } from '@mock/UserEditMock';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { ProfileData, getChangeSummary, getProfileDiff, hasProfileChanges } from '@utils/profileDiff';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
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

  // Web版用の設定
  const contentWidth = Math.min(windowWidth * 0.9, 1200);
  const contentMargin = (windowWidth - contentWidth) / 2;



  // Web版用のヘッダー
  const WebHeader = () => (
    <View style={{
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      backgroundColor: 'white',
      marginBottom: 20
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        textAlign: 'center'
      }}>
        プロフィール編集
      </Text>
      <Text style={{
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 8
      }}>
        あなたの魅力を最大限にアピールしましょう
      </Text>
    </View>
  );

  // Web版用のサイドバー
  const WebSidebar = () => (
    <View style={{
      width: 250,
      padding: 20,
      backgroundColor: '#F9FAFB',
      borderRightWidth: 1,
      borderRightColor: '#E5E7EB'
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 16
      }}>
        編集項目
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          marginBottom: 8
        }}>
          基本情報
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#9CA3AF'
        }}>
          名前、年齢、居住地
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          marginBottom: 8
        }}>
          自己紹介
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#9CA3AF'
        }}>
          あなたの魅力を伝える文章
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          marginBottom: 8
        }}>
          タグ
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#9CA3AF'
        }}>
          趣味や興味を表すタグ
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{
          fontSize: 14,
          color: '#6B7280',
          marginBottom: 8
        }}>
          詳細情報
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#9CA3AF'
        }}>
          身長、体重、職業など
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={ProfileDetailStyles.safeArea}>
      <ScrollView style={ProfileDetailStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={[ProfileDetailStyles.contentContainer, { marginHorizontal: contentMargin }]}>
          <WebHeader />

          <View style={{ flexDirection: 'row' }}>
            <WebSidebar />

            <View style={{ flex: 1, padding: 20 }}>
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
          </View>
        </View>
      </ScrollView>

      {/* Web版用の保存ボタン */}
      <View style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000
      }}>
        <TouchableOpacity
          onPress={() => handleSave(profileData)}
          style={{
            backgroundColor: '#10B981',
            paddingHorizontal: 32,
            paddingVertical: 16,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 5,
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

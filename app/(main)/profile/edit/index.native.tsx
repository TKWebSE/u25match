import { ProfileBioEdit, ProfileDetailsEdit, ProfileInfoEdit, ProfileTagsEdit } from '@components/profile/edit';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { ProfileData } from '@utils/profileDiff';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * モバイル版専用プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - モバイルに最適化されたレイアウト
 * - 縦並びの編集インターフェース
 * - タッチ操作に最適化されたUI
 * - UI表示のみ（ビジネスロジックは親から受け取る）
 */
interface EditProps {
  originalProfileData: ProfileData;
  onSave: (profileData: ProfileData) => void;
  onBack: () => void;
}

const Edit: React.FC<EditProps> = ({
  originalProfileData,
  onSave,
  onBack
}) => {
  // プロフィール情報の状態管理
  const [profileData, setProfileData] = useState<ProfileData>(originalProfileData);

  // 保存処理（親から受け取った関数を呼び出し）
  const handleSave = () => {
    onSave(profileData);
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
                onPress={handleSave}
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
                onPress={onBack}
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

export default Edit;

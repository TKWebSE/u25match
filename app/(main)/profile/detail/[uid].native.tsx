// app/(main)/profile/detail/[uid].native.tsx
import { LikeButton } from '@/src/components/profile/detail/mobile/LikeButton.native';
import { LoadingState } from '@components/common';
import { ErrorState } from '@components/common/ErrorState';
import {
  MobileProfileBio,
  MobileProfileDetails,
  MobileProfileInfo,
  MobileProfileTags,
} from '@components/profile/detail';
import { EditButton } from '@components/profile/EditButton';
import ImageIndicator from '@components/profile/ImageIndicator';
import { MobileImageCarousel } from '@components/profile/MobileImageCarousel';
import { PROFILE_EDIT_SCREEN_PATH } from '@constants/routes';
import { useProfileDetail } from '@hooks/useProfileDetail';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const router = useRouter();

  // URLパラメータからユニークIDを取得
  const uniqueId = uid as string;

  // カスタムフックでビジネスロジックを管理
  const {
    profile,
    loading,
    error,
    liked,
    onlineStatus,
    handleLike,
    retry,
  } = useProfileDetail(uniqueId);

  // 読み込み中の表示
  if (loading) {
    return <LoadingState />;
  }

  // エラー時の表示
  if (error || !profile) {
    return <ErrorState error={error || 'プロフィールが見つかりません'} onRetry={retry} />;
  }

  return (
    <View style={ProfileDetailStyles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView style={ProfileDetailStyles.scrollContainer}>
        {/* コンテンツ全体 */}
        <View style={ProfileDetailStyles.contentContainer}>
          {/* 画像スライダー */}
          <View style={ProfileDetailStyles.imageContainer}>
            <MobileImageCarousel
              images={profile.images}
              currentIndex={activeDotIndex}
              onIndexChange={setActiveDotIndex}
            />
          </View>

          {/* 画像インジケーター（ドット） */}
          <ImageIndicator
            images={profile.images}
            currentIndex={activeDotIndex}
            onImageChange={setActiveDotIndex}
          />

          {/* プロフィール情報 */}
          <MobileProfileInfo
            name={profile.name}
            age={profile.age}
            location={profile.location}
            onlineStatus={onlineStatus}
            likeCount={profile.likeCount}
            isVerified={profile.isVerified}
          />

          {/* 自己紹介 */}
          <MobileProfileBio bio={profile.bio} />

          {/* タグ表示 */}
          <MobileProfileTags tags={profile.tags} />

          {/* 詳細プロフィール */}
          <MobileProfileDetails details={profile.details} />
        </View>
      </ScrollView>

      {/* 自分のプロフィールかどうかを判定 */}
      {profile.uid === 'my-user-id' ? (
        // 自分のプロフィールの場合：編集ボタン
        <View style={ProfileDetailStyles.likeButtonContainer}>
          <EditButton onPress={() => router.push(PROFILE_EDIT_SCREEN_PATH)} />
        </View>
      ) : (
        // 他人のプロフィールの場合：いいねボタン
        <View style={ProfileDetailStyles.likeButtonContainer}>
          <LikeButton onPress={handleLike} liked={liked} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50, // ステータスバーの下に配置
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // 透明度を大幅に上げる
    justifyContent: 'center',
    alignItems: 'center',
    // シャドウ効果を削除してクリーンに
    zIndex: 1000, // 他の要素より前面に表示
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // 白文字にして視認性を確保
  },
});

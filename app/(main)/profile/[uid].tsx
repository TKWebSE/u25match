// app/(main)/profile/[uid].tsx
import { ErrorState } from '@components/common/ErrorState';
import { LoadingState } from '@components/common/LoadingState';
import { ProfileBio, ProfileDetails, ProfileInfo, ProfileTags } from '@components/profile/detail';
import { EditButton } from '@components/profile/EditButton';
import ImageIndicator from '@components/profile/ImageIndicator';
import { LikeButton } from '@components/profile/LikeButton';
import { MobileImageCarousel } from '@components/profile/MobileImageCarousel';
import WebImageNavigator from '@components/profile/WebImageNavigator';
import { useProfileDetail } from '@hooks/useProfileDetail';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { isWeb } from '@utils/platform';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  useWindowDimensions,
  View
} from 'react-native';

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const { width: windowWidth } = useWindowDimensions();
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

  // Web版でのコンテンツ幅と余白の計算
  const contentWidth = isWeb ? Math.min(windowWidth * 0.9, 900) : windowWidth;
  const contentMargin = isWeb ? (windowWidth - contentWidth) / 2 : 0;

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
      <ScrollView style={ProfileDetailStyles.scrollContainer}>
        {/* コンテンツ全体に余白を適用 */}
        <View style={[ProfileDetailStyles.contentContainer, { marginHorizontal: contentMargin }]}>
          {/* 画像スライダー */}
          <View style={ProfileDetailStyles.imageContainer}>
            {/* スクリーン側でプラットフォーム判定 */}
            {isWeb ? (
              // Web版: 画像表示コンポーネント（矢印ボタン付き）
              <WebImageNavigator
                images={profile.images}
                currentIndex={activeDotIndex}
                onImageChange={setActiveDotIndex}
              />
            ) : (
              // モバイル版: 画像カルーセルコンポーネント
              <MobileImageCarousel
                images={profile.images}
                currentIndex={activeDotIndex}
                onIndexChange={setActiveDotIndex}
              />
            )}
          </View>

          {/* 画像インジケーター（ドット） */}
          <ImageIndicator
            images={profile.images}
            currentIndex={activeDotIndex}
            onImageChange={setActiveDotIndex}
          />

          {/* プロフィール情報 */}
          <ProfileInfo
            name={profile.name}
            age={profile.age}
            location={profile.location}
            onlineStatus={onlineStatus}
            likeCount={profile.likeCount}
            isVerified={profile.isVerified}
          />

          {/* 自己紹介 */}
          <ProfileBio bio={profile.bio} />

          {/* タグ表示 */}
          <ProfileTags tags={profile.tags} />

          {/* 詳細プロフィール */}
          <ProfileDetails details={profile.details} />
        </View>
      </ScrollView >

      {/* 自分のプロフィールかどうかを判定 */}
      {profile.uid === 'my-user-id' ? (
        // 自分のプロフィールの場合：編集ボタン
        <View style={ProfileDetailStyles.likeButtonContainer}>
          <EditButton onPress={() => router.push('/(main)/profile/edit')} />
        </View>
      ) : (
        // 他人のプロフィールの場合：いいねボタン
        <View style={ProfileDetailStyles.likeButtonContainer}>
          <LikeButton onPress={handleLike} liked={liked} />
        </View>
      )}
    </View >
  );
} 

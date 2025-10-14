// app/(main)/profile/detail/[uid].web.tsx
import { ErrorState, LoadingState } from '@components/common';
import {
  EditButton,
  ImageIndicator,
  LikeButton,
  WebImageCarousel,
  WebProfileBio,
  WebProfileDetails,
  WebProfileInfo,
  WebProfileTags
} from '@components/profile/detail/web';
import { PROFILE_EDIT_SCREEN_PATH } from '@constants/routes';
import { ProfileDetail } from '@services/profile/types';
import { authStore } from '@stores/authStore';
import { ProfileDetailStyles as WebProfileDetailStyles } from '@styles/profile/detail/web/ProfileDetailStyles.web';
import { getProfile } from '@usecases/profile/getProfile';
import { sendLike } from '@usecases/profile/sendLike';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import { showErrorToast } from '@utils/showToast';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  // 状態管理
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // いいね送信中フラグ
  const [hasError, setHasError] = useState(false); // エラー状態

  // プロフィールデータを取得
  const loadProfile = useCallback(async () => {
    try {
      setHasError(false);
      const result = await getProfile(uniqueId);
      setProfile(result.profile);
      setLiked(result.hasLiked);
      // プロフィール変更時に画像インデックスをリセット
      setActiveDotIndex(0);
    } catch (err: any) {
      setHasError(true);
      showErrorToast(err.message || 'プロフィールの取得に失敗しました');
    }
  }, [uniqueId]);

  // いいね送信（連打防止強化版）
  const handleLike = async () => {
    // 既にいいね済み or いいね送信中なら何もしない
    if (liked || isLiking) return;

    setIsLiking(true); // 送信中フラグを立てる
    setLiked(true);    // UI即座に反映

    try {
      await sendLike(uniqueId);
      // 成功したのでliked=trueのまま
    } catch (err: any) {
      showErrorToast(err.message || 'いいねの送信に失敗しました');
      // エラー時のみ元に戻す
      setLiked(false);
    } finally {
      setIsLiking(false); // 送信完了
    }
  };

  // 画面フォーカス時に再読み込み（編集後に戻ってきた時も自動更新）
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  // エラー発生時の表示
  if (hasError) {
    return <ErrorState message="プロフィールの読み込みに失敗しました" onRetry={loadProfile} />;
  }

  // プロフィールが取得できていない場合はローディング表示
  if (!profile) {
    return <LoadingState />;
  }

  // Web版でのコンテンツ幅と余白の計算
  const contentWidth = Math.min(windowWidth * 0.9, 1200);
  const contentMargin = (windowWidth - contentWidth) / 2;

  // オンライン状態を計算
  const onlineStatus = getOnlineStatus(profile.lastActiveAt);

  return (
    <View style={WebProfileDetailStyles.container}>
      {/* 戻るボタン */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView style={WebProfileDetailStyles.scrollContainer}>
        {/* コンテンツ全体に余白を適用 */}
        <View style={[WebProfileDetailStyles.contentContainer, { marginHorizontal: contentMargin }]}>
          {/* 画像スライダー */}
          <View style={WebProfileDetailStyles.imageContainer}>
            <WebImageCarousel
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
          <WebProfileInfo
            name={profile.name}
            age={profile.age}
            location={profile.location}
            onlineStatus={onlineStatus}
            likeCount={profile.likeCount}
            isVerified={profile.isVerified}
          />

          {/* 自己紹介 */}
          <WebProfileBio bio={profile.bio} />

          {/* タグ表示 */}
          <WebProfileTags tags={profile.tags} />

          {/* 詳細プロフィール */}
          <WebProfileDetails details={profile.details} />
        </View>
      </ScrollView>

      {/* 自分のプロフィールかどうかを判定 */}
      {profile.uid === authStore.getState().user?.uid ? (
        // 自分のプロフィールの場合：編集ボタン
        <View style={WebProfileDetailStyles.likeButtonContainer}>
          <EditButton onPress={() => router.push(PROFILE_EDIT_SCREEN_PATH)} />
        </View>
      ) : (
        // 他人のプロフィールの場合：いいねボタン
        <View style={WebProfileDetailStyles.likeButtonContainer}>
          <LikeButton onPress={handleLike} liked={liked} disabled={isLiking} />
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

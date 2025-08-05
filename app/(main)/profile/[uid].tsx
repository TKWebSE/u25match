// app/(main)/profile/[uid].tsx
import CustomHeader from '@components/common/CustomHeader';
import CustomPagination from '@components/common/CustomPagination';
import TagList from '@components/explore/TagList';
import { ProfileDetail, profileDetailService } from '@services/profile';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import { getPlatformValue, isWeb } from '@utils/platform';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent, NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [onlineStatus, setOnlineStatus] = useState('読み込み中...');
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  // Web版でのコンテンツ幅と余白の計算
  const contentWidth = isWeb ? Math.min(windowWidth * 0.9, 900) : windowWidth; // Web版では画面幅の90%、最大900px
  const contentMargin = isWeb ? (windowWidth - contentWidth) / 2 : 0; // コンテンツの左右余白

  useEffect(() => {
    loadProfileDetail();
  }, [uid]);

  // プロフィールを取得
  const loadProfileDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 プロフィール詳細を取得中...', { uid });

      const response = await profileDetailService.getProfileDetail(uid as string);

      console.log('📋 プロフィール詳細レスポンス:', response);

      if (response.success && response.data) {
        setProfile(response.data);
        const status = getOnlineStatus(response.data.lastActiveAt);
        setOnlineStatus(status);
        console.log('✅ プロフィール詳細取得成功');
      } else {
        const errorMessage = response.error || 'プロフィールの取得に失敗しました';
        console.error('❌ プロフィール詳細取得失敗:', errorMessage);
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage = 'プロフィールの取得中にエラーが発生しました';
      console.error('💥 プロフィール詳細取得エラー:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // いいねボタンを押した時の処理
  const handleLike = async () => {
    try {
      const response = await profileDetailService.sendLike(uid as string);
      if (response.success) {
        setLiked(true);
        // いいねカウントを更新
        if (profile) {
          setProfile({
            ...profile,
            likeCount: profile.likeCount + 1,
          });
        }
      } else {
        console.error('Like error:', response.error);
      }
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  // 画像スライダーのスクロール処理
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageSize = width - 32;
    const index = Math.round(contentOffsetX / imageSize);
    setActiveDotIndex(index);
  };

  // 読み込み中の表示
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  // エラー時の表示
  if (error || !profile) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'プロフィールが見つかりません'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProfileDetail}>
          <Text style={styles.retryButtonText}>再試行</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* カスタムヘッダー */}
      <CustomHeader title="プロフィール" />

      <ScrollView style={styles.scrollContainer}>
        {/* コンテンツ全体に余白を適用 */}
        <View style={[styles.contentContainer, { marginHorizontal: contentMargin }]}>
          {/* 画像スライダー */}
          <View style={styles.imageContainer}>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={profile.images}
              keyExtractor={(_, i) => i.toString()}
              onScroll={handleScroll}
              getItemLayout={(data, index) => ({
                length: width - 32,
                offset: (width - 32) * index,
                index,
              })}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.profileImage} />
              )}
            />
            <CustomPagination dotsLength={profile.images.length} activeDotIndex={activeDotIndex} />
          </View>

          {/* 名前年齢＋オンライン */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {profile.name}（{profile.age}歳）
            </Text>
            <Text style={styles.online}>{onlineStatus}</Text>
            <Text style={styles.likes}>💖 {profile.likeCount} いいね</Text>
          </View>

          {/* 自己紹介 */}
          <View style={styles.bioContainer}>
            <Text style={styles.bioTitle}>自己紹介</Text>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>

          {/* タグ */}
          <TagList tags={profile.tags} />

          {/* 詳細プロフィール */}
          <View style={styles.detailsSection}>
            {Object.entries(profile.details).map(([label, value]) => (
              <View key={label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* いいねボタン */}
      {!liked && (
        <View style={styles.likeButtonContainer}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Text style={styles.likeText}>💖 いいねする</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    // コンテンツ全体のスタイル
  },
  imageContainer: {
    width: '100%',
    height: getPlatformValue(500, width),
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  profileImage: {
    width: width - 32,
    height: getPlatformValue(500, width),
    resizeMode: 'cover',
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    padding: 16,
    alignItems: 'center'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  online: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 4
  },
  likes: {
    fontSize: 14,
    color: '#888',
    marginTop: 4
  },
  bio: {
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 12
  },
  bioContainer: {
    backgroundColor: '#f6f7fb',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16
  },
  tagCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  tagImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500'
  },
  detailsSection: {
    padding: 16,
    paddingBottom: 100, // いいねボタンとの間隔を確保
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  detailLabel: {
    color: '#666'
  },
  detailValue: {
    fontWeight: '500'
  },
  likeButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  likeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 

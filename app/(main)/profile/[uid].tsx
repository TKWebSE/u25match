// app/(main)/profile/[uid].tsx
import CustomPagination from '@components/CustomPagination';
import TagList from '@components/TagList';
import { ProfileDetail, profileDetailService } from '@services/profileDetailService';
import { getOnlineStatus } from '@utils/getOnlineStatus';
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
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const router = useRouter();
  const [onlineStatus, setOnlineStatus] = useState('読み込み中...');
  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  useEffect(() => {
    loadProfileDetail();
  }, [uid]);

  const loadProfileDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await profileDetailService.getProfileDetail(uid as string);

      if (response.success && response.data) {
        setProfile(response.data);
        const status = getOnlineStatus(response.data.lastActiveAt);
        setOnlineStatus(status);
      } else {
        setError(response.error || 'プロフィールの取得に失敗しました');
      }
    } catch (err) {
      setError('プロフィールの取得中にエラーが発生しました');
      console.error('Profile loading error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveDotIndex(index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

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
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* 画像スライダー */}
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={profile.images}
          keyExtractor={(_, i) => i.toString()}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.profileImage} />
          )}
        />
        <CustomPagination dotsLength={profile.images.length} activeDotIndex={activeDotIndex} />

        {/* 名前年齢＋オンライン */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {profile.name}（{profile.age}歳）
          </Text>
          <Text style={styles.online}>{onlineStatus}</Text>
          <Text style={styles.likes}>💖 {profile.likeCount} いいね</Text>
        </View>

        {/* 自己紹介 */}
        <Text style={styles.bio}>自己紹介</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

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

        {/* 戻る */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>← 戻る</Text>
        </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#fff' },
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
  profileImage: { width, height: width, resizeMode: 'cover' },
  header: { padding: 16, alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold' },
  online: { fontSize: 14, color: '#4caf50', marginTop: 4 },
  likes: { fontSize: 14, color: '#888', marginTop: 4 },
  bio: { paddingHorizontal: 16, fontSize: 16, marginVertical: 12 },
  tagsSection: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 16 },
  tagCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7fb',
    borderRadius: 12,
    padding: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  tagImage: { width: 40, height: 40, borderRadius: 8, marginRight: 10 },
  tagText: { fontSize: 14, fontWeight: '500' },
  detailsSection: { padding: 16 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  detailLabel: { color: '#666' },
  detailValue: { fontWeight: '500' },
  closeButton: {
    padding: 16,
    alignSelf: 'center',
  },
  closeText: { color: '#007AFF', fontSize: 16 },
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

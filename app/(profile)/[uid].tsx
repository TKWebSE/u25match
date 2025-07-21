import TagList from '@components/TagList';
import { mockProfileUser } from '@mock/profileDetail';
import { getOnlineStatus } from '@utils/getOnlineStatus';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const mockUser = {
  ...mockProfileUser,
};

export default function ProfileScreen() {
  const { uid } = useLocalSearchParams();
  const router = useRouter();
  const [onlineStatus, setOnlineStatus] = useState('読み込み中...');
  const [profile, setProfile] = useState(mockUser);
  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(true);

  useEffect(() => {
    // FireStorekからユーザーデータを取得する処理を追加
    // ここではモックデータを使用
    // 実際のアプリでは、uidを使ってデータベースからユーザー情報を取得する
    setProfile(mockUser);
    // ユーザーステータスを取得する
    const status = getOnlineStatus(profile.lastActiveAt);
    setOnlineStatus(status);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* 画像スライダー */}
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={mockUser.images}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.profileImage} />
          )}
        />

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

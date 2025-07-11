// app/(main)/ExploreScreen.tsx
import { getUsersList } from '@/src/services/firestoreUserProfile'; // ユーザー一覧取得関数（サービス層で実装予定）
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ユーザー型定義
type User = {
  uid: string;
  name: string;
  bio?: string;
  photoURL?: string;
};

export default function ExploreScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getUsersList();
      setUsers(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photoURL }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio} numberOfLines={2}>{item.bio || '自己紹介はありません'}</Text>
      </View>
      <TouchableOpacity style={styles.likeButton} onPress={() => {/* いいね処理 */ }}>
        <Text style={styles.likeText}>💖</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.uid}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f7fb' },
  listContainer: { padding: 16, maxWidth: 400, alignSelf: 'center' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', color: '#333' },
  bio: { marginTop: 4, fontSize: 14, color: '#666' },
  likeButton: { padding: 8 },
  likeText: { fontSize: 24 },
});

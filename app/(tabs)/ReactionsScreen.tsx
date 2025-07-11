// app/(main)/ReactionsScreen.tsx
import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { getReactionsToCurrentUser } from '@services/firestoreReactions'; // サービス層にて後ほど実装
import { getAuth } from 'firebase/auth';

type ReactionItem = {
  uid: string;
  name: string;
  photoURL: string;
  type: 'like' | 'visit'; // 今後拡張も可能
  bio: string;
};

export default function ReactionsScreen() {
  const [reactions, setReactions] = useState<ReactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    (async () => {
      if (!user) return;
      const data = await getReactionsToCurrentUser(user.uid);
      setReactions(data);
      setLoading(false);
    })();
  }, [user]);

  const renderItem = ({ item }: { item: ReactionItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photoURL }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
        <Text style={styles.type}>
          {item.type === 'like' ? '💖 いいねされました' : '👣 足跡がありました'}
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>見る</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <FlatList
      data={reactions}
      keyExtractor={(item) => item.uid}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  listContainer: {
    padding: 16,
    maxWidth: 400,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  type: {
    fontSize: 12,
    color: '#6C63FF',
    marginTop: 4,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#6C63FF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

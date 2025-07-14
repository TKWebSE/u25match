// app/(profile)/profileViewScreen.tsx
import { PROFILE_EDIT_SCREEN_PATH } from '@constants/routes';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { getUserProfile } from '@services/firestoreUserProfile';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileViewScreen() {
  const user = useStrictAuth();
  const router = useRouter();

  const [profile, setProfile] = useState({ uid: '', name: '', bio: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile({ uid: user.uid, name: data.name || '', bio: data.bio || '' });
      }
      setLoading(false);
    })();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>プロフィール</Text>
      <Text style={styles.label}>名前</Text>
      <Text style={styles.value}>{profile?.name || '未設定'}</Text>

      <Text style={styles.label}>自己紹介</Text>
      <Text style={styles.value}>{profile?.bio || '未設定'}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(PROFILE_EDIT_SCREEN_PATH)}
      >
        <Text style={styles.editButtonText}>編集する</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 32,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    color: '#222',
    marginTop: 6,
  },
  editButton: {
    marginTop: 32,
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

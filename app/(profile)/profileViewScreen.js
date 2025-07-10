// app/(profile)profileViewScreen.js
import { getUserProfile } from '@services/firestoreUserProfile';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function ProfileViewScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const data = await getUserProfile(user.uid);
      setProfile(data);
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F7F9FC',
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
});

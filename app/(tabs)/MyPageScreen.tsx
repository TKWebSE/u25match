// app/(main)/MyPageScreen.tsx
import { getUserProfile } from '@/src/services/firestoreUserProfile';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MyPageScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  const [profile, setProfile] = useState<{ name: string; bio: string; photoURL?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (user) {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      }
      setLoading(false);
    })();
  }, [user]);

  const handleSignOut = async () => {
    Alert.alert('ログアウト確認', '本当にログアウトしますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: 'ログアウト',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          router.replace('/(auth)/loginScreen');
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    router.push('/(profile)/profileEditScreen');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profile?.photoURL || 'https://placehold.co/100x100?text=No+Image' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile?.name || '名無しユーザー'}</Text>
      <Text style={styles.bio}>{profile?.bio || '自己紹介は未設定です。'}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>プロフィールを編集</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleSignOut}>
        <Text style={[styles.buttonText, styles.logoutText]}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F7F9FC',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#eee',
  },
  logoutText: {
    color: '#444',
  },
});

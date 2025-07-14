// app/(profile)/profileEditScreen.js
import { PROFILE_SCREEN_PATH } from '@constants/routes';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { getUserProfile, updateUserProfile } from '@services/firestoreUserProfile';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function ProfileEditScreen() {
  const [profile, setProfile] = useState({ uid: '', name: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = useStrictAuth();
      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile({ uid: user.uid, name: data.name || '', bio: data.bio || '' });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(profile.uid, profile);
      Toast.show({ type: 'success', text1: 'プロフィールを保存しました！' });
      router.push(PROFILE_SCREEN_PATH)
    } catch {
      Toast.show({ type: 'error', text1: '保存に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F7F9FC' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>プロフィール編集</Text>

        <Text style={styles.label}>名前</Text>
        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
          placeholder="田中角栄"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>自己紹介</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={profile.bio}
          onChangeText={(text) => setProfile({ ...profile, bio: text })}
          placeholder="React Native大好きです！"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? '保存中...' : '保存する'}
          </Text>
        </TouchableOpacity>

        <Toast />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  bioInput: {
    height: 120,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
});

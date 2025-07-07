// app/(profile)/profileEditScreen.js
import { getUserProfile, updateUserProfile } from '@services/firestoreUserProfile';
import { getAuth } from 'firebase/auth';
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

export default function profileEditScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // 編集画面なので true に固定

  useEffect(() => {
    (async () => {
      if (!user) return;
      const data = await getUserProfile(user.uid);
      if (data) {
        setProfile({ name: data.name || '', bio: data.bio || '' });
      }
      setLoading(false);
    })();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user, profile);
      Toast.show({ type: 'success', text1: 'プロフィールを保存しました！' });
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
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 24,
    color: '#222',
  },
  bioInput: {
    height: 120,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

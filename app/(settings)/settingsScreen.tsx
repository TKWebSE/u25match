// app/(main)/settingsScreen.tsx
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import {
  StyleSheet
} from 'react-native';

export default function settingsScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();
  const [profile, setProfile] = useState<{ name: string; bio: string; photoURL?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <>setting</>
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

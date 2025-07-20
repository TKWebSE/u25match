// app/(other)/settingsScreen.js
import { PROFILE_EDIT_SCREEN_PATH } from '@constants/routes';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { logOut } from '@services/auth';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const user = useStrictAuth();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push(PROFILE_EDIT_SCREEN_PATH)}>
        <Text style={styles.buttonText}>プロフィール編集</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={logOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
  },
  welcome: {
    fontSize: 20,
    color: '#555',
  },
  email: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 40,
    color: '#222',
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 24,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

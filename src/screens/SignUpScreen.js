// screen/SignUpScreen.js
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { signUp } from '../services/auth';
import { createUserInFirestore } from '../services/firestoreUser';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const { user } = await signUp(email, password);  // Firebase Authで登録
      await createUserInFirestore(user);               // Firestoreに登録
      Alert.alert('登録完了！', 'ようこそ！');
      navigation.navigate('Home');                      // ホーム画面に遷移（例）
    } catch (error) {
      Alert.alert('登録失敗', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10 }}
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

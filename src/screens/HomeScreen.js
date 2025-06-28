import { Button, Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../services/auth';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome, {user.email}!</Text>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
}

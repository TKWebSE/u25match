import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import EntryScreen from './app/(auth)/entryScreen';
import SignUpScreen from './app/(auth)/signUpScreen';
import HomeScreen from './app/(home)/homeScreen';
import ProfileScreen from './app/(profile)/profileEditScreen';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AppStack() {
  const { user, loading } = useAuth();
  console.log('Auth status:', { user, loading });
  if (loading) return null; // ローディング中は何も表示しない

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            {/* ユーザーがログインしている場合の画面 */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            {/* ユーザーがログインしていない場合の画面 */}
            <Stack.Screen name="Entry" component={EntryScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppStack />
      <Toast />
    </AuthProvider>
  );
}

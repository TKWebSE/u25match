import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'home') iconName = 'explore';
          else if (route.name === 'chatList') iconName = 'chat';
          else if (route.name === 'profile') iconName = 'person';
          else if (route.name === 'settings') iconName = 'settings';

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="home" options={{ title: '探す' }} />
      <Tab.Screen name="chatList" options={{ title: 'チャット' }} />
      <Tab.Screen name="profile" options={{ title: 'プロフィール' }} />
      <Tab.Screen name="settings" options={{ title: '設定' }} />
    </Tab.Navigator>
  );
}

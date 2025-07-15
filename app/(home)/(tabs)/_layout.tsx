// (home)/ (tabs)/_layout.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from './(chat)';
import ExploreScreen from './(explore)';
import ReactionsScreen from './(reactions)';
import SettingsScreen from './(settings)';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            explore: 'explore',
            chatList: 'chat',
            reactions: 'favorite',
            settings: 'settings',
          } as const;
          const iconName = iconMap[route.name] || 'help-outline';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="explore" component={ExploreScreen} options={{ title: '探す' }} />
      <Tab.Screen name="chatList" component={ChatListScreen} options={{ title: 'チャット' }} />
      <Tab.Screen name="reactions" component={ReactionsScreen} options={{ title: 'リアクション' }} />
      <Tab.Screen name="settings" component={SettingsScreen} options={{ title: '設定' }} />
    </Tab.Navigator>
  );
}

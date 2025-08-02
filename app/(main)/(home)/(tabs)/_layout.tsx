// app/(main)/(home)/(tabs)/_layout.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import ChatListScreen from './(chat)/index';
import ExploreScreen from './(explore)/index';
import ReactionsScreen from './(reactions)/index';
import SettingsScreen from './(settings)/index';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          title: '探す',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "explore" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="chatList"
        component={ChatListScreen}
        options={{
          title: 'チャット',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "chat" : "chat-bubble-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="reactions"
        component={ReactionsScreen}
        options={{
          title: 'リアクション',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "favorite" : "favorite-border"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: '設定',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "settings" : "tune"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 

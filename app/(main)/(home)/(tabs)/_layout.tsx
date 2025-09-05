// app/(main)/(home)/(tabs)/_layout.tsx
// タブナビゲーションのレイアウト - メインアプリの下部タブを管理
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '@styles/globalStyles';
import { isWeb } from '@utils/platform'; // isWebをインポート
import { Slot, usePathname } from 'expo-router'; // SlotとusePathnameをインポート
import { Platform, View } from 'react-native';

import ChatListScreen from './chat/index';
import ExploreScreen from './explore/index';
import ReactionsScreen from './reactions/index';
import SearchScreen from './search/index';
import SettingsScreen from './settings/index';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const pathname = usePathname();
  // Webの場合は下タブを非表示(これがないと、ドロワーが動かなくなる)
  if (isWeb) {
    console.log('tabのレイアウトpathnameは：', pathname);
    return <Slot />; // Web: 下タブなし、直接コンテンツ表示
  }

  // モバイルの場合のみ下タブを表示
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // ヘッダーを非表示
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0, // 上部の境界線を削除
          height: Platform.OS === 'ios' ? 72 : 72, // 高さをさらに縮小（iOS: 80→72, Android: 56→52）
          paddingBottom: Platform.OS === 'ios' ? 12 : 6, // 下部パディングをさらに縮小（iOS: 16→12, Android: 8→6）
          paddingTop: 6, // 上部パディングをさらに縮小（8→6）
          elevation: 8, // Android用の影
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderTopLeftRadius: 20, // 上部の角丸
          borderTopRightRadius: 20,
          // タブバーをさらに上に移動
          marginBottom: Platform.OS === 'ios' ? 16 : 12, // 下部マージンを増加（iOS: 8→16, Android: 4→12）
        },
        tabBarActiveTintColor: colors.primary, // アクティブ時の色
        tabBarInactiveTintColor: '#8E8E93', // 非アクティブ時の色
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarHideOnKeyboard: true, // キーボード表示時にタブを隠す
        tabBarBackground: () => (
          <View style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }} />
        ),
      }}
    >
      {/* 探すタブ - ユーザー検索・探索機能 */}
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "explore" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 検索タブ - 検索機能 */}
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "search" : "search"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* チャットタブ - メッセージ機能 */}
      <Tab.Screen
        name="chat"
        component={ChatListScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "chat" : "chat-bubble-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* リアクションタブ - いいね・リアクション機能 */}
      <Tab.Screen
        name="reactions"
        component={ReactionsScreen}
        options={{
          title: 'Reactions',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "favorite" : "favorite-border"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 設定タブ - アプリ設定・プロフィール管理 */}
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
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

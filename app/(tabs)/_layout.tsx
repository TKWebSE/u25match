// app/(tabs)/_layout.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 各タブに対応する画面コンポーネントをインポート
import ChatListScreen from '../(chat)/chatListScreen';
import ExploreScreen from '../(home)/ExploreScreen';
import ReactionsScreen from '../(reactions)/reactionsScreen';
import SettingScreen from '../(settings)/settingsScreen';


// BottomTabNavigatorのインスタンスを作成
const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      // 各タブの共通設定をここで定義
      screenOptions={({ route }) => ({
        headerShown: false, // 各画面のヘッダーは非表示（独自ヘッダーを使う場合）
        tabBarIcon: ({ color, size }) => {
          // タブ名とMaterialIconsのアイコン名を紐づけるマップ
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            home: 'explore',       // 探すタブ → 探検のアイコン
            chatList: 'chat',      // チャットタブ → チャット吹き出しのアイコン
            profile: 'person',     // マイページ → 人のシルエットアイコン
            reactions: 'favorite', // リアクション → ハートのアイコン
          };

          // 現在のルート名に対応したアイコン名を取得。なければ'help-outline'（？マーク）
          const iconName = iconMap[route.name] || 'help-outline';

          // アイコンコンポーネントを返す
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* 各タブ画面の登録 */}
      <Tab.Screen
        name="home" // タブ識別名。画面遷移の際に使う
        component={ExploreScreen} // 表示する画面コンポーネント
        options={{ title: '探す' }} // タブバーに表示するタイトル
      />
      <Tab.Screen
        name="chatList"
        component={ChatListScreen}
        options={{ title: 'チャット' }}
      />
      <Tab.Screen
        name="settings"
        component={SettingScreen}
        options={{ title: '設定' }}
      />
      <Tab.Screen
        name="reactions"
        component={ReactionsScreen}
        options={{ title: 'リアクション' }}
      />
    </Tab.Navigator>
  );
}

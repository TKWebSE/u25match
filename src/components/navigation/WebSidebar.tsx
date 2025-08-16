import { Colors } from '@constants/Colors';
import { RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface WebSidebarProps {
  onMenuSelect?: (menuId: string) => void;
}

/**
 * ブラウザ用左縦サイドナビゲーション
 * 各画面へのナビゲーションリンクを提供
 */
export const WebSidebar: React.FC<WebSidebarProps> = ({ onMenuSelect }) => {
  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];
  const user = useStrictAuth();

  // 現在選択されているメニューを管理
  const [selectedMenu, setSelectedMenu] = useState('explore');

  // ナビゲーションメニューアイテム
  const menuItems = [
    { id: 'recommendations', label: '今日のオススメ', icon: '⭐', route: RECOMMENDATIONS_SCREEN_PATH },
    { id: 'explore', label: '探す', icon: '🔍', route: '/(main)/(home)/(tabs)/(explore)' },
    { id: 'chat', label: 'チャット', icon: '💬', route: '/(main)/(home)/(tabs)/(chat)' },
    { id: 'reactions', label: 'リアクション', icon: '❤️', route: '/(main)/(home)/(tabs)/(reactions)' },
    { id: 'settings', label: '設定', icon: '⚙️', route: '/(main)/(home)/(tabs)/(settings)' },
    { id: 'profile', label: 'プロフィール', icon: '👤', route: `/(main)/profile/${user.uid}` },
    { id: 'sales', label: 'セールス', icon: '💰', route: '/(main)/sales' },
  ];

  // 現在のパスに基づいてメニューの選択状態を更新
  useEffect(() => {
    const currentPath = pathname;

    // パスに基づいてメニューIDを特定（より具体的なパスを先に判定）
    if (currentPath.includes('/(tabs)/(chat)')) {
      setSelectedMenu('chat');
    } else if (currentPath.includes('/(tabs)/(reactions)')) {
      setSelectedMenu('reactions');
    } else if (currentPath.includes('/(tabs)/(recommendations)')) {
      setSelectedMenu('recommendations');
    } else if (currentPath.includes('/(tabs)/(settings)')) {
      setSelectedMenu('settings');
    } else if (currentPath.includes('/(tabs)/(explore)')) {
      setSelectedMenu('explore');
    } else if (currentPath.includes('/profile/')) {
      setSelectedMenu('profile');
    } else if (currentPath.includes('/sales')) {
      setSelectedMenu('sales');
    }
  }, [pathname]);

  const handleNavigation = (menuId: string) => {
    setSelectedMenu(menuId);

    // 親コンポーネントに選択されたメニューを通知
    if (onMenuSelect) {
      onMenuSelect(menuId);
    }

    // 実際のルート遷移も試行（Web版では動作しない場合がある）
    const menuItem = menuItems.find(item => item.id === menuId);
    if (menuItem) {
      router.push(menuItem.route as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {/* ロゴ・アプリ名エリア */}
      <View style={[styles.header]}>
        <View style={styles.spacer}></View>
        <View style={styles.titleContainer}>
          <Text style={[styles.appName, { color: colors.text }]}>U25Match</Text>
          <Text style={[styles.appSubtitle, { color: colors.textSecondary }]}>25歳以下限定マッチング</Text>
        </View>
      </View>

      {/* ナビゲーションメニュー */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              selectedMenu === item.id && styles.selectedMenuItem
            ]}
            onPress={() => handleNavigation(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[
              styles.menuLabel,
              { color: selectedMenu === item.id ? '#6C63FF' : colors.text }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* フッターエリア */}
      <View style={[styles.footer]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>© 2025 U25Match</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    flexDirection: 'row', // ヘッダー内の要素を横並びに
    alignItems: 'center', // 縦方向の中央揃え
  },
  menuToggleButton: {
    padding: 8,
    marginRight: 16,
  },
  menuToggleIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1, // タイトルコンテナを伸ばして、メニューボタンとの間隔を確保
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  selectedMenuItem: {
    backgroundColor: '#f0f0ff',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    padding: 24,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  spacer: {
    width: 60, // メニューボタンとタイトルの間に空白を追加
  },
});

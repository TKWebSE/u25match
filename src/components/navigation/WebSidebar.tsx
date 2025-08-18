import { Colors } from '@constants/Colors';
import { RECOMMENDATIONS_SCREEN_PATH } from '@constants/routes';
import { useStrictAuth } from '@hooks/useStrictAuth';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
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
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light' as keyof typeof Colors];
  const user = useStrictAuth();

  // ナビゲーションメニューアイテム
  const menuItems = useMemo(() => [
    { id: 'recommendations', label: '今日のオススメ', icon: '⭐', route: RECOMMENDATIONS_SCREEN_PATH },
    { id: 'explore', label: '探す', icon: '🔍', route: '/(main)/(home)/(web-screens)/explore' },
    { id: 'chat', label: 'チャット', icon: '💬', route: '/(main)/(home)/(web-screens)/chat' },
    { id: 'reactions', label: 'リアクション', icon: '❤️', route: '/(main)/(home)/(web-screens)/reactions' },
    { id: 'settings', label: '設定', icon: '⚙️', route: '/(main)/(home)/(web-screens)/settings' },
    { id: 'profile', label: 'プロフィール', icon: '👤', route: `/(main)/profile/${user.uid}` },
    { id: 'sales', label: 'セールス', icon: '💰', route: '/(main)/sales' },
  ], [user.uid]);

  const handleNavigation = (menuId: string) => {
    // 親コンポーネントに選択されたメニューを通知
    if (onMenuSelect) {
      onMenuSelect(menuId);
    }

    // 実際のルート遷移
    const menuItem = menuItems.find(item => item.id === menuId);
    if (menuItem) {
      try {
        router.push(menuItem.route as any);
      } catch (error) {
        console.error('ナビゲーションエラー:', error);
        // フォールバック: 相対パスでの遷移を試行
        if (menuItem.route.startsWith('/(main)')) {
          router.push(menuItem.route.replace('/(main)', '') as any);
        }
      }
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
            style={styles.menuItem}
            onPress={() => handleNavigation(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: colors.text }]}>
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

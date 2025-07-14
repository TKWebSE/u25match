// components/CustomHeader.tsx
import { ENTRY_SCREEN_PATH, EXPLORE_SCREEN_PATH } from '@constants/routes';
import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * カスタムヘッダーコンポーネント
 * ロゴをタップするとログイン状態に応じて遷移先が変わる
 */
export default function CustomHeader({ title }: { title: string }) {
  const router = useRouter();
  const { user } = useAuth(); // userがnullかどうかでログイン判定

  const handleLogoPress = () => {
    if (user) {
      router.push(EXPLORE_SCREEN_PATH);  // ログイン中はHomeScreenへ
    } else {
      router.push(ENTRY_SCREEN_PATH);  // ログアウト中はentryScreenへ
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Text style={styles.logo}>Under25Match</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 80 }} /> {/* 右側の余白 */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

// app/(auth)/entryScreen.tsx
// エントリー画面 - アプリの最初の画面、ログインまたは新規登録への導線
import { LOGIN_SCREEN_PATH, SIGN_UP_SCREEN_PATH } from '@constants/routes';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EntryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* ロゴエリア - アプリのブランディング */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>U25</Text>
          </View>
          <Text style={styles.appName}>Under25 Match</Text>
        </View>

        {/* メインコンテンツ - アプリの説明と特徴 */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>25歳以下限定のマッチングアプリ</Text>
          <Text style={styles.subtitle}>
            同じ世代の仲間と出会い、新しい関係を築きませんか？
          </Text>

          {/* 特徴リスト - アプリの主要な特徴を表示 */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>年齢制限で安心</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureText}>気軽にチャット</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text style={styles.featureText}>プライバシー重視</Text>
            </View>
          </View>
        </View>

        {/* ボタンエリア - アクション導線 */}
        <View style={styles.buttonContainer}>
          {/* 新規登録ボタン - メインアクション */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push(SIGN_UP_SCREEN_PATH)}
          >
            <Text style={styles.primaryButtonText}>新規登録</Text>
          </TouchableOpacity>

          {/* ログインボタン - セカンダリアクション */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push(LOGIN_SCREEN_PATH)}
          >
            <Text style={styles.secondaryButtonText}>ログイン</Text>
          </TouchableOpacity>

          {/* 利用規約の同意文 */}
          <Text style={styles.termsText}>
            利用を開始することで、利用規約とプライバシーポリシーに同意したものとみなされます
          </Text>
        </View>
      </View>
    </View>
  );
}

// スタイル定義
const styles = StyleSheet.create({
  // メインコンテナ
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  // コンテンツ全体のレイアウト
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  // ロゴエリア
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  // ロゴの円形背景
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // ロゴテキスト
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  // アプリ名
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  // メインコンテンツエリア
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  // メインタイトル
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  // サブタイトル
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  // 特徴リスト
  features: {
    marginBottom: 40,
  },
  // 特徴アイテム
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  // 特徴アイコン
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  // 特徴テキスト
  featureText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  // ボタンコンテナ
  buttonContainer: {
    gap: 16,
  },
  // プライマリボタン（新規登録）
  primaryButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  // プライマリボタンテキスト
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // セカンダリボタン（ログイン）
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // セカンダリボタンテキスト
  secondaryButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  // 利用規約テキスト
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
});

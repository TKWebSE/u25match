import { StyleSheet } from 'react-native';

/**
 * 設定画面のスタイル定義
 */
export const SettingsStyles = StyleSheet.create({
  // セーフエリア
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // メインコンテナ
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    paddingHorizontal: 400, // 160から400に変更してさらに大幅に左右の隙間を増やす
  },

  // セクション
  section: {
    marginBottom: 30,
  },

  // セクションタイトル
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1a1a1a',
  },

  // ユーザー情報カード
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // アバター
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  // アバターテキスト
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // ユーザー詳細情報
  userDetails: {
    flex: 1,
  },

  // ユーザー名
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  // 名前とチェックマークのコンテナ
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  // チェックマーク
  verificationMark: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderWidth: 2,
  },
  // 確認済みチェックマーク
  verifiedMark: {
    color: '#38A169', // 緑色のチェックマーク
    borderColor: '#38A169', // 緑色の枠線
  },
  // 未確認チェックマーク
  unverifiedMark: {
    color: '#9CA3AF', // グレーのチェックマーク
    borderColor: '#9CA3AF', // グレーの枠線
  },

  // ユーザーメール
  userEmail: {
    fontSize: 14,
    color: '#666',
  },

  // 情報アイテム
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // 情報ラベル
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },

  // 情報値
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },

  // ボタン
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // ボタンテキスト
  buttonText: {
    fontSize: 16,
    color: '#1a1a1a',
  },

  // ボタン矢印
  buttonArrow: {
    fontSize: 18,
    color: '#ccc',
    fontWeight: 'bold',
  },

  // ログアウトボタン
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },

  // ログアウトボタン無効状態
  logoutButtonDisabled: {
    backgroundColor: '#ccc',
  },

  // ログアウトボタンテキスト
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
}); 

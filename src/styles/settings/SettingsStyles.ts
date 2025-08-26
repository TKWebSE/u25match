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
    fontSize: 18, // 16から18に変更して少し大きく
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
    marginLeft: 8,
    backgroundColor: '#38A169',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#38A169',
  },
  // 確認済みチェックマーク
  verifiedMark: {
    color: 'white', // 白色のチェックマーク
    fontSize: 12,
    fontWeight: 'bold',
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

  // アバターコンテナ
  avatarContainer: {
    marginRight: 16,
  },

  // 編集アイコン
  editIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 8,
  },

  // 導線セクション用スタイル
  // 新機能案内カード
  guideCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
  },

  // 新機能案内ヘッダー
  guideHeader: {
    marginBottom: 16,
  },

  // 新機能案内タイトル
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },

  // 新機能案内サブタイトル
  guideSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  // 新機能案内ボタン
  guideButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  // 新機能案内ボタンテキスト
  guideButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // クイックアクションコンテナ
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  // クイックアクションボタン
  quickActionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 80,
    justifyContent: 'center',
  },

  // クイックアクションアイコン
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  // クイックアクションテキスト
  quickActionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center',
  },

  // 推奨画面への導線用スタイル
  // 推奨画面への導線カード
  recommendationsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },

  // 推奨画面への導線コンテンツ
  recommendationsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // 推奨画面への導線アイコンコンテナ
  recommendationsIconContainer: {
    marginRight: 16,
  },

  // 推奨画面への導線アイコン
  recommendationsIcon: {
    fontSize: 32,
  },

  // 推奨画面への導線テキストコンテナ
  recommendationsTextContainer: {
    flex: 1,
  },

  // 推奨画面への導線タイトル
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },

  // 推奨画面への導線サブタイトル
  recommendationsSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },

  // 推奨画面への導線矢印
  recommendationsArrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
}); 

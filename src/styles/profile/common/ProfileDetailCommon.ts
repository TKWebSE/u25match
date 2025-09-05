import { colors } from '@styles/globalStyles';
import { StyleSheet } from 'react-native';

/**
 * プロフィール詳細画面の共通スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - モバイルとWebで共通するスタイルの定義
 * - 基本的なレイアウト、色、タイポグラフィの統一
 * - プラットフォーム固有でないスタイルの集約
 * - デザインシステムの一貫性の維持
 * - スタイルの重複を避けるための共通化
 * 
 * 設計思想：
 * - プラットフォーム間で一貫したユーザー体験を提供
 * - 基本的なUI要素は共通化してメンテナンス性を向上
 * - プラットフォーム固有の最適化は各専用ファイルで実装
 * 
 * 含まれるスタイルカテゴリ：
 * - コンテナ: 画面全体のレイアウト
 * - タイポグラフィ: テキストのスタイル統一
 * - セクションタイトル: 各セクションの見出し
 * - コンテンツ: 基本的なコンテンツ表示
 * - 詳細情報: プロフィール詳細の表示
 * - タグ: 興味・趣味タグの表示
 * - ボタン: アクションボタンの基本スタイル
 * 
 * 使用例：
 * ```typescript
 * import { ProfileDetailCommon } from '@styles/profile/common';
 * // 共通スタイルを継承してプラットフォーム固有スタイルを作成
 * ```
 */
export const ProfileDetailCommon = StyleSheet.create({
  // ===== 共通コンテナ =====
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // モダンな背景色
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },

  contentContainer: {
    // コンテンツ全体のスタイル
  },

  // ===== 共通タイポグラフィ =====
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 4,
  },

  age: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '500',
  },

  location: {
    fontSize: 18,
    color: '#718096',
    fontWeight: '600',
    marginTop: 4,
  },

  onlineStatus: {
    fontSize: 14,
    color: '#38a169',
    fontWeight: '500',
    marginTop: 8,
  },

  online: {
    fontSize: 16,
    color: '#38a169',
    marginTop: 4,
    fontWeight: '600',
  },

  likes: {
    fontSize: 16,
    color: '#718096',
    marginTop: 8,
    fontWeight: '600',
  },

  // ===== 共通セクションタイトル =====
  bioTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 8,
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 8,
  },

  tagsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'left',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingBottom: 8,
  },

  // ===== 共通コンテンツ =====
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
    fontWeight: '400',
  },

  // ===== 共通詳細情報 =====
  detailSection: {
    marginBottom: 24,
  },

  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },

  detailLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },

  detailValue: {
    fontSize: 14,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },

  // ===== 共通タグスタイル =====
  tagContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tagImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },

  tagText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3748',
    flex: 1,
  },

  // ===== 共通ボタンスタイル =====
  editButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#4A90E2',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ===== 編集画面用スタイル（互換性のため） =====
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 16,
  },

  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

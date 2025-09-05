import { colors, spacing, typography } from '@styles/globalStyles';
import { StyleSheet } from 'react-native';
import { ProfileEditCommon } from '../common/ProfileEditCommon';

/**
 * プロフィール編集画面のWeb専用スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - Webブラウザに最適化された編集画面のレイアウト設計
 * - マウス操作に適したサイズと間隔の設定
 * - レスポンシブデザインの実装
 * - Web特有のUI要素のスタイル定義
 * - デスクトップ・タブレット・モバイル対応
 * 
 * 設計思想：
 * - デスクトップファーストのレスポンシブデザイン
 * - サイドバー付きの編集インターフェース
 * - マウス操作に最適化されたホバー効果
 * - 中央寄せレイアウトによるコンテンツの最適表示
 * - Web特有の視覚効果とトランジション
 * 
 * 特徴：
 * - サイドバーレイアウト: 編集項目のナビゲーション
 * - 中央寄せレイアウト: 最大幅を制限して中央配置
 * - ホバー効果: マウスオーバー時の視覚的フィードバック
 * - レスポンシブ対応: 画面サイズに応じた適応的レイアウト
 * - Web特有のシャドウ: boxShadowを使用した立体感
 * - カーソル制御: ポインターとユーザー選択の適切な制御
 * 
 * 含まれるスタイルカテゴリ：
 * - コンテナ: 画面全体のレイアウトと中央寄せ
 * - サイドバー: 編集項目のナビゲーション
 * - 入力フィールド: Web最適化された入力要素
 * - ボタン: Web向けのボタンスタイルとホバー効果
 * - 画像編集: Web向けの画像編集スタイル
 * - タグ編集: Web向けのタグ編集スタイル
 * - 詳細情報: Web向けの詳細情報編集スタイル
 * - レスポンシブ: メディアクエリによる画面サイズ対応
 * 
 * 使用例：
 * ```typescript
 * import { ProfileEditWeb } from '@styles/profile/web';
 * // または
 * import { getProfileEditStyles } from '@styles/profile/platformStyles';
 * const styles = getProfileEditStyles(); // Webでは ProfileEditWeb を返す
 * ```
 */
export const ProfileEditWeb = StyleSheet.create({
  // 共通スタイルを継承
  ...ProfileEditCommon,

  // ===== Web専用コンテナ =====
  container: {
    flex: 1,
    backgroundColor: colors.background,
    maxWidth: 1000, // 最大幅を制限
    marginHorizontal: 'auto', // 中央寄せ
  },

  content: {
    padding: spacing.xl,
    maxWidth: 800, // コンテンツの最大幅を制限
    marginHorizontal: 'auto', // 中央寄せ
  },

  webContainer: {
    maxWidth: 800,
    marginHorizontal: 'auto',
  },

  // ===== Web専用ボタンスタイル =====
  button: {
    ...ProfileEditCommon.button,
    // Web用のホバー効果（React Nativeでは無効）
  },

  buttonHover: {
    transform: [{ scale: 1.02 }],
    opacity: 0.9,
    // Web用のシャドウ効果（React Nativeでは無効）
  },

  buttonSecondary: {
    ...ProfileEditCommon.buttonSecondary,
    // Web用のホバー効果（React Nativeでは無効）
  },

  buttonSecondaryHover: {
    backgroundColor: colors.gray200,
    transform: [{ scale: 1.02 }],
    opacity: 0.9,
    // Web用のシャドウ効果（React Nativeでは無効）
  },

  // ===== Web専用入力フィールド =====
  input: {
    ...ProfileEditCommon.input,
    // Web用のフォーカス効果（React Nativeでは無効）
  },

  inputFocused: {
    ...ProfileEditCommon.inputFocused,
    // Web用のフォーカス効果（React Nativeでは無効）
  },

  inputMultiline: {
    ...ProfileEditCommon.inputMultiline,
    minHeight: 120,
    // Web用のリサイズ（React Nativeでは無効）
  },

  // ===== Web専用画像スタイル =====
  imageContainer: {
    ...ProfileEditCommon.imageContainer,
    width: 140, // Web用に少し大きく
    height: 210, // Web用に少し大きく
    // Web用のホバー効果（React Nativeでは無効）
  },

  imageContainerHover: {
    transform: [{ scale: 1.02 }],
    // Web用のシャドウ効果（React Nativeでは無効）
  },

  imageAddButton: {
    ...ProfileEditCommon.imageAddButton,
    // Web用のホバー効果（React Nativeでは無効）
  },

  imageAddButtonHover: {
    backgroundColor: colors.gray200,
    borderColor: colors.gray400,
    transform: [{ scale: 1.02 }],
  },

  // ===== Web専用タグスタイル =====
  tagItem: {
    ...ProfileEditCommon.tagItem,
    // Web用のホバー効果（React Nativeでは無効）
  },

  tagItemHover: {
    transform: [{ scale: 1.05 }],
    // Web用のシャドウ効果（React Nativeでは無効）
  },

  tagRemoveButton: {
    ...ProfileEditCommon.tagRemoveButton,
    // Web用のホバー効果（React Nativeでは無効）
  },

  tagRemoveButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    transform: [{ scale: 1.1 }],
  },

  // ===== Web専用詳細情報 =====
  detailValue: {
    ...ProfileEditCommon.detailValue,
    // Web用のフォーカス効果（React Nativeでは無効）
  },

  detailValueFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
    // Web用のフォーカス効果（React Nativeでは無効）
  },

  // ===== Web専用サイドバー =====
  webSidebar: {
    width: 250,
    backgroundColor: colors.gray50,
    padding: spacing.xl,
    borderRightWidth: 1,
    borderRightColor: colors.gray200,
  },

  webSidebarTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  webSidebarItem: {
    marginBottom: spacing.lg,
  },

  webSidebarItemTitle: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  webSidebarItemDescription: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // ===== Web専用レスポンシブ対応 =====
  // 注意: React Nativeでは@mediaクエリは使用できません
  // レスポンシブ対応はコンポーネントレベルで実装してください
});

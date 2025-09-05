import { borderRadius, colors, spacing, typography } from '@styles/globalStyles';
import { StyleSheet } from 'react-native';

/**
 * プロフィール編集画面の共通スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - モバイルとWebで共通する編集画面のスタイル定義
 * - 入力フィールド、ボタン、セクションの基本スタイル
 * - プラットフォーム固有でないUI要素の統一
 * - 編集画面特有のインタラクション要素の定義
 * - デザインシステムの一貫性の維持
 * 
 * 設計思想：
 * - 編集操作に最適化されたUI要素の提供
 * - プラットフォーム間で一貫した編集体験を実現
 * - アクセシビリティを考慮したスタイル設計
 * - 再利用可能なコンポーネントスタイルの定義
 * 
 * 含まれるスタイルカテゴリ：
 * - セクション: 編集セクションの基本レイアウト
 * - 入力フィールド: テキスト入力、セレクターのスタイル
 * - ボタン: 保存、キャンセル、追加ボタンのスタイル
 * - タグ: 興味・趣味タグの編集・表示スタイル
 * - 詳細情報: プロフィール詳細の編集スタイル
 * - 画像: プロフィール画像の編集・表示スタイル
 * - 空状態: データがない場合の表示スタイル
 * - ヘッダー・フッター: 画面のヘッダー・フッタースタイル
 * 
 * 使用例：
 * ```typescript
 * import { ProfileEditCommon } from '@styles/profile/common';
 * // 共通スタイルを継承してプラットフォーム固有スタイルを作成
 * ```
 */
export const ProfileEditCommon = StyleSheet.create({
  // ===== 共通セクションスタイル =====
  section: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: spacing.sm,
  },

  // ===== 共通入力フィールドスタイル =====
  inputContainer: {
    marginBottom: spacing.lg,
  },

  inputLabel: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    fontSize: typography.base,
    color: colors.textPrimary,
    minHeight: 44,
  },

  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  inputError: {
    borderColor: colors.error,
  },

  inputHelperText: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  inputErrorText: {
    fontSize: typography.sm,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // ===== 共通ボタンスタイル =====
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.white,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },

  buttonSecondary: {
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray300,
  },

  buttonSecondaryText: {
    color: colors.textPrimary,
  },

  buttonDanger: {
    backgroundColor: colors.error,
  },

  buttonDisabled: {
    backgroundColor: colors.gray300,
    opacity: 0.6,
  },

  // ===== 共通タグスタイル =====
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  tagInput: {
    flex: 1,
    marginRight: spacing.sm,
  },

  tagAddButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minWidth: 80,
  },

  tagAddButtonText: {
    color: colors.white,
    fontWeight: typography.semibold,
    textAlign: 'center',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  tagItem: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  tagText: {
    color: colors.white,
    fontSize: typography.sm,
    fontWeight: typography.medium,
    marginRight: spacing.xs,
  },

  tagRemoveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.full,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagRemoveButtonText: {
    color: colors.white,
    fontSize: typography.sm,
    fontWeight: typography.bold,
  },

  // ===== 共通詳細情報スタイル =====
  detailSection: {
    marginBottom: spacing.xl,
  },

  detailSectionTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.base,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
    paddingVertical: spacing.xs,
  },

  detailLabel: {
    fontSize: typography.base,
    fontWeight: typography.medium,
    color: colors.textPrimary,
    width: 100,
    marginRight: spacing.base,
  },

  detailValue: {
    flex: 1,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: typography.base,
    color: colors.textPrimary,
    minHeight: 36,
  },

  // ===== 共通画像スタイル =====
  imageSection: {
    marginBottom: spacing.xl,
  },

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.base,
  },

  imageContainer: {
    width: 120,
    height: 180, // 2:3の比率（120 * 1.5 = 180）
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imageRemoveButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageRemoveButtonText: {
    color: colors.white,
    fontSize: typography.lg,
    fontWeight: typography.bold,
  },

  imageAddButton: {
    backgroundColor: colors.gray100,
    borderWidth: 2,
    borderColor: colors.gray300,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageAddButtonText: {
    fontSize: typography['2xl'],
    color: colors.textSecondary,
    fontWeight: typography.bold,
  },

  imageAddButtonSubtext: {
    fontSize: typography.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },

  // ===== 共通空状態スタイル =====
  emptyState: {
    backgroundColor: colors.gray50,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  emptyStateText: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ===== 共通ヘッダースタイル =====
  header: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: spacing.lg,
  },

  modalHeader: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },

  headerTitle: {
    fontSize: typography['2xl'],
    fontWeight: typography.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: typography.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },

  // ===== 共通フッタースタイル =====
  footer: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    marginTop: spacing.xl,
  },

  footerButtons: {
    flexDirection: 'row',
    gap: spacing.base,
  },

  footerButton: {
    flex: 1,
  },
});

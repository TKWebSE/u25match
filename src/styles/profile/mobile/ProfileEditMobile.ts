import { colors, spacing } from '@styles/globalStyles';
import { StyleSheet } from 'react-native';
import { ProfileEditCommon } from '../common/ProfileEditCommon';

/**
 * プロフィール編集画面のモバイル専用スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - モバイルデバイスに最適化された編集画面のレイアウト
 * - タッチ操作に適したサイズと間隔の設定
 * - モバイル特有のUI要素のスタイル定義
 * - 固定フッター（保存・キャンセルボタン）の実装
 * - スクロール最適化とキーボード対応
 * 
 * 設計思想：
 * - 縦スクロールを前提とした編集インターフェース
 * - タッチ操作に適した十分なタップ領域の確保
 * - 固定フッターによるアクション要素の常時表示
 * - キーボード表示時の適切なスクロール調整
 * - モバイル向けの視覚的フィードバック
 * 
 * 特徴：
 * - 縦並びレイアウト: 編集セクションを縦に配置
 * - 固定フッター: 保存・キャンセルボタンを画面下部に固定
 * - スクロール最適化: フッター分の余白を確保
 * - タッチ最適化: ボタンサイズと間隔をタッチ操作に最適化
 * - 入力フィールド: モバイル向けの適切なサイズ設定
 * 
 * 含まれるスタイルカテゴリ：
 * - コンテナ: 画面全体のレイアウト
 * - 固定フッター: 保存・キャンセルボタンの固定配置
 * - 入力フィールド: モバイル最適化された入力要素
 * - 画像編集: モバイル向けの画像編集スタイル
 * - タグ編集: モバイル向けのタグ編集スタイル
 * - 詳細情報: モバイル向けの詳細情報編集スタイル
 * 
 * 使用例：
 * ```typescript
 * import { ProfileEditMobile } from '@styles/profile/mobile';
 * // または
 * import { getProfileEditStyles } from '@styles/profile/platformStyles';
 * const styles = getProfileEditStyles(); // モバイルでは ProfileEditMobile を返す
 * ```
 */
export const ProfileEditMobile = StyleSheet.create({
  // 共通スタイルを継承
  ...ProfileEditCommon,

  // ===== モバイル専用コンテナ =====
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.lg,
  },

  // ===== モバイル専用固定フッター =====
  fixedFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    // 影を追加して浮いているように見せる
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },

  // スクロールコンテンツ用スタイル
  scrollContent: {
    paddingBottom: 100, // 固定フッターの高さ分の余白を追加
  },

  // ===== モバイル専用ボタンスタイル =====
  // モバイルではホバー効果は使用しない

  // ===== モバイル専用入力フィールド =====
  input: {
    ...ProfileEditCommon.input,
    minHeight: 48, // モバイル用に少し高く
  },

  inputMultiline: {
    ...ProfileEditCommon.inputMultiline,
    minHeight: 120, // モバイル用に少し高く
  },

  // ===== モバイル専用画像スタイル =====
  imageContainer: {
    ...ProfileEditCommon.imageContainer,
    width: 100, // モバイル用に少し小さく
    height: 150, // モバイル用に少し小さく
  },

  // ===== モバイル専用タグスタイル =====
  tagItem: {
    ...ProfileEditCommon.tagItem,
    paddingHorizontal: spacing.sm, // モバイル用に少し小さく
    paddingVertical: spacing.xs,
  },

  // ===== モバイル専用詳細情報 =====
  detailLabel: {
    ...ProfileEditCommon.detailLabel,
    width: 80, // モバイル用に少し小さく
  },

  detailValue: {
    ...ProfileEditCommon.detailValue,
    minHeight: 40, // モバイル用に少し高く
  },
});

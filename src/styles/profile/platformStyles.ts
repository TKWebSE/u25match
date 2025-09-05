import { Platform } from 'react-native';
import { ProfileDetailMobile, ProfileEditMobile } from './mobile';
import { ProfileDetailWeb, ProfileEditWeb } from './web';

/**
 * プラットフォーム固有スタイル選択ユーティリティ
 * 
 * このファイルは以下の責務を持ちます：
 * - 実行時プラットフォームの検出
 * - プラットフォームに応じた適切なスタイルの選択
 * - コンポーネントからの統一されたスタイルアクセス
 * - プラットフォーム固有の最適化されたUI提供
 * 
 * 使用例：
 * ```typescript
 * const ProfileDetailStyles = getProfileDetailStyles();
 * const ProfileEditStyles = getProfileEditStyles();
 * ```
 */

/**
 * プロフィール詳細画面のスタイルを取得
 * 
 * 実行時にプラットフォームを検出し、適切なスタイルセットを返します。
 * - Web: デスクトップ最適化されたレイアウト、ホバー効果、レスポンシブデザイン
 * - Mobile: タッチ操作最適化、モバイル特有のUI要素、固定フッター対応
 * 
 * @returns プラットフォーム固有のProfileDetailStyles
 * @example
 * ```typescript
 * const styles = getProfileDetailStyles();
 * <View style={styles.container}>
 * ```
 */
export const getProfileDetailStyles = () => {
  return Platform.OS === 'web' ? ProfileDetailWeb : ProfileDetailMobile;
};

/**
 * プロフィール編集画面のスタイルを取得
 * 
 * 実行時にプラットフォームを検出し、適切なスタイルセットを返します。
 * - Web: サイドバー付きレイアウト、詳細な編集オプション、マウス操作最適化
 * - Mobile: 縦並びレイアウト、固定フッター、タッチ操作最適化
 * 
 * @returns プラットフォーム固有のProfileEditStyles
 * @example
 * ```typescript
 * const styles = getProfileEditStyles();
 * <ScrollView style={styles.content}>
 * ```
 */
export const getProfileEditStyles = () => {
  return Platform.OS === 'web' ? ProfileEditWeb : ProfileEditMobile;
};

/**
 * 現在のプラットフォームを取得
 * 
 * 実行中のプラットフォームを文字列で返します。
 * デバッグや条件分岐で使用できます。
 * 
 * @returns 'web' | 'mobile' - 現在のプラットフォーム
 * @example
 * ```typescript
 * const platform = getCurrentPlatform();
 * if (platform === 'web') {
 *   // Web固有の処理
 * }
 * ```
 */
export const getCurrentPlatform = () => {
  return Platform.OS === 'web' ? 'web' : 'mobile';
};

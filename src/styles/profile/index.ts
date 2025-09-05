/**
 * プロフィール関連スタイルのメインエクスポート
 * 
 * このファイルは以下の責務を持ちます：
 * - プラットフォーム固有スタイルの統一エクスポート
 * - 共通スタイルの提供
 * - 後方互換性の維持
 * - スタイルの一元管理
 * 
 * アーキテクチャ：
 * - モバイル: ProfileDetailMobile, ProfileEditMobile
 * - Web: ProfileDetailWeb, ProfileEditWeb  
 * - 共通: ProfileDetailCommon, ProfileEditCommon
 * - ユーティリティ: platformStyles.ts
 * 
 * 推奨使用方法：
 * ```typescript
 * // プラットフォーム固有スタイルの使用（推奨）
 * import { getProfileDetailStyles } from '@styles/profile/platformStyles';
 * const styles = getProfileDetailStyles();
 * 
 * // 直接インポート（特定のプラットフォーム用）
 * import { ProfileDetailMobile } from '@styles/profile/mobile';
 * ```
 */

// ===== プラットフォーム固有スタイル =====
// モバイル・Web・共通のスタイルをすべてエクスポート
export * from './common';
export * from './mobile';
export * from './web';

// ===== プラットフォーム選択ユーティリティ =====
// 実行時にプラットフォームを検出して適切なスタイルを選択
export * from './platformStyles';

// ===== 後方互換性維持 =====
// 既存のコードとの互換性を保つため、従来のスタイルもエクスポート
// 注意: 新しいコードでは platformStyles.ts の使用を推奨
export { ProfileDetailStyles } from './ProfileDetailStyles';
export { ProfileEditStyles } from './ProfileEditStyles';


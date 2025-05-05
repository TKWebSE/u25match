// src/constants/emojis.ts
// アプリ全体で使用する絵文字の定数定義

/**
 * ポイント関連の絵文字
 */
export const POINT_EMOJI = '💎';

/**
 * プレミアム会員関連の絵文字
 */
export const PREMIUM_EMOJI = '⭐';

/**
 * いいね関連の絵文字
 */
export const LIKE_EMOJI = '❤️';

/**
 * ブースト関連の絵文字
 */
export const BOOST_EMOJI = '🚀';

/**
 * その他のよく使用する絵文字
 */
export const EMOJIS = {
  // ポイント関連
  POINT: '💎',

  // 会員関連
  PREMIUM: '⭐',

  // 機能関連
  LIKE: '❤️',
  BOOST: '🚀',
  CHAT: '💬',
  MATCH: '💕',

  // 状態関連
  SUCCESS: '✅',
  ERROR: '❌',
  WARNING: '⚠️',
  INFO: 'ℹ️',

  // アクション関連
  ADD: '➕',
  REMOVE: '➖',
  EDIT: '✏️',
  DELETE: '🗑️',
} as const;

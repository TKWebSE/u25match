import { StyleSheet } from 'react-native';

/**
 * アプリ全体で使用するグローバルスタイル定義
 * カラー、タイポグラフィ、スペーシング、ボーダーラジウス、シャドウの設定
 */

// カラーパレット
export const colors = {
  // プライマリカラー
  primary: '#6C63FF',
  primaryLight: '#8B7FFF',
  primaryDark: '#5A52E0',

  // セカンダリカラー
  secondary: '#FF69B4',
  secondaryLight: '#FF8AC5',
  secondaryDark: '#E0559B',

  // 成功・警告・エラー
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',

  // グレースケール
  white: '#FFFFFF',
  gray50: '#F8F9FA',
  gray100: '#F1F3F4',
  gray200: '#E8EAED',
  gray300: '#DADCE0',
  gray400: '#BDC1C6',
  gray500: '#9AA0A6',
  gray600: '#80868B',
  gray700: '#5F6368',
  gray800: '#3C4043',
  gray900: '#202124',
  black: '#000000',

  // テキストカラー
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  textTertiary: '#999999',

  // 背景色
  background: '#F8F9FA',
  surface: '#FFFFFF',

  // オンライン状態
  online: '#4CAF50',
  offline: '#9AA0A6',
  recentlyActive: '#FF9800',
};

// タイポグラフィ設定
export const typography = {
  // フォントサイズ
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 30,
  '5xl': 36,

  // フォントウェイト
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

// スペーシング設定
export const spacing = {
  xs: 4,
  sm: 8,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

// ボーダーラジウス設定
export const borderRadius = {
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

// シャドウ設定
export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// 共通スタイル
export const globalStyles = StyleSheet.create({
  // レイアウト
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // カード
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...shadows.base,
    overflow: 'hidden',
  },

  // ボタン
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
    borderRadius: borderRadius.base,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryText: {
    color: colors.textPrimary,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },

  // 入力フィールド
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    fontSize: typography.base,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.gray200,
  },

  // テキスト
  textPrimary: {
    color: colors.textPrimary,
    fontSize: typography.base,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: typography.base,
  },
  textTertiary: {
    color: colors.textTertiary,
    fontSize: typography.sm,
  },
  textTitle: {
    color: colors.textPrimary,
    fontSize: typography['3xl'],
    fontWeight: typography.bold,
  },
  textSubtitle: {
    color: colors.textPrimary,
    fontSize: typography.xl,
    fontWeight: typography.semibold,
  },

  // バッジ
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.white,
    fontSize: typography.xs,
    fontWeight: typography.bold,
  },

  // セパレーター
  separator: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: spacing.base,
  },

  // センター配置
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // フレックス
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}); 

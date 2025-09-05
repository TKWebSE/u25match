import { StyleSheet } from 'react-native';
import { ProfileDetailCommon } from '../common/ProfileDetailCommon';

/**
 * プロフィール詳細画面のWeb専用スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - Webブラウザに最適化されたレイアウト設計
 * - マウス操作に適したサイズと間隔の設定
 * - レスポンシブデザインの実装
 * - Web特有のUI要素のスタイル定義
 * - デスクトップ・タブレット・モバイル対応
 * 
 * 設計思想：
 * - デスクトップファーストのレスポンシブデザイン
 * - マウス操作に最適化されたホバー効果
 * - 中央寄せレイアウトによるコンテンツの最適表示
 * - Web特有の視覚効果とトランジション
 * - アクセシビリティを考慮したUI設計
 * 
 * 特徴：
 * - 中央寄せレイアウト: 最大幅を制限して中央配置
 * - ホバー効果: マウスオーバー時の視覚的フィードバック
 * - レスポンシブ対応: 画面サイズに応じた適応的レイアウト
 * - Web特有のシャドウ: boxShadowを使用した立体感
 * - カーソル制御: ポインターとユーザー選択の適切な制御
 * 
 * 含まれるスタイルカテゴリ：
 * - コンテナ: 画面全体のレイアウトと中央寄せ
 * - 画像スライダー: Web最適化された画像表示
 * - プロフィール情報: デスクトップ向けの情報表示
 * - 自己紹介: Web向けの自己紹介表示
 * - 詳細プロフィール: デスクトップ向けの詳細情報表示
 * - タグ表示: Web向けのタグ表示レイアウト
 * - アクションボタン: Web向けのボタンスタイル
 * - レスポンシブ: メディアクエリによる画面サイズ対応
 * 
 * 使用例：
 * ```typescript
 * import { ProfileDetailWeb } from '@styles/profile/web';
 * // または
 * import { getProfileDetailStyles } from '@styles/profile/platformStyles';
 * const styles = getProfileDetailStyles(); // Webでは ProfileDetailWeb を返す
 * ```
 */
export const ProfileDetailWeb = StyleSheet.create({
  // 共通スタイルを継承
  ...ProfileDetailCommon,

  // ===== Web専用コンテナ =====
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    maxWidth: 1200, // 最大幅を制限
    marginHorizontal: 'auto', // 中央寄せ
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 24, // Web用の余白
  },

  // ===== Web専用画像スライダー =====
  imageContainer: {
    width: '100%',
    maxWidth: 600, // 画像の最大幅を制限
    height: 400, // Web用の固定高さ
    overflow: 'hidden',
    marginHorizontal: 'auto', // 中央寄せ
    marginTop: 24,
    borderRadius: 16,
    // Web用のシャドウ効果
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },

  // ===== Web専用プロフィール情報 =====
  header: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 'auto',
    marginTop: 24,
    borderRadius: 16,
    maxWidth: 600,
    // Web用のシャドウ効果
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  verificationMark: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    backgroundColor: 'white',
    borderRadius: 16,
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
    borderWidth: 2,
  },

  verifiedMark: {
    color: '#38A169',
    borderColor: '#38A169',
  },

  unverifiedMark: {
    color: '#9CA3AF',
    borderColor: '#9CA3AF',
  },

  // ===== Web専用自己紹介 =====
  bioContainer: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 'auto',
    borderRadius: 16,
    padding: 32,
    maxWidth: 600,
    // Web用のシャドウ効果
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  // ===== Web専用詳細プロフィール =====
  detailsSection: {
    paddingHorizontal: 24,
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 'auto',
    borderRadius: 16,
    paddingTop: 32,
    maxWidth: 600,
    marginBottom: 16, // Webでは固定フッターがないので余白を調整（短めに調整）
    // Web用のシャドウ効果
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  // ===== Web専用タグ表示 =====
  tagsSection: {
    marginBottom: 16, // 短めに調整
    marginHorizontal: 'auto',
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 32,
    maxWidth: 600,
    // Web用のシャドウ効果
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  tagItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    // Web用のシャドウ効果
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    minWidth: 200, // Web用の最小幅
    maxWidth: 300, // Web用の最大幅
  },

  // ===== Web専用アクションボタン =====
  likeButtonContainer: {
    position: 'sticky', // Web用の固定位置
    bottom: 24,
    left: '50%',
    transform: [{ translateX: -100 }], // 中央寄せ
    alignItems: 'center',
    width: 200,
  },

  editButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    // Web用のシャドウ効果（React Nativeでは無効）
    borderWidth: 0,
    // ホバー効果用（React Nativeでは無効）
  },

  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ===== Web専用レスポンシブ対応 =====
  // 注意: React Nativeでは@mediaクエリは使用できません
  // レスポンシブ対応はコンポーネントレベルで実装してください
});

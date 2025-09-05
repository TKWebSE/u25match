import { getPlatformValue } from '@utils/platform';
import { Dimensions, StyleSheet } from 'react-native';
import { ProfileDetailCommon } from '../common/ProfileDetailCommon';

const { width } = Dimensions.get('window');

/**
 * プロフィール詳細画面のモバイル専用スタイル定義
 * 
 * このファイルは以下の責務を持ちます：
 * - モバイルデバイスに最適化されたレイアウト設計
 * - タッチ操作に適したサイズと間隔の設定
 * - モバイル特有のUI要素のスタイル定義
 * - スクロール最適化と固定要素の配置
 * - モバイル向けの視覚効果とアニメーション
 * 
 * 設計思想：
 * - 縦スクロールを前提とした縦並びレイアウト
 * - タッチ操作に適した十分なタップ領域の確保
 * - モバイル画面サイズに最適化されたコンテンツ配置
 * - ガラスモーフィズム効果によるモダンなデザイン
 * - 固定フッターによるアクション要素の常時表示
 * 
 * 特徴：
 * - 画像スライダー: フルスクリーンに近い表示
 * - プロフィール情報: ガラスモーフィズム効果
 * - 自己紹介・詳細・タグ: 縦並びのセクション配置
 * - アクションボタン: 画面下部に固定配置
 * - シャドウ効果: モバイル向けの適度な立体感
 * 
 * 含まれるスタイルカテゴリ：
 * - 画像スライダー: プロフィール画像のカルーセル表示
 * - プロフィール情報: 名前、年齢、場所、オンライン状態
 * - 自己紹介: ユーザーの自己紹介テキスト
 * - 詳細プロフィール: 身長、体重、職業などの詳細情報
 * - タグ表示: 興味・趣味タグの表示
 * - アクションボタン: いいね・編集ボタン
 * 
 * 使用例：
 * ```typescript
 * import { ProfileDetailMobile } from '@styles/profile/mobile';
 * // または
 * import { getProfileDetailStyles } from '@styles/profile/platformStyles';
 * const styles = getProfileDetailStyles(); // モバイルでは ProfileDetailMobile を返す
 * ```
 */
export const ProfileDetailMobile = StyleSheet.create({
  // 共通スタイルを継承
  ...ProfileDetailCommon,

  // ===== モバイル専用画像スライダー =====
  imageContainer: {
    width: '100%',
    height: getPlatformValue(600, width), // 高さを少し調整
    overflow: 'hidden',
    marginHorizontal: 8,
    marginTop: 12,
    borderRadius: 20, // より丸みを帯びた角
    // より強いシャドウ効果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },

  profileImage: {
    width: width - 16,
    height: getPlatformValue(600, width),
    resizeMode: 'cover', // containからcoverに変更してより良い表示
    borderRadius: 20,
  },

  // ===== モバイル専用プロフィール情報 =====
  header: {
    padding: 24,
    alignItems: 'center',
    // より透明なガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    // ガラス効果のためのボーダー
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  verificationMark: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderWidth: 2,
  },

  verifiedMark: {
    color: '#38A169', // 緑色のチェックマーク
    borderColor: '#38A169', // 緑色の枠線
  },

  unverifiedMark: {
    color: '#9CA3AF', // グレーのチェックマーク
    borderColor: '#9CA3AF', // グレーの枠線
  },

  // ===== モバイル専用自己紹介 =====
  bioContainer: {
    marginTop: 16,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 24, // 16から24に変更して左右の隙間を増やす
    borderRadius: 16,
    padding: 20,
  },

  // ===== モバイル専用詳細プロフィール =====
  detailsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 24, // 16から24に変更して左右の隙間を増やす
    borderRadius: 16,
    paddingTop: 20,
    marginBottom: 60, // いいねボタンが入るくらいの隙間を追加（短めに調整）
  },

  // ===== モバイル専用タグ表示 =====
  tagsSection: {
    marginBottom: 8, // 短めに調整
    marginHorizontal: 24, // 自己紹介や詳細プロフィールと同じ幅に調整
    marginTop: 16, // 自己紹介と同じ間隔に調整
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20, // 自己紹介と同じパディング
  },

  tagsContainer: {
    flexDirection: 'column',
    gap: 12,
  },

  tagItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    width: '100%', // タグ項目を全幅に
    alignSelf: 'stretch', // 親コンテナの幅に合わせる
  },

  // ===== モバイル専用アクションボタン =====
  likeButtonContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
});

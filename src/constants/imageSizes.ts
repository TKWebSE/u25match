import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * 画像サイズの設定インターフェース
 */
export interface ImageSizeConfig {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * プロフィール画像のサイズ設定
 * レコメンド画面のユーザーカードと同じ4:5の比率を使用
 * TODO　いずれエクスプローラー画面とかも適用したい
 */
export const PROFILE_IMAGE_SIZES: ImageSizeConfig = {
  width: Math.min(width * 0.95, 700), // 画面幅の95%または最大700px
  height: Math.min(width * 0.95, 700) * (5 / 4), // 4:5比率に基づく高さ
  aspectRatio: 4 / 5, // レコメンド画面と同じ比率
};

/**
 * レスポンシブな画像サイズを取得する関数
 * 画面サイズが変更された場合に再計算
 */
export const getProfileImageSizes = (): ImageSizeConfig => {
  const { width: currentWidth } = Dimensions.get('window');
  return {
    width: Math.min(currentWidth * 0.95, 700),
    height: Math.min(currentWidth * 0.95, 700) * (5 / 4),
    aspectRatio: 4 / 5,
  };
};

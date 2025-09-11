import { useMemo } from 'react';
import { Platform } from 'react-native';

// プラットフォーム別のレイアウト設定
const LAYOUT_CONFIG = {
  // モバイル用の設定（一画面に4枚表示）
  mobile: {
    CARD_GAP: 12, // カード間のギャップ（px）
    CARD_ASPECT_RATIO: 1.3, // カードの縦横比（高さ/幅）
    MIN_CARD_WIDTH: 160, // カードの最小幅（px）- モバイル用に小さく
    MAX_CARD_WIDTH: 200, // カードの最大幅（px）- モバイル用に小さく
  },
  // Web用の設定（従来通り）
  web: {
    CARD_GAP: 16, // カード間のギャップ（px）
    CARD_ASPECT_RATIO: 1.4, // カードの縦横比（高さ/幅）
    MIN_CARD_WIDTH: 280, // カードの最小幅（px）
    MAX_CARD_WIDTH: 400, // カードの最大幅（px）
  },
} as const;

/**
 * CSS Gridベースのカードレイアウトを計算するフック
 * プラットフォーム別に最適化されたレイアウトを提供
 * @param containerWidth カードリストエリアの幅
 * @returns グリッドレイアウト用の設定
 */
export const useCardLayout = (containerWidth: number) => {
  return useMemo(() => {
    // プラットフォームを判定
    const isMobile = Platform.OS !== 'web';
    const config = isMobile ? LAYOUT_CONFIG.mobile : LAYOUT_CONFIG.web;

    // グリッドの列数を自動計算
    // モバイルでは2列固定、Webでは動的計算
    const columnCount = isMobile ? 2 : Math.max(1, Math.floor(containerWidth / config.MIN_CARD_WIDTH));

    // カードの幅を計算
    const cardWidth = Math.min(
      config.MAX_CARD_WIDTH,
      Math.max(
        config.MIN_CARD_WIDTH,
        (containerWidth - (config.CARD_GAP * (columnCount - 1))) / columnCount
      )
    );

    // カードの高さを計算（アスペクト比を維持）
    const cardHeight = cardWidth * config.CARD_ASPECT_RATIO;

    // デバッグ用のログ（開発時のみ）
    if (__DEV__) {
      console.log('🎯 カードレイアウト計算結果:', {
        platform: isMobile ? 'mobile' : 'web',
        containerWidth: `${containerWidth}px`,
        cardWidth: `${cardWidth}px`,
        cardHeight: `${cardHeight}px`,
        columnCount,
        cardGap: `${config.CARD_GAP}px`,
        gridTemplateColumns: `repeat(${columnCount}, minmax(${config.MIN_CARD_WIDTH}px, 1fr))`,
      });
    }

    return {
      cardWidth,
      cardHeight,
      imageHeight: cardHeight,
      cardGap: config.CARD_GAP,
      columnCount,
      // グリッドレイアウト用の設定
      gridTemplateColumns: `repeat(${columnCount}, minmax(${config.MIN_CARD_WIDTH}px, 1fr))`,
      gridGap: `${config.CARD_GAP}px`,
      // 従来の互換性のため
      sideMargin: 0,
      containerWidth,
      mainContentAvailableWidth: containerWidth,
      drawerWidth: 0,
    };
  }, [containerWidth]);
};

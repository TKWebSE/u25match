import { useMemo } from 'react';

// シンプルなレイアウト設定
const LAYOUT_CONFIG = {
  CARD_GAP: 16, // カード間のギャップ（px）
  CARD_ASPECT_RATIO: 1.4, // カードの縦横比（高さ/幅）
  MIN_CARD_WIDTH: 280, // カードの最小幅（px）
  MAX_CARD_WIDTH: 400, // カードの最大幅（px）
} as const;

/**
 * CSS Gridベースのカードレイアウトを計算するフック
 * 複雑な画面サイズ計算を削除し、グリッドレイアウトに最適化
 * @param containerWidth カードリストエリアの幅
 * @returns グリッドレイアウト用の設定
 */
export const useCardLayout = (containerWidth: number) => {
  return useMemo(() => {
    // グリッドの列数を自動計算
    // minmax(280px, 1fr)で最小280px、最大は利用可能な幅を均等分割
    const columnCount = Math.max(1, Math.floor(containerWidth / LAYOUT_CONFIG.MIN_CARD_WIDTH));

    // カードの幅を計算（グリッドが自動調整）
    const cardWidth = Math.min(
      LAYOUT_CONFIG.MAX_CARD_WIDTH,
      Math.max(
        LAYOUT_CONFIG.MIN_CARD_WIDTH,
        (containerWidth - (LAYOUT_CONFIG.CARD_GAP * (columnCount - 1))) / columnCount
      )
    );

    // カードの高さを計算（アスペクト比を維持）
    const cardHeight = cardWidth * LAYOUT_CONFIG.CARD_ASPECT_RATIO;

    // デバッグ用のログ（開発時のみ）
    if (__DEV__) {
      console.log('🎯 グリッドレイアウト計算結果:', {
        containerWidth: `${containerWidth}px`,
        cardWidth: `${cardWidth}px`,
        cardHeight: `${cardHeight}px`,
        columnCount,
        cardGap: `${LAYOUT_CONFIG.CARD_GAP}px`,
        gridTemplateColumns: `repeat(${columnCount}, minmax(${LAYOUT_CONFIG.MIN_CARD_WIDTH}px, 1fr))`,
      });
    }

    return {
      cardWidth,
      cardHeight,
      imageHeight: cardHeight,
      cardGap: LAYOUT_CONFIG.CARD_GAP,
      columnCount,
      // グリッドレイアウト用の設定
      gridTemplateColumns: `repeat(${columnCount}, minmax(${LAYOUT_CONFIG.MIN_CARD_WIDTH}px, 1fr))`,
      gridGap: `${LAYOUT_CONFIG.CARD_GAP}px`,
      // 従来の互換性のため
      sideMargin: 0,
      containerWidth,
      mainContentAvailableWidth: containerWidth,
      drawerWidth: 0,
    };
  }, [containerWidth]);
};

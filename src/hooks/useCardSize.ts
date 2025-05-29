import { CardSize, LayoutType } from '@components/common/mobile/UnifiedUserCard';
import { spacing } from '@styles/globalStyles';
import { Dimensions } from 'react-native';

/**
 * カードサイズを計算するカスタムフック
 * レイアウトタイプに応じて適切なサイズを返す
 */
export const useCardSize = (layout: LayoutType): CardSize => {
  const screenWidth = Dimensions.get('window').width;

  if (layout === 'grid') {
    // 2列グリッドレイアウト用（スワイパーと同じ比率 2:3）
    const containerPadding = spacing.lg * 2; // 左右のパディング
    const cardGap = spacing.sm; // カード間のギャップ
    const availableWidth = screenWidth - containerPadding;
    const cardWidth = (availableWidth - cardGap) / 2;
    const cardHeight = cardWidth * 1.5; // スワイパーと同じ比率（2:3）

    return {
      width: cardWidth,
      height: cardHeight,
    };
  }

  // スワイパーレイアウト用（検索タブと同じサイズ計算）
  const containerPadding = spacing.lg * 2; // 左右のパディング
  const cardGap = spacing.sm; // カード間のギャップ
  const availableWidth = screenWidth - containerPadding;
  const cardWidth = (availableWidth - cardGap) / 2;
  const cardHeight = cardWidth * 1.5; // 同じ比率（2:3）

  return {
    width: cardWidth,
    height: cardHeight,
  };
};

/**
 * 複数のカードサイズを一度に取得するフック
 */
export const useMultipleCardSizes = (layouts: LayoutType[]): Record<LayoutType, CardSize> => {
  const sizes: Record<LayoutType, CardSize> = {} as Record<LayoutType, CardSize>;

  layouts.forEach(layout => {
    sizes[layout] = useCardSize(layout);
  });

  return sizes;
};

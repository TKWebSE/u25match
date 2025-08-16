import SwipeableCard, { SwipeableCardRef } from '@components/recommendations/SwipeableCard';
import { RecommendationUser } from '@mock/recommendationsMock';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

interface RecommendationsCardStackProps {
  visibleUsers: RecommendationUser[];
  startIndex: number;
  currentIndex: number;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  onAnimationComplete?: (direction: 'left' | 'right') => void;
}

/**
 * 推奨ユーザーのカードスタックを表示するコンポーネント
 * 複数のカードを重ねて表示し、現在のカードのみ操作可能にする
 */
export const RecommendationsCardStack: React.FC<RecommendationsCardStackProps> = ({
  visibleUsers,
  startIndex,
  currentIndex,
  onLike,
  onPass,
  onAnimationComplete,
}) => {
  // 現在アクティブなカードへの参照
  const cardRef = useRef<SwipeableCardRef>(null);

  // 表示するカードの数
  const visibleCards = 3;

  return (
    <View style={styles.cardContainer}>
      {visibleUsers.map((user, index) => {
        // currentIndexに基づいて現在のカードかどうかを判定
        const isCurrentCard = (startIndex + index) === currentIndex;

        // カードの位置を動的に計算（currentIndexに基づいて）
        const relativeIndex = (startIndex + index) - currentIndex;
        const cardTop = relativeIndex * 4;  // 現在のカードを基準とした相対位置
        const cardLeft = relativeIndex * 2; // 現在のカードを基準とした相対位置

        // デバッグログ
        console.log(`Rendering card ${user.name}: index=${index}, startIndex=${startIndex}, cardIndex=${startIndex + index}, currentIndex=${currentIndex}, isCurrentCard=${isCurrentCard}, relativeIndex=${relativeIndex}, cardTop=${cardTop}, cardLeft=${cardLeft}`);

        return (
          <View
            key={user.id}
            style={[
              styles.cardWrapper,
              {
                zIndex: visibleCards - Math.abs(relativeIndex), // 現在のカードが最前面
                position: 'absolute',
                top: cardTop, // 動的に計算された位置
                left: cardLeft, // 動的に計算された位置
              }
            ]}
          >
            <SwipeableCard
              user={user}
              onLike={isCurrentCard ? onLike : () => { }} // 現在のカードのみ操作可能
              onPass={isCurrentCard ? onPass : () => { }} // 現在のカードのみ操作可能
              isActive={isCurrentCard} // 現在のカードのみ操作可能
              cardIndex={startIndex + index} // カードの実際のインデックス
              currentIndex={currentIndex} // 現在アクティブなカードのインデックス
              onAnimationComplete={isCurrentCard ? onAnimationComplete : undefined} // 現在のカードのみにコールバックを設定
              ref={isCurrentCard ? cardRef : null} // 現在のカードにのみrefを設定
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32, // カードを下に移動
    position: 'relative', // 子要素の絶対位置指定の基準点
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

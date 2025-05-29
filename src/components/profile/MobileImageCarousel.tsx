import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const { width } = Dimensions.get('window');

interface MobileImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

/**
 * モバイル用画像カルーセルコンポーネント
 * 
 * @param images - 画像URLの配列
 * @param currentIndex - 現在の画像インデックス
 * @param onIndexChange - 画像インデックスが変更された時のコールバック
 */
export const MobileImageCarousel: React.FC<MobileImageCarouselProps> = ({
  images,
  currentIndex,
  onIndexChange,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const imageSize = width - 8;

  // 外部からのインデックス変更に応じてスクロール位置を更新
  useEffect(() => {
    if (flatListRef.current && currentIndex >= 0 && currentIndex < images.length) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, images.length]);

  // 画像スライダーのスクロール処理
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / imageSize);

    // インデックスが有効な範囲内の場合のみ更新
    if (index >= 0 && index < images.length && index !== currentIndex) {
      onIndexChange(index);
    }
  };

  // スクロールエラー時のフォールバック
  const handleScrollToIndexFailed = (info: any) => {
    console.warn('ScrollToIndex failed:', info);
    // フォールバック: 指定した位置にスクロール
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: info.averageItemLength * info.index,
          animated: true,
        });
      }
    }, 100);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={imageSize}
      snapToAlignment="start"
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      windowSize={1}
      removeClippedSubviews={true}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      getItemLayout={(data, index) => ({
        length: imageSize,
        offset: imageSize * index,
        index,
      })}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={ProfileDetailStyles.profileImage}
          resizeMode="cover"
        />
      )}
    />
  );
}; 

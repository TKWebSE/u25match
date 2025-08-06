import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
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
  // 画像スライダーのスクロール処理
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageSize = width - 8;
    const index = Math.floor(contentOffsetX / imageSize);
    onIndexChange(index);
  };

  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      decelerationRate="fast"
      snapToInterval={width - 8}
      snapToAlignment="center"
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
      removeClippedSubviews={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={ProfileDetailStyles.profileImage} />
      )}
    />
  );
}; 

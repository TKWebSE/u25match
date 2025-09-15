import { PROFILE_IMAGE_SIZES } from '@constants/imageSizes';
import React, { useState } from 'react';
import { Image, PanResponder, Text, TouchableOpacity, View } from 'react-native';

interface WebImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

/**
 * Web版画像カルーセルコンポーネント
 * リアクション画面や検索画面のユーザーカードと同じアスペクト比（1:1.4）で表示
 * 
 * @param images - 画像URLの配列
 * @param currentIndex - 現在の画像インデックス
 * @param onIndexChange - 画像インデックスが変更された時のコールバック
 */
export const MobileImageCarousel: React.FC<WebImageCarouselProps> = ({
  images,
  currentIndex,
  onIndexChange,
}) => {
  const imageSizes = PROFILE_IMAGE_SIZES;
  const [startX, setStartX] = useState(0);

  // 前の画像に移動
  const goToPrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  // 次の画像に移動
  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  // 指定した画像に移動
  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      onIndexChange(index);
    }
  };

  // PanResponderでスワイプを検知
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: (evt) => {
      setStartX(evt.nativeEvent.pageX);
    },

    onPanResponderRelease: (evt) => {
      const endX = evt.nativeEvent.pageX;
      const diffX = endX - startX;
      const threshold = 50; // スワイプの閾値

      if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && currentIndex > 0) {
          // 右にスワイプ（前の画像）
          goToPrevious();
        } else if (diffX < 0 && currentIndex < images.length - 1) {
          // 左にスワイプ（次の画像）
          goToNext();
        }
      }
    },
  });

  return (
    <View style={{ position: 'relative' }}>
      {/* PanResponderでスワイプを検知 */}
      <View {...panResponder.panHandlers}>
        {/* 現在の画像を表示 */}
        <Image
          source={{ uri: images[currentIndex] }}
          style={{
            width: imageSizes.width,
            height: imageSizes.height,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
        />
      </View>

      {/* 左右のナビゲーションボタン */}
      {images.length > 1 && (
        <>
          {/* 前の画像ボタン */}
          {currentIndex > 0 && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: [{ translateY: -20 }],
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
              onPress={goToPrevious}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>‹</Text>
            </TouchableOpacity>
          )}

          {/* 次の画像ボタン */}
          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: [{ translateY: -20 }],
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 20,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
              onPress={goToNext}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>›</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* プログレスバー型インジケーター */}
      {images.length > 1 && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          zIndex: 1,
        }}>
          {/* 背景の線 */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 4,
          }} />

          {/* 各画像のセグメント */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            flexDirection: 'row',
            borderRadius: 4,
          }}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  height: 8,
                  backgroundColor: index <= currentIndex ? '#4CAF50' : 'transparent',
                  borderRadius: 4,
                  marginRight: index < images.length - 1 ? 2 : 0,
                }}
                onPress={() => goToImage(index)}
                activeOpacity={0.7}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

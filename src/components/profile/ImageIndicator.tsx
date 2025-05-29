import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ImageIndicatorProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}

export default function ImageIndicator({ images, currentIndex, onImageChange }: ImageIndicatorProps) {
  // 画像が1枚以下の場合は表示しない
  if (images.length <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 線状のプログレスバー */}
      <View style={styles.progressContainer}>
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPassed = index < currentIndex;

          return (
            <TouchableOpacity
              key={`indicator-${index}`}
              style={[
                styles.progressBar,
                isActive && styles.activeProgressBar,
                isPassed && styles.passedProgressBar,
                index === images.length - 1 && styles.lastProgressBar
              ]}
              onPress={() => onImageChange(index)}
              activeOpacity={0.7}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // シンプルな背景
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  progressBar: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
    marginRight: 3,
  },
  activeProgressBar: {
    backgroundColor: '#6C63FF',
    height: 4,
  },
  passedProgressBar: {
    backgroundColor: 'rgba(108, 99, 255, 0.7)',
  },
  lastProgressBar: {
    marginRight: 0,
  },
}); 

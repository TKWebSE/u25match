import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ImageIndicatorProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}

export default function ImageIndicator({ images, currentIndex, onImageChange }: ImageIndicatorProps) {
  // デバッグ情報
  console.log('ImageIndicator - images:', images);
  console.log('ImageIndicator - currentIndex:', currentIndex);
  console.log('ImageIndicator - images.length:', images.length);

  return (
    <View style={styles.container}>
      {/* デバッグ情報 */}
      {/* <Text style={styles.debugText}>
        画像数: {images.length}, 現在: {currentIndex + 1}
      </Text> */}

      {/* ドットインジケーター */}
      <View style={styles.indicatorContainer}>
        {images.map((image, index) => {
          console.log(`Rendering dot ${index} for image:`, image);
          return (
            <TouchableOpacity
              key={`indicator-${index}`}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
                index === images.length - 1 && styles.lastIndicator
              ]}
              onPress={() => {
                console.log(`Dot ${index} pressed`);
                onImageChange(index);
              }}
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
    marginTop: 20,
    paddingHorizontal: 20,
  },
  debugText: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // ガラスモーフィズム効果のコンテナ
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    // ガラス効果のためのボーダー
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  indicator: {
    width: 12,        // 10px → 12px に拡大
    height: 12,       // 10px → 12px に拡大
    borderRadius: 6,  // 5px → 6px に調整
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // より濃い色で視認性向上
    marginRight: 12,  // 10px → 12px に間隔拡大
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeIndicator: {
    backgroundColor: '#6C63FF', // ピンク → アプリのメインカラーに統一
    width: 16,                  // アクティブ時は少し大きく
    height: 16,
    borderRadius: 8,
    // アクティブ時のシャドウ強化
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // グラデーション効果のためのボーダー
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)', // メインカラーに合わせて調整
  },
  lastIndicator: {
    marginRight: 0,
  },
}); 

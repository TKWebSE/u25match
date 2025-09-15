import { isWeb } from '@utils/platform';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

interface WebImageNavigatorProps {
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}

export default function WebImageNavigator({ images, currentIndex, onImageChange }: WebImageNavigatorProps) {
  // Web版以外では何も表示しない
  if (!isWeb) return null;

  // アニメーション用のスケール値（初期値: 1.0）
  const leftScaleAnim = useRef(new Animated.Value(1)).current;
  const rightScaleAnim = useRef(new Animated.Value(1)).current;

  // ホバー状態の管理
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  // スワイプ用のアニメーション値
  const translateX = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // キーボードショートカットの追加
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    // Web版でのみキーボードイベントを追加
    if (isWeb) {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [currentIndex, images.length]);

  // アニメーション実行関数（150msでスムーズに変化）
  const animatePress = (animValue: Animated.Value, toValue: number) => {
    Animated.timing(animValue, {
      toValue,
      duration: 150,
      useNativeDriver: true, // パフォーマンス最適化
    }).start();
  };

  // マウスホバー開始時の処理
  const handleMouseEnter = (animValue: Animated.Value, setHovered: (value: boolean) => void) => {
    setHovered(true);
    animatePress(animValue, 1.1); // 10%拡大
  };

  // マウスホバー終了時の処理
  const handleMouseLeave = (animValue: Animated.Value, setHovered: (value: boolean) => void) => {
    setHovered(false);
    animatePress(animValue, 1); // 元のサイズに戻る
  };

  // 前の画像に移動（最後の画像の場合は最初に戻る）
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;

    // 滑らかなスライドアニメーション（右から左へ）
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => {
      onImageChange(newIndex);
      // アニメーションをリセット
      slideAnim.setValue(0);
      opacityAnim.setValue(1);
    });
  };

  // 次の画像に移動（最初の画像の場合は最後に移動）
  const goToNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;

    // 滑らかなスライドアニメーション（左から右へ）
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => {
      onImageChange(newIndex);
      // アニメーションをリセット
      slideAnim.setValue(0);
      opacityAnim.setValue(1);
    });
  };

  // スワイプ処理
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;

      // スワイプの閾値（100px）
      if (translationX > 100) {
        // 右にスワイプ → 前の画像
        goToPrevious();
      } else if (translationX < -100) {
        // 左にスワイプ → 次の画像
        goToNext();
      }

      // アニメーションをリセット
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      {/* メイン画像エリア */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                { translateX: translateX },
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [-400, 0, 400], // 画面幅分のスライド
                  })
                }
              ],
              opacity: opacityAnim
            }
          ]}
        >
          {/* 現在の画像を表示 */}
          <Image source={{ uri: images[currentIndex] }} style={styles.mainImage} />

          {/* 左矢印ボタン（前の画像へ） */}
          <Animated.View style={[styles.arrowLeft, { transform: [{ scale: leftScaleAnim }] }]}>
            <View
              style={[styles.arrowButton, isLeftHovered && styles.arrowHovered]}
              onStartShouldSetResponder={() => {
                goToPrevious();
                return true;
              }}
              // @ts-ignore - Web only
              onMouseEnter={() => handleMouseEnter(leftScaleAnim, setIsLeftHovered)}
              // @ts-ignore - Web only
              onMouseLeave={() => handleMouseLeave(leftScaleAnim, setIsLeftHovered)}
            >
              <Text style={isLeftHovered ? styles.arrowTextLeftHovered : styles.arrowTextLeft}>◀</Text>
            </View>
          </Animated.View>

          {/* 右矢印ボタン（次の画像へ） */}
          <Animated.View style={[styles.arrowRight, { transform: [{ scale: rightScaleAnim }] }]}>
            <View
              style={[styles.arrowButton, isRightHovered && styles.arrowHovered]}
              onStartShouldSetResponder={() => {
                goToNext();
                return true;
              }}
              // @ts-ignore - Web only
              onMouseEnter={() => handleMouseEnter(rightScaleAnim, setIsRightHovered)}
              // @ts-ignore - Web only
              onMouseLeave={() => handleMouseLeave(rightScaleAnim, setIsRightHovered)}
            >
              <Text style={isRightHovered ? styles.arrowTextRightHovered : styles.arrowTextRight}>▶</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  // メインコンテナ（左右に4pxのマージン）
  container: {
    width: '100%',
    marginHorizontal: 4,
  },
  // 画像コンテナ（相対位置で矢印ボタンを配置）
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 700,
    borderRadius: 16, // より丸みを帯びた角
    overflow: 'hidden',
    // モダンなシャドウ効果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  // メイン画像（コンテナ全体を埋める）
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  // 左矢印ボタンの位置とスタイル
  arrowLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // ガラス効果のためのボーダー
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  // 右矢印ボタンの位置とスタイル
  arrowRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    // ガラスモーフィズム効果
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // モダンなシャドウ
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    // ガラス効果のためのボーダー
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  // 矢印ボタン内のタッチ領域
  arrowButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ホバー時の背景色（より洗練された効果）
  arrowHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 24,
    // ホバー時のシャドウ強化
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  // 基本の矢印テキストスタイル
  arrowText: {
    color: '#000000', // 白から黒に変更
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 24,
    // テキストシャドウ
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // 左矢印テキスト（左に2pxずらし）
  arrowTextLeft: {
    color: '#000000', // 白から黒に変更
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 24,
    marginLeft: -2,
    // テキストシャドウ
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // 右矢印テキスト（右に2pxずらし）
  arrowTextRight: {
    color: '#000000', // 白から黒に変更
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 24,
    marginRight: -2,
    // テキストシャドウ
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // ホバー時の矢印テキスト（より明るい色）
  arrowTextLeftHovered: {
    color: '#000000', // 白から黒に変更
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 24,
    marginLeft: -2,
    // ホバー時のテキストシャドウ強化
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  // ホバー時の矢印テキスト（より明るい色）
  arrowTextRightHovered: {
    color: '#000000', // 白から黒に変更
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 24,
    marginRight: -2,
    // ホバー時のテキストシャドウ強化
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
}); 

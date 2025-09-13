// キーボードの表示・非表示を監視するカスタムフック
// - キーボードの高さを取得
// - フォーカス時の位置調整に使用
// - モバイル環境でのUI調整に活用

import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

/**
 * キーボードの状態を監視するカスタムフック
 * @returns キーボードの高さ情報
 */
export const useKeyboard = () => {
  // キーボードの高さを管理する状態
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    // キーボード表示時のリスナー
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        // キーボードの高さを取得して状態を更新
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    // キーボード非表示時のリスナー
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // キーボードが非表示になったら高さを0にリセット
        setKeyboardHeight(0);
      }
    );

    // クリーンアップ関数：リスナーを削除してメモリリークを防ぐ
    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return {
    keyboardHeight, // 現在のキーボードの高さ（px）
  };
};

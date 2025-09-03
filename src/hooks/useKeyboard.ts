// キーボードの表示・非表示を監視するカスタムフック
// - キーボードの高さを取得
// - フォーカス時の位置調整に使用

import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return {
    keyboardHeight,
  };
};

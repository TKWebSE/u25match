import Toast from 'react-native-toast-message';

/**
 * 成功トーストを表示します。
 * @param message 表示するメッセージ
 */
export function showSuccessToast(message: string) {
  Toast.show({
    type: 'success',
    text1: message,
  });
}

/**
 * エラートーストを表示します。
 * @param message 表示するメッセージ
 */
export function showErrorToast(message: string) {
  Toast.show({
    type: 'error',
    text1: 'エラー',
    text2: message,
  });
}

/**
 * 情報トーストを表示します。
 * @param message 表示するメッセージ
 */
export function showInfoToast(message: string) {
  Toast.show({
    type: 'info',
    text1: message,
  });
}

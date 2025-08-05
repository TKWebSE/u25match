import { Platform } from 'react-native';

// Webブラウザ版の判定
export const isWeb = Platform.OS === 'web';

// モバイル版の判定
export const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

// iOS版の判定
export const isIOS = Platform.OS === 'ios';

// Android版の判定
export const isAndroid = Platform.OS === 'android';

// プラットフォーム固有の値を取得するヘルパー関数
export const getPlatformValue = <T>(webValue: T, mobileValue: T): T => {
  return isWeb ? webValue : mobileValue;
};

// プラットフォーム固有のスタイルを取得するヘルパー関数
export const getPlatformStyle = (webStyle: any, mobileStyle: any) => {
  return isWeb ? webStyle : mobileStyle;
};

// プラットフォーム名を取得
export const getPlatformName = (): string => {
  return Platform.OS;
};

// プラットフォーム固有の設定を取得
export const getPlatformConfig = () => {
  return {
    isWeb,
    isMobile,
    isIOS,
    isAndroid,
    platformName: getPlatformName(),
  };
}; 

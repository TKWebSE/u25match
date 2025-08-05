import Constants from 'expo-constants';

/**
 * DEVモードかどうかを判定する
 * @returns true: DEVモード、false: 本番モード
 */
export const isDevMode = (): boolean => {
  const configIsDev = Constants.expoConfig?.extra?.isDev;
  const envIsDev = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
  const isDev = configIsDev || envIsDev;

  // 開発環境の判定を強化
  const result = isDev || process.env.NODE_ENV === 'development' || __DEV__;

  console.log('🔍 isDevMode() 詳細:', {
    configIsDev,
    envIsDev,
    isDev,
    NODE_ENV: process.env.NODE_ENV,
    __DEV__,
    result,
  });

  return result;
};

/**
 * DEVモードの詳細情報を取得する
 * @returns DEVモードの詳細情報
 */
export const getDevModeInfo = () => {
  const configIsDev = Constants.expoConfig?.extra?.isDev;
  const envIsDev = process.env.EXPO_PUBLIC_DEV_MODE === 'true';
  const isDev = configIsDev || envIsDev;
  const isDevelopment = isDev || process.env.NODE_ENV === 'development' || __DEV__;

  return {
    isDevMode: isDevelopment,
    configIsDev,
    envIsDev,
    NODE_ENV: process.env.NODE_ENV,
    EXPO_PUBLIC_DEV_MODE: process.env.EXPO_PUBLIC_DEV_MODE,
    __DEV__,
  };
}; 

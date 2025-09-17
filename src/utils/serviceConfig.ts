// src/utils/serviceConfig.ts
// サービス別環境設定ユーティリティ

/**
 * サービス別の動作モードを判定する
 * 
 * 優先順位：
 * 1. サービス個別環境変数 (EXPO_PUBLIC_{SERVICE}_FIREBASE=true)
 * 2. 全体環境変数 (EXPO_PUBLIC_ENV=prod)
 * 3. デフォルト (mock)
 * 
 * @param serviceName サービス名（AUTH, PROFILE, etc.）
 * @returns 'firebase' | 'mock'
 */
export const getServiceMode = (serviceName: string): 'mock' | 'firebase' => {
  // 1. サービス個別設定をチェック
  const specificEnv = process.env[`EXPO_PUBLIC_${serviceName.toUpperCase()}_FIREBASE`];
  if (specificEnv === 'true') {
    console.log(`🔧 ${serviceName}サービス: 個別設定でFirebaseモード`);
    return 'firebase';
  }

  // 2. 全体環境設定をチェック
  const globalEnv = process.env.EXPO_PUBLIC_ENV;
  if (globalEnv === 'prod') {
    console.log(`🔧 ${serviceName}サービス: 全体設定でFirebaseモード`);
    return 'firebase';
  }

  // 3. デフォルト（開発環境）
  console.log(`🔧 ${serviceName}サービス: デフォルトでモックモード`);
  return 'mock';
};

/**
 * 環境設定の詳細情報を取得（デバッグ用）
 */
export const getServiceConfigInfo = (serviceName: string) => {
  const specificEnv = process.env[`EXPO_PUBLIC_${serviceName.toUpperCase()}_FIREBASE`];
  const globalEnv = process.env.EXPO_PUBLIC_ENV;
  const mode = getServiceMode(serviceName);

  return {
    serviceName,
    specificEnv: specificEnv || 'undefined',
    globalEnv: globalEnv || 'undefined',
    mode,
    isDev: __DEV__,
  };
};

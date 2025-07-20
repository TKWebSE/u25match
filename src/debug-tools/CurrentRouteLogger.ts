import { useSegments } from 'expo-router';

export default function CurrentRouteLogger() {
  // Expo RouterのuseSegmentsフックを使用して現在のルートを取得
  const segments = useSegments();

  // 現在のルートをログに出力
  console.log("[🔍TEST] 現在のパス:", segments);

  return null; // このコンポーネントはUIをレンダリングしない
}

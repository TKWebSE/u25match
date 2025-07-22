import { usePathname } from 'expo-router';

export default function CurrentURLLogger() {
  // Expo RouterのusePathnameフックを使用して現在のルートを取得
  const segments = usePathname();

  // 現在のルートをログに出力
  console.log("[🔍TEST] 現在のパス:", segments);

  return; // このコンポーネントはUIをレンダリングしない
}

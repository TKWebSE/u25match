// ドロワーの開閉状態を検知するカスタムフック
// - ドロワーコンテキストを使用して状態を取得
// - ドロワーが開いている時のレイアウト調整
// - エラーハンドリングとフォールバック機能

import { useDrawer } from '@contexts/DrawerContext';

/**
 * ドロワーの状態を表すインターフェース
 */
interface DrawerState {
  isDrawerOpen: boolean;    // ドロワーが開いているかどうか
  availableWidth: number;   // 利用可能な画面幅
  availableHeight: number;  // 利用可能な画面高さ
  drawerWidth: number;      // ドロワーの幅
  effectiveWidth: number;   // ドロワーを考慮した実効幅
}

/**
 * ドロワーの開閉状態を取得するカスタムフック
 * @returns ドロワーの状態情報
 */
export const useDrawerState = (): DrawerState => {
  try {
    // DrawerContextからドロワーの状態を取得
    const { isDrawerOpen, drawerWidth, availableWidth, availableHeight, effectiveWidth } = useDrawer();

    return {
      isDrawerOpen,
      availableWidth,
      availableHeight,
      drawerWidth,
      effectiveWidth,
    };
  } catch (error) {
    // DrawerProviderの外で使用されている場合はデフォルト値を使用
    console.log('DrawerProviderの外でuseDrawerStateが使用されています。デフォルト値を使用します。');

    // デフォルトの画面サイズを取得（Web環境ではwindow、それ以外では固定値）
    const defaultWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const defaultHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    return {
      isDrawerOpen: false,      // デフォルトではドロワーは閉じている
      availableWidth: defaultWidth,
      availableHeight: defaultHeight,
      drawerWidth: 0,           // デフォルトではドロワー幅は0
      effectiveWidth: defaultWidth, // ドロワーが閉じているので実効幅は画面幅と同じ
    };
  }
};

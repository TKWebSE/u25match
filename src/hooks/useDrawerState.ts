// ドロワーの開閉状態を検知するカスタムフック
// - ドロワーコンテキストを使用して状態を取得
// - ドロワーが開いている時のレイアウト調整

import { useDrawer } from '@contexts/DrawerContext';

interface DrawerState {
  isDrawerOpen: boolean;
  availableWidth: number;
  availableHeight: number;
  drawerWidth: number;
  effectiveWidth: number;
}

export const useDrawerState = (): DrawerState => {
  try {
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
    const defaultWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const defaultHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    return {
      isDrawerOpen: false,
      availableWidth: defaultWidth,
      availableHeight: defaultHeight,
      drawerWidth: 0,
      effectiveWidth: defaultWidth,
    };
  }
};

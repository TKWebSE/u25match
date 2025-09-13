// ドロワーの状態を管理するコンテキスト
// - WebLayoutのサイドバー状態を利用
// - ドロワーのサイズ情報を提供
// - 子コンポーネントでドロワー状態を共有
// - 画面サイズの変更を監視

import { useSidebar } from '@layouts/WebLayout';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

/**
 * ドロワーの状態を表すインターフェース
 */
interface DrawerContextType {
  isDrawerOpen: boolean;    // ドロワーが開いているかどうか
  drawerWidth: number;      // ドロワーの幅
  availableWidth: number;   // 利用可能な画面幅
  availableHeight: number;  // 利用可能な画面高さ
  effectiveWidth: number;   // ドロワーを考慮した実効幅
}

// ドロワーの状態を管理するコンテキスト
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

/**
 * DrawerProviderのプロパティ
 */
interface DrawerProviderProps {
  children: ReactNode;
}

/**
 * ドロワーの状態を管理するプロバイダーコンポーネント
 * @param children 子コンポーネント
 */
export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  // 利用可能な画面サイズを管理する状態
  const [availableWidth, setAvailableWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Dimensions.get('window').width
  );
  const [availableHeight, setAvailableHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : Dimensions.get('window').height
  );

  // 画面サイズの変更を監視するエフェクト
  useEffect(() => {
    // Web環境でのみ実行
    if (Platform.OS !== 'web') {
      return;
    }

    /**
     * 画面サイズを更新する関数
     */
    const updateDimensions = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : Dimensions.get('window').width;
      const height = typeof window !== 'undefined' ? window.innerHeight : Dimensions.get('window').height;

      setAvailableWidth(width);
      setAvailableHeight(height);
    };

    // 初回実行
    updateDimensions();

    // リサイズイベントを監視
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateDimensions);

      // クリーンアップ関数：イベントリスナーを削除
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  // WebLayoutのサイドバー状態を取得
  let sidebarState;
  try {
    sidebarState = useSidebar();
  } catch (error) {
    // WebLayoutの外で使用されている場合はデフォルト値を使用
    console.log('WebLayoutの外でDrawerContextが使用されています。デフォルト値を使用します。');
    sidebarState = {
      isSidebarOpen: false,
      sidebarWidth: 0,
      mainContentWidth: availableWidth,
    };
  }

  const { isSidebarOpen, sidebarWidth } = sidebarState;

  // ドロワーが開いている場合は、ドロワーの幅分だけ縮める
  const effectiveWidth = isSidebarOpen ? availableWidth - sidebarWidth : availableWidth;

  // コンテキストに提供する値
  const value: DrawerContextType = {
    isDrawerOpen: isSidebarOpen,
    drawerWidth: sidebarWidth,
    availableWidth,
    availableHeight,
    effectiveWidth,
  };

  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  );
};

/**
 * ドロワーの状態を取得するカスタムフック
 * @returns ドロワーの状態情報
 * @throws DrawerProviderの外で使用された場合にエラーを投げる
 */
export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

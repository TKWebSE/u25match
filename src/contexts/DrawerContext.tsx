// ドロワーの状態を管理するコンテキスト
// - WebLayoutのサイドバー状態を利用
// - ドロワーのサイズ情報を提供
// - 子コンポーネントでドロワー状態を共有

import { useSidebar } from '@layouts/WebLayout';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';

interface DrawerContextType {
  isDrawerOpen: boolean;
  drawerWidth: number;
  availableWidth: number;
  availableHeight: number;
  effectiveWidth: number;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [availableWidth, setAvailableWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Dimensions.get('window').width
  );
  const [availableHeight, setAvailableHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : Dimensions.get('window').height
  );

  useEffect(() => {
    if (Platform.OS !== 'web') {
      return;
    }

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

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

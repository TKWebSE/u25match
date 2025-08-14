import { isWeb } from '@utils/platform';
import React from 'react';
import { MobileLayout } from './MobileLayout';
import { WebLayout } from './WebLayout';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

/**
 * プラットフォームを自動判定して適切なレイアウトを表示
 * スマホ: 下タブナビゲーション
 * ブラウザ: 左縦サイドナビゲーション
 */
export const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children }) => {
  // プラットフォームに応じてレイアウトを切り替え
  if (isWeb) {
    return <WebLayout>{children}</WebLayout>;
  }

  return <MobileLayout>{children}</MobileLayout>;
};

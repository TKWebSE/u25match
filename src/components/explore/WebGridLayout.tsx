import { spacing } from '@styles/globalStyles';
import { isWeb } from '@utils/platform';
import React from 'react';
import { View } from 'react-native';

interface WebGridLayoutProps {
  children: React.ReactNode;
  gridTemplateColumns: string;
  gridGap: string;
}

/**
 * Web環境専用のCSS Gridレイアウトコンポーネント
 * React Native WebでCSS Gridを使用するためのラッパー
 */
const WebGridLayout: React.FC<WebGridLayoutProps> = ({
  children,
  gridTemplateColumns,
  gridGap,
}) => {
  return (
    <View
      style={isWeb ? {
        display: 'grid',
        gridTemplateColumns,
        gap: gridGap,
        padding: spacing.lg,
      } as any : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: spacing.lg,
      }}
    >
      {children}
    </View>
  );
};

export default WebGridLayout;

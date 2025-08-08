import React from 'react';
import { Text, View } from 'react-native';

/**
 * 認証済みマークのプロパティ
 */
interface VerificationMarkProps {
  /** 認証済みかどうか */
  isVerified?: boolean;
  /** マークのサイズ（デフォルト: 20） */
  size?: number;
  /** マークの色（デフォルト: 緑色） */
  color?: string;
  /** 背景色（デフォルト: 緑色） */
  backgroundColor?: string;
  /** マークの位置調整用マージン */
  marginLeft?: number;
}

/**
 * 認証済みマークコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - 認証済み状態の視覚的表示
 * - 再利用可能なチェックマークUI
 * - カスタマイズ可能なスタイル
 * 
 * @param isVerified - 認証済みかどうか
 * @param size - マークのサイズ
 * @param color - マークの色
 * @param backgroundColor - 背景色
 * @param marginLeft - 左マージン
 * 
 * @example
 * ```typescript
 * // 基本的な使用
 * <VerificationMark isVerified={true} />
 * 
 * // カスタマイズ
 * <VerificationMark 
 *   isVerified={true} 
 *   size={24} 
 *   color="white" 
 *   backgroundColor="#38A169" 
 * />
 * ```
 */
export const VerificationMark: React.FC<VerificationMarkProps> = ({
  isVerified = false,
  size = 20,
  color = 'white',
  backgroundColor = '#38A169',
  marginLeft = 8,
}) => {
  // 認証済みでない場合は未認証マークを表示
  if (!isVerified) {
    return (
      <View
        style={{
          marginLeft,
          backgroundColor: 'transparent', // 透明
          borderRadius: size / 2,
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#9CA3AF', // グレーの線
        }}
      >
        <Text
          style={{
            color: '#9CA3AF', // グレーのチェックマーク
            fontSize: size * 0.6,
            fontWeight: 'bold',
          }}
        >
          ✓
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        marginLeft,
        backgroundColor,
        borderRadius: size / 2,
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: backgroundColor,
      }}
    >
      <Text
        style={{
          color,
          fontSize: size * 0.6,
          fontWeight: 'bold',
        }}
      >
        ✓
      </Text>
    </View>
  );
};

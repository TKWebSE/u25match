import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

/**
 * プロフィール編集ボタンのプロパティ
 */
interface EditButtonProps {
  /** 編集ボタンを押した時の処理 */
  onPress: () => void;
}

/**
 * プロフィール編集ボタンコンポーネント
 * 
 * このコンポーネントは以下の責務を持ちます：
 * - プロフィール編集画面への遷移
 * - 編集ボタンのスタイリング
 * - タップ時の処理
 */
export const EditButton: React.FC<EditButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={ProfileDetailStyles.editButton}
      onPress={onPress}
    >
      <Text style={ProfileDetailStyles.editButtonText}>✏️ プロフィールを編集</Text>
    </TouchableOpacity>
  );
};

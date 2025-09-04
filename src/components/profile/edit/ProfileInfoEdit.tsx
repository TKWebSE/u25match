import { PrefectureName } from '@/src/constants/userEdit/prefectures';
import { PrefectureSelector } from '@components/common/PrefectureSelector';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface ProfileInfoEditProps {
  name: string;
  location: string;
  isVerified?: boolean;
  onNameChange: (name: string) => void;
  onLocationChange: (location: PrefectureName) => void;
  onFocus?: (fieldName: string) => void;
}

export interface ProfileInfoEditRef {
  scrollToField: (fieldName: string) => void;
}

/**
 * プロフィール情報編集コンポーネント
 * 
 * @param name - ユーザー名
 * @param location - 出身地
 * @param isVerified - 本人確認済みかどうか（編集不可）
 * @param onNameChange - 名前変更時のコールバック
 * @param onLocationChange - 出身地変更時のコールバック
 * @param onFocus - フィールドフォーカス時のコールバック
 */
const ProfileInfoEdit = forwardRef<ProfileInfoEditRef, ProfileInfoEditProps>(({
  name,
  location,
  isVerified = false,
  onNameChange,
  onLocationChange,
  onFocus,
}, ref) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [localName, setLocalName] = useState(name);
  const nameInputRef = useRef<TextInput>(null);

  // デバウンス処理（500ms後に親に通知）
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localName !== name) {
        onNameChange(localName);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localName, name, onNameChange]);

  // 外部からnameが変更された場合はローカル状態を更新
  useEffect(() => {
    setLocalName(name);
  }, [name]);

  const handleNameChange = useCallback((text: string) => {
    setLocalName(text);
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToField: (fieldName: string) => {
      if (fieldName === 'name' && nameInputRef.current) {
        nameInputRef.current.focus();
      }
      // 居住地はセレクターなのでフォーカス処理は不要
    },
  }));

  return (
    <View style={ProfileEditStyles.section}>
      <Text style={ProfileEditStyles.sectionTitle}>基本情報</Text>

      {/* 名前 */}
      <View style={ProfileEditStyles.inputContainer}>
        <Text style={ProfileEditStyles.inputLabel}>名前</Text>
        <TextInput
          ref={nameInputRef}
          style={[
            ProfileEditStyles.input,
            focusedField === 'name' && ProfileEditStyles.inputFocused
          ]}
          value={localName}
          onChangeText={handleNameChange}
          onFocus={() => {
            setFocusedField('name');
            onFocus?.('name');
          }}
          onBlur={() => setFocusedField(null)}
          placeholder="名前を入力（15文字以内）"
          placeholderTextColor="#9CA3AF"
          maxLength={15}
        />
        <Text style={ProfileEditStyles.inputHelperText}>
          {localName.length}/15 文字
        </Text>
      </View>

      {/* 居住地 */}
      <View style={ProfileEditStyles.inputContainer}>
        <Text style={ProfileEditStyles.inputLabel}>居住地</Text>
        <PrefectureSelector
          selectedPrefecture={location as PrefectureName}
          onPrefectureChange={onLocationChange}
          placeholder="都道府県を選択"
        />
      </View>
    </View>
  );
});

ProfileInfoEdit.displayName = 'ProfileInfoEdit';

export { ProfileInfoEdit };


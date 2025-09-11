import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface HeightSelectorProps {
  selectedHeight: number;
  onHeightChange: (height: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 身長選択コンポーネント
 * 
 * 身長をcm単位で選択できるモーダルピッカーです。
 * 範囲: 100cm - 250cm
 * 
 * @param {HeightSelectorProps} props - コンポーネントのプロパティ
 * @param {number} props.selectedHeight - 選択された身長
 * @param {Function} props.onHeightChange - 身長変更時のコールバック
 * @param {string} [props.placeholder] - プレースホルダーテキスト
 * @returns {React.ReactElement} 身長選択コンポーネント
 */
export const HeightSelector: React.FC<HeightSelectorProps> = ({
  selectedHeight,
  onHeightChange,
  placeholder = "身長を選択",
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 身長の選択肢を生成（100cm - 250cm）
  const heightOptions = Array.from({ length: 151 }, (_, i) => i + 100);

  const handleHeightSelect = (height: number) => {
    onHeightChange(height);
    setIsModalVisible(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          ProfileEditStyles.detailValue,
          disabled && { opacity: 0.6 },
        ]}
        onPress={openModal}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text style={{
          fontSize: 16,
          color: selectedHeight > 0 ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedHeight > 0 ? `${selectedHeight}cm` : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={ProfileEditStyles.container}>
          {/* ヘッダー */}
          <View style={ProfileEditStyles.modalHeader}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={ProfileEditStyles.headerTitle}>身長を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 身長リスト */}
          <ScrollView style={{ flex: 1 }}>
            {heightOptions.map((height) => (
              <TouchableOpacity
                key={height}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedHeight === height ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleHeightSelect(height)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedHeight === height ? '#007AFF' : '#000000',
                    fontWeight: selectedHeight === height ? '600' : 'normal',
                  }
                ]}>
                  {height}cm
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default HeightSelector;

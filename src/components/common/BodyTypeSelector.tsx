import { BODY_TYPES, BodyTypeName } from '@/src/constants/userEdit/bodyTypes';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface BodyTypeSelectorProps {
  selectedBodyType?: BodyTypeName;
  onBodyTypeChange: (bodyType: BodyTypeName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 体型セレクターコンポーネント
 * モーダルで体型を選択できる
 */
export const BodyTypeSelector: React.FC<BodyTypeSelectorProps> = ({
  selectedBodyType,
  onBodyTypeChange,
  placeholder = '体型を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBodyTypeSelect = (bodyType: BodyTypeName) => {
    onBodyTypeChange(bodyType);
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
          color: selectedBodyType ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedBodyType || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>体型を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 体型リスト */}
          <ScrollView style={{ flex: 1 }}>
            {BODY_TYPES.map((bodyType) => (
              <TouchableOpacity
                key={bodyType.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedBodyType === bodyType.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleBodyTypeSelect(bodyType.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedBodyType === bodyType.name ? '#007AFF' : '#000000',
                    fontWeight: selectedBodyType === bodyType.name ? '600' : 'normal',
                  }
                ]}>
                  {bodyType.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

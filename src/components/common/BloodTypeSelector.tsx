import { BLOOD_TYPES, BloodTypeName } from '@/src/constants/userEdit/bloodTypes';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface BloodTypeSelectorProps {
  selectedBloodType?: BloodTypeName;
  onBloodTypeChange: (bloodType: BloodTypeName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 血液型セレクターコンポーネント
 * モーダルで血液型を選択できる
 */
export const BloodTypeSelector: React.FC<BloodTypeSelectorProps> = ({
  selectedBloodType,
  onBloodTypeChange,
  placeholder = '血液型を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBloodTypeSelect = (bloodType: BloodTypeName) => {
    onBloodTypeChange(bloodType);
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
          color: selectedBloodType ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedBloodType || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>血液型を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 血液型リスト */}
          <ScrollView style={{ flex: 1 }}>
            {BLOOD_TYPES.map((bloodType) => (
              <TouchableOpacity
                key={bloodType.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedBloodType === bloodType.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleBloodTypeSelect(bloodType.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedBloodType === bloodType.name ? '#007AFF' : '#000000',
                    fontWeight: selectedBloodType === bloodType.name ? '600' : 'normal',
                  }
                ]}>
                  {bloodType.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

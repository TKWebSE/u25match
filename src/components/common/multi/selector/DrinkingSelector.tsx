import { DRINKING_LEVELS, DrinkingName } from '@/src/constants/userEdit/drinking';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DrinkingSelectorProps {
  selectedDrinking?: DrinkingName;
  onDrinkingChange: (drinking: DrinkingName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 飲酒習慣セレクターコンポーネント
 * モーダルで飲酒習慣を選択できる
 */
export const DrinkingSelector: React.FC<DrinkingSelectorProps> = ({
  selectedDrinking,
  onDrinkingChange,
  placeholder = '飲酒習慣を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDrinkingSelect = (drinking: DrinkingName) => {
    onDrinkingChange(drinking);
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
          color: selectedDrinking ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedDrinking || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>飲酒習慣を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 飲酒習慣リスト */}
          <ScrollView style={{ flex: 1 }}>
            {DRINKING_LEVELS.map((drinking) => (
              <TouchableOpacity
                key={drinking.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedDrinking === drinking.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleDrinkingSelect(drinking.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedDrinking === drinking.name ? '#007AFF' : '#000000',
                    fontWeight: selectedDrinking === drinking.name ? '600' : 'normal',
                  }
                ]}>
                  {drinking.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

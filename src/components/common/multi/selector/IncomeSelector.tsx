import { IncomeName, getIncomeOptions } from '@/src/constants/userEdit/income';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface IncomeSelectorProps {
  selectedIncome: IncomeName | undefined;
  onIncomeChange: (income: IncomeName) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const IncomeSelector: React.FC<IncomeSelectorProps> = ({
  selectedIncome,
  onIncomeChange,
  placeholder = "年収を選択",
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const incomeOptions = getIncomeOptions();

  const handleIncomeSelect = (income: IncomeName) => {
    onIncomeChange(income);
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
          color: selectedIncome ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedIncome || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>年収を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 年収リスト */}
          <ScrollView style={{ flex: 1 }}>
            {incomeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedIncome === option.value ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleIncomeSelect(option.value)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedIncome === option.value ? '#007AFF' : '#000000',
                    fontWeight: selectedIncome === option.value ? '600' : 'normal',
                  }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

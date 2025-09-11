import { CHILDREN_OPTIONS, ChildrenName } from '@/src/constants/userEdit/children';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ChildrenSelectorProps {
  selectedChildren?: ChildrenName;
  onChildrenChange: (children: ChildrenName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 子供の有無セレクターコンポーネント
 * モーダルで子供の有無を選択できる
 */
export const ChildrenSelector: React.FC<ChildrenSelectorProps> = ({
  selectedChildren,
  onChildrenChange,
  placeholder = '子供の有無を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChildrenSelect = (children: ChildrenName) => {
    onChildrenChange(children);
    setIsModalVisible(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const getDisplayText = () => {
    return selectedChildren || placeholder;
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
          color: selectedChildren ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {getDisplayText()}
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
              <Text style={ProfileEditStyles.headerTitle}>子供の有無を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 子供の有無リスト */}
          <ScrollView style={{ flex: 1 }}>
            {CHILDREN_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedChildren === option.value ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleChildrenSelect(option.value)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedChildren === option.value ? '#007AFF' : '#000000',
                    fontWeight: selectedChildren === option.value ? '600' : 'normal',
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

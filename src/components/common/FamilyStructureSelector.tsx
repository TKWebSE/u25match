import { FAMILY_STRUCTURE, FamilyStructureName } from '@/src/constants/userEdit/familyStructure';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface FamilyStructureSelectorProps {
  selectedStructure?: FamilyStructureName;
  onStructureChange: (structure: FamilyStructureName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 同居人セレクターコンポーネント
 * モーダルで同居人の状況を選択できる
 */
export const FamilyStructureSelector: React.FC<FamilyStructureSelectorProps> = ({
  selectedStructure,
  onStructureChange,
  placeholder = '同居人を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleStructureSelect = (structure: FamilyStructureName) => {
    onStructureChange(structure);
    setIsModalVisible(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const getDisplayText = () => {
    return selectedStructure || placeholder;
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
          color: selectedStructure ? '#000000' : '#9CA3AF',
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
              <Text style={ProfileEditStyles.headerTitle}>同居人を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 同居人リスト */}
          <ScrollView style={{ flex: 1 }}>
            {FAMILY_STRUCTURE.map((structure) => (
              <TouchableOpacity
                key={structure.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedStructure === structure.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleStructureSelect(structure.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedStructure === structure.name ? '#007AFF' : '#000000',
                    fontWeight: selectedStructure === structure.name ? '600' : 'normal',
                  }
                ]}>
                  {structure.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

import { PETS, PetName } from '@/src/constants/userEdit/pets';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PetsSelectorProps {
  selectedPets?: PetName[];
  onPetsChange: (pets: PetName[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * ペットセレクターコンポーネント
 * モーダルでペットの種類を複数選択できる
 */
export const PetsSelector: React.FC<PetsSelectorProps> = ({
  selectedPets = [],
  onPetsChange,
  placeholder = 'ペットを選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePetToggle = (pet: PetName) => {
    const isSelected = selectedPets.includes(pet);
    let newPets: PetName[];

    if (isSelected) {
      // 選択解除
      newPets = selectedPets.filter(p => p !== pet);
    } else {
      // 選択追加
      if (pet === 'ペットを飼っていない') {
        // 「ペットを飼っていない」を選択した場合は他の選択をクリア
        newPets = [pet];
      } else {
        // 他のペットを選択した場合は「ペットを飼っていない」を除外
        newPets = [...selectedPets.filter(p => p !== 'ペットを飼っていない'), pet];
      }
    }

    onPetsChange(newPets);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const getDisplayText = () => {
    if (selectedPets.length === 0) {
      return placeholder;
    }
    if (selectedPets.length === 1) {
      return selectedPets[0];
    }
    return `${selectedPets.length}種類選択中`;
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
          color: selectedPets.length > 0 ? '#000000' : '#9CA3AF',
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
              <Text style={ProfileEditStyles.headerTitle}>ペットを選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ペットリスト */}
          <ScrollView style={{ flex: 1 }}>
            {PETS.map((pet) => {
              const isSelected = selectedPets.includes(pet.name);
              return (
                <TouchableOpacity
                  key={pet.code}
                  style={[
                    {
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: '#E5E7EB',
                      backgroundColor: isSelected ? '#F3F4F6' : '#FFFFFF',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }
                  ]}
                  onPress={() => handlePetToggle(pet.name)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    ProfileEditStyles.inputLabel,
                    {
                      color: isSelected ? '#007AFF' : '#000000',
                      fontWeight: isSelected ? '600' : 'normal',
                      flex: 1,
                    }
                  ]}>
                    {pet.name}
                  </Text>
                  {isSelected && (
                    <Text style={{ color: '#007AFF', fontSize: 18, fontWeight: 'bold' }}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

import { SMOKING_LEVELS, SmokingName } from '@/src/constants/userEdit/smoking';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface SmokingSelectorProps {
  selectedSmoking?: SmokingName;
  onSmokingChange: (smoking: SmokingName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 喫煙習慣セレクターコンポーネント
 * モーダルで喫煙習慣を選択できる
 */
export const SmokingSelector: React.FC<SmokingSelectorProps> = ({
  selectedSmoking,
  onSmokingChange,
  placeholder = '喫煙習慣を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSmokingSelect = (smoking: SmokingName) => {
    onSmokingChange(smoking);
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
          color: selectedSmoking ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedSmoking || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>喫煙習慣を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 喫煙習慣リスト */}
          <ScrollView style={{ flex: 1 }}>
            {SMOKING_LEVELS.map((smoking) => (
              <TouchableOpacity
                key={smoking.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedSmoking === smoking.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleSmokingSelect(smoking.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedSmoking === smoking.name ? '#007AFF' : '#000000',
                    fontWeight: selectedSmoking === smoking.name ? '600' : 'normal',
                  }
                ]}>
                  {smoking.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

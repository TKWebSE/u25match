import { PREFECTURES, PrefectureName } from '@/src/constants/userEdit/prefectures';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PrefectureSelectorProps {
  selectedPrefecture?: PrefectureName;
  onPrefectureChange: (prefecture: PrefectureName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 都道府県セレクターコンポーネント
 * モーダルで都道府県を選択できる
 */
export const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  selectedPrefecture,
  onPrefectureChange,
  placeholder = '都道府県を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePrefectureSelect = (prefecture: PrefectureName) => {
    onPrefectureChange(prefecture);
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
          color: selectedPrefecture ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedPrefecture || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>都道府県を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 都道府県リスト */}
          <ScrollView style={{ flex: 1 }}>
            {PREFECTURES.map((prefecture) => (
              <TouchableOpacity
                key={prefecture.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedPrefecture === prefecture.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handlePrefectureSelect(prefecture.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedPrefecture === prefecture.name ? '#007AFF' : '#000000',
                    fontWeight: selectedPrefecture === prefecture.name ? '600' : 'normal',
                  }
                ]}>
                  {prefecture.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

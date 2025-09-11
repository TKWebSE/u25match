import { EDUCATION_LEVELS, EducationName } from '@/src/constants/userEdit/education';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface EducationSelectorProps {
  selectedEducation?: EducationName;
  onEducationChange: (education: EducationName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 最終学歴セレクターコンポーネント
 * モーダルで最終学歴を選択できる
 */
export const EducationSelector: React.FC<EducationSelectorProps> = ({
  selectedEducation,
  onEducationChange,
  placeholder = '最終学歴を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEducationSelect = (education: EducationName) => {
    onEducationChange(education);
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
          color: selectedEducation ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedEducation || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>最終学歴を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 学歴リスト */}
          <ScrollView style={{ flex: 1 }}>
            {EDUCATION_LEVELS.map((education) => (
              <TouchableOpacity
                key={education.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedEducation === education.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleEducationSelect(education.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedEducation === education.name ? '#007AFF' : '#000000',
                    fontWeight: selectedEducation === education.name ? '600' : 'normal',
                  }
                ]}>
                  {education.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

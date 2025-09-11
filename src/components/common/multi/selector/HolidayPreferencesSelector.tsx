import { HOLIDAY_PREFERENCES, HolidayPreferenceName } from '@/src/constants/userEdit/holidayPreferences';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface HolidayPreferencesSelectorProps {
  selectedPreference?: HolidayPreferenceName;
  onPreferenceChange: (preference: HolidayPreferenceName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 休日セレクターコンポーネント
 * モーダルで休日パターンを選択できる
 */
export const HolidayPreferencesSelector: React.FC<HolidayPreferencesSelectorProps> = ({
  selectedPreference,
  onPreferenceChange,
  placeholder = '休日を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePreferenceSelect = (preference: HolidayPreferenceName) => {
    onPreferenceChange(preference);
    setIsModalVisible(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const getDisplayText = () => {
    return selectedPreference || placeholder;
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
          color: selectedPreference ? '#000000' : '#9CA3AF',
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
              <Text style={ProfileEditStyles.headerTitle}>休日を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 休日リスト */}
          <ScrollView style={{ flex: 1 }}>
            {HOLIDAY_PREFERENCES.map((preference) => (
              <TouchableOpacity
                key={preference.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedPreference === preference.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handlePreferenceSelect(preference.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedPreference === preference.name ? '#007AFF' : '#000000',
                    fontWeight: selectedPreference === preference.name ? '600' : 'normal',
                  }
                ]}>
                  {preference.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

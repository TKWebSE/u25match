import { MARRIAGE_HISTORY_OPTIONS, MarriageHistoryName } from '@/src/constants/userEdit/marriageHistory';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MarriageHistorySelectorProps {
  selectedMarriageHistory?: MarriageHistoryName;
  onMarriageHistoryChange: (marriageHistory: MarriageHistoryName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 結婚歴セレクターコンポーネント
 * モーダルで結婚歴を選択できる
 */
export const MarriageHistorySelector: React.FC<MarriageHistorySelectorProps> = ({
  selectedMarriageHistory,
  onMarriageHistoryChange,
  placeholder = '結婚歴を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMarriageHistorySelect = (marriageHistory: MarriageHistoryName) => {
    onMarriageHistoryChange(marriageHistory);
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
          color: selectedMarriageHistory ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedMarriageHistory || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>結婚歴を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 結婚歴リスト */}
          <ScrollView style={{ flex: 1 }}>
            {MARRIAGE_HISTORY_OPTIONS.map((marriageHistory) => (
              <TouchableOpacity
                key={marriageHistory.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedMarriageHistory === marriageHistory.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleMarriageHistorySelect(marriageHistory.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedMarriageHistory === marriageHistory.name ? '#007AFF' : '#000000',
                    fontWeight: selectedMarriageHistory === marriageHistory.name ? '600' : 'normal',
                  }
                ]}>
                  {marriageHistory.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

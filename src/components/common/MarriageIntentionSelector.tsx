import { MARRIAGE_INTENTION_OPTIONS, MarriageIntentionName } from '@/src/constants/userEdit/marriageIntention';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MarriageIntentionSelectorProps {
  selectedMarriageIntention?: MarriageIntentionName;
  onMarriageIntentionChange: (marriageIntention: MarriageIntentionName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 結婚の意思セレクターコンポーネント
 * モーダルで結婚の意思を選択できる
 */
export const MarriageIntentionSelector: React.FC<MarriageIntentionSelectorProps> = ({
  selectedMarriageIntention,
  onMarriageIntentionChange,
  placeholder = '結婚の意思を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMarriageIntentionSelect = (marriageIntention: MarriageIntentionName) => {
    onMarriageIntentionChange(marriageIntention);
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
          color: selectedMarriageIntention ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedMarriageIntention || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>結婚の意思を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 結婚の意思リスト */}
          <ScrollView style={{ flex: 1 }}>
            {MARRIAGE_INTENTION_OPTIONS.map((marriageIntention) => (
              <TouchableOpacity
                key={marriageIntention.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedMarriageIntention === marriageIntention.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleMarriageIntentionSelect(marriageIntention.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedMarriageIntention === marriageIntention.name ? '#007AFF' : '#000000',
                    fontWeight: selectedMarriageIntention === marriageIntention.name ? '600' : 'normal',
                  }
                ]}>
                  {marriageIntention.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

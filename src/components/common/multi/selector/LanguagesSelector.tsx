import { LANGUAGES, LanguageName } from '@/src/constants/userEdit/languages';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface LanguagesSelectorProps {
  selectedLanguage?: LanguageName;
  onLanguageChange: (language: LanguageName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 言語セレクターコンポーネント
 * モーダルで話せる言語を単一選択できる
 */
export const LanguagesSelector: React.FC<LanguagesSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  placeholder = '言語を選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLanguageSelect = (language: LanguageName) => {
    onLanguageChange(language);
    setIsModalVisible(false);
  };

  const openModal = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  const getDisplayText = () => {
    if (!selectedLanguage) {
      return placeholder;
    }
    return selectedLanguage;
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
          color: selectedLanguage ? '#000000' : '#9CA3AF',
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
              <Text style={ProfileEditStyles.headerTitle}>言語を選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 言語リスト */}
          <ScrollView style={{ flex: 1 }}>
            {LANGUAGES.map((language) => {
              const isSelected = selectedLanguage === language.name;
              return (
                <TouchableOpacity
                  key={language.code}
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
                  onPress={() => handleLanguageSelect(language.name)}
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
                    {language.name}
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

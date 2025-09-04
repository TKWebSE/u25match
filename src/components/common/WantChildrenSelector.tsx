import { WANT_CHILDREN_OPTIONS, WantChildrenName } from '@/src/constants/userEdit/wantChildren';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WantChildrenSelectorProps {
  selectedWantChildren?: WantChildrenName;
  onWantChildrenChange: (wantChildren: WantChildrenName) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 子供が欲しいかセレクターコンポーネント
 * モーダルで子供が欲しいかを選択できる
 */
export const WantChildrenSelector: React.FC<WantChildrenSelectorProps> = ({
  selectedWantChildren,
  onWantChildrenChange,
  placeholder = '子供が欲しいかを選択',
  disabled = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleWantChildrenSelect = (wantChildren: WantChildrenName) => {
    onWantChildrenChange(wantChildren);
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
          color: selectedWantChildren ? '#000000' : '#9CA3AF',
          fontWeight: 'normal',
        }}>
          {selectedWantChildren || placeholder}
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
              <Text style={ProfileEditStyles.headerTitle}>子供が欲しいかを選択</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <Text style={[ProfileEditStyles.buttonText, { color: '#007AFF' }]}>完了</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 子供が欲しいかリスト */}
          <ScrollView style={{ flex: 1 }}>
            {WANT_CHILDREN_OPTIONS.map((wantChildren) => (
              <TouchableOpacity
                key={wantChildren.code}
                style={[
                  {
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                    backgroundColor: selectedWantChildren === wantChildren.name ? '#F3F4F6' : '#FFFFFF',
                  }
                ]}
                onPress={() => handleWantChildrenSelect(wantChildren.name)}
                activeOpacity={0.7}
              >
                <Text style={[
                  ProfileEditStyles.inputLabel,
                  {
                    color: selectedWantChildren === wantChildren.name ? '#007AFF' : '#000000',
                    fontWeight: selectedWantChildren === wantChildren.name ? '600' : 'normal',
                  }
                ]}>
                  {wantChildren.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

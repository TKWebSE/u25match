import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WeightSelectorProps {
  selectedWeight?: number;
  onWeightChange: (weight?: number) => void;
  placeholder?: string;
}

/**
 * 体重選択コンポーネント
 * 
 * 体重をkg単位で選択できるモーダルピッカーです。
 * 範囲: 30kg - 200kg
 * 
 * @param {WeightSelectorProps} props - コンポーネントのプロパティ
 * @param {number} [props.selectedWeight] - 選択された体重
 * @param {Function} props.onWeightChange - 体重変更時のコールバック
 * @param {string} [props.placeholder] - プレースホルダーテキスト
 * @returns {React.ReactElement} 体重選択コンポーネント
 */
export const WeightSelector: React.FC<WeightSelectorProps> = ({
  selectedWeight,
  onWeightChange,
  placeholder = "体重を選択（オプション）"
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempWeight, setTempWeight] = useState(selectedWeight || 0);

  // 体重の選択肢を生成（30kg - 200kg）
  const weightOptions = Array.from({ length: 171 }, (_, i) => i + 30);

  const handleConfirm = () => {
    onWeightChange(tempWeight === 0 ? undefined : tempWeight);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTempWeight(selectedWeight || 0);
    setIsModalVisible(false);
  };

  const handleClear = () => {
    onWeightChange(undefined);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.selectorText,
          !selectedWeight && styles.placeholderText
        ]}>
          {selectedWeight ? `${selectedWeight}kg` : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelButton}>キャンセル</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>体重を選択</Text>
              <View style={styles.headerRight}>
                <TouchableOpacity onPress={handleClear}>
                  <Text style={styles.clearButton}>クリア</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmButton}>決定</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Picker
              selectedValue={tempWeight}
              onValueChange={(value: number) => setTempWeight(value)}
              style={styles.picker}
            >
              {weightOptions.map((weight) => (
                <Picker.Item
                  key={weight}
                  label={`${weight}kg`}
                  value={weight}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  selectorText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  arrow: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // iPhoneのホームインジケーター分
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cancelButton: {
    fontSize: 16,
    color: '#6B7280',
  },
  clearButton: {
    fontSize: 16,
    color: '#EF4444',
  },
  confirmButton: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  picker: {
    height: 200,
  },
});

export default WeightSelector;

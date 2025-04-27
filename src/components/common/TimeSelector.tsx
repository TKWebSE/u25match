import { Picker } from '@react-native-picker/picker';
import { ProfileEditStyles } from '@styles/profile/ProfileEditStyles';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface TimeSelectorProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  placeholder?: string;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onTimeChange,
  placeholder = "時間を選択"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tempHour, setTempHour] = useState('22');
  const [tempMinute, setTempMinute] = useState('00');

  // 時間をパースして時と分に分割
  const parseTime = (time: string) => {
    if (!time) return { hour: '22', minute: '00' };
    const [hour, minute] = time.split(':');
    return { hour: hour || '22', minute: minute || '00' };
  };

  // 初期化時に時間をパース
  React.useEffect(() => {
    const { hour, minute } = parseTime(selectedTime);
    setTempHour(hour);
    setTempMinute(minute);
  }, [selectedTime]);

  const handleConfirm = () => {
    const time = `${tempHour.padStart(2, '0')}:${tempMinute.padStart(2, '0')}`;
    onTimeChange(time);
    setIsVisible(false);
  };

  const handleCancel = () => {
    const { hour, minute } = parseTime(selectedTime);
    setTempHour(hour);
    setTempMinute(minute);
    setIsVisible(false);
  };

  // 時間のオプションを生成（0-23時）
  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    label: `${i.toString().padStart(2, '0')}時`,
    value: i.toString()
  }));

  // 分のオプションを生成（0-59分、15分刻み）
  const minuteOptions = Array.from({ length: 4 }, (_, i) => ({
    label: `${(i * 15).toString().padStart(2, '0')}分`,
    value: (i * 15).toString().padStart(2, '0')
  }));

  return (
    <>
      <TouchableOpacity
        style={[
          ProfileEditStyles.detailValue,
          { justifyContent: 'center' }
        ]}
        onPress={() => setIsVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[
          ProfileEditStyles.detailValueText,
          !selectedTime && { color: '#9CA3AF' }
        ]}>
          {selectedTime || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={ProfileEditStyles.modalOverlay}>
          <View style={ProfileEditStyles.modalContent}>
            <Text style={ProfileEditStyles.modalTitle}>寝る時間を選択</Text>

            <View style={ProfileEditStyles.pickerContainer}>
              <Picker
                selectedValue={tempHour}
                onValueChange={setTempHour}
                style={ProfileEditStyles.picker}
              >
                {hourOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>

              <Text style={ProfileEditStyles.pickerSeparator}>:</Text>

              <Picker
                selectedValue={tempMinute}
                onValueChange={setTempMinute}
                style={ProfileEditStyles.picker}
              >
                {minuteOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>

            <View style={ProfileEditStyles.modalButtons}>
              <TouchableOpacity
                style={[ProfileEditStyles.modalButton, ProfileEditStyles.modalButtonCancel]}
                onPress={handleCancel}
              >
                <Text style={ProfileEditStyles.modalButtonCancelText}>キャンセル</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[ProfileEditStyles.modalButton, ProfileEditStyles.modalButtonConfirm]}
                onPress={handleConfirm}
              >
                <Text style={ProfileEditStyles.modalButtonConfirmText}>決定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

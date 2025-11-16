import { HeaderSection, NoticeList, PhotoUploader, StepsSection, VerificationActions } from '@components/verification';
import { useVerificationFlow } from '@hooks/useVerificationFlow';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 本人確認画面
 *
 * 主な責務：
 * - 本人確認手順の案内
 * - 必要書類の説明
 * - 書類アップロード処理の実行
 * - 注意事項の表示
 */
const VerificationScreen = () => {
  const { frontImage, backImage, isUploading, showImagePickerOptions, removeImage, handleStartVerification } =
    useVerificationFlow();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeaderSection />
        <StepsSection />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>身分証明書の写真をアップロード</Text>
          <PhotoUploader
            label="表面（顔写真がある面）"
            imageUri={frontImage}
            onSelect={() => showImagePickerOptions('front')}
            onRemove={() => removeImage('front')}
          />
          <PhotoUploader
            label="裏面"
            imageUri={backImage}
            onSelect={() => showImagePickerOptions('back')}
            onRemove={() => removeImage('back')}
          />
        </View>

        <NoticeList />
        <VerificationActions isLoading={isUploading} onSubmit={handleStartVerification} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
});

export default VerificationScreen;

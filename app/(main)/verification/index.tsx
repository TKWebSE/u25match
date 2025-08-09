import CustomHeader from '@components/common/CustomHeader';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 本人確認スクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - 本人確認の手順説明
 * - 必要な書類の案内
 * - 本人確認の開始処理
 * - 注意事項の表示
 */
const VerificationScreen = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * 本人確認の開始処理
   */
  const handleStartVerification = () => {
    setIsProcessing(true);

    // 実際の本人確認処理をシミュレート
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        '本人確認',
        '本人確認機能は現在準備中です。\n後日リリース予定です。',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  /**
   * 戻る処理
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* カスタムヘッダー */}
      <CustomHeader title="本人確認" onBack={handleBack} />

      <ScrollView style={styles.container}>
        {/* ヘッダーセクション */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>
          <Text style={styles.title}>本人確認を完了しましょう</Text>
          <Text style={styles.subtitle}>
            本人確認を完了すると、より多くのユーザーとマッチングできるようになります
          </Text>
        </View>

        {/* 手順セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>本人確認の手順</Text>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>身分証明書の準備</Text>
              <Text style={styles.stepDescription}>
                運転免許証、マイナンバーカード、パスポートのいずれかをご用意ください
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>写真の撮影</Text>
              <Text style={styles.stepDescription}>
                身分証明書の表裏を撮影してください
              </Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>審査完了</Text>
              <Text style={styles.stepDescription}>
                審査完了まで1-3営業日程度かかります
              </Text>
            </View>
          </View>
        </View>

        {/* 注意事項セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>注意事項</Text>

          <View style={styles.noticeContainer}>
            <Text style={styles.noticeText}>
              • 身分証明書の情報は暗号化され、安全に管理されます
            </Text>
            <Text style={styles.noticeText}>
              • 本人確認は一度のみ必要です
            </Text>
            <Text style={styles.noticeText}>
              • 審査中は通常通りアプリをご利用いただけます
            </Text>
            <Text style={styles.noticeText}>
              • 身分証明書の有効期限が切れている場合は使用できません
            </Text>
          </View>
        </View>

        {/* 開始ボタン */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.startButton, isProcessing && styles.startButtonDisabled]}
            onPress={handleStartVerification}
            disabled={isProcessing}
          >
            <Text style={styles.startButtonText}>
              {isProcessing ? '処理中...' : '本人確認を開始'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * スタイル定義
 */
const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: 'center' as const,
    marginBottom: 30,
    paddingTop: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3182CE',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
    lineHeight: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row' as const,
    marginBottom: 20,
    alignItems: 'flex-start' as const,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3182CE',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 16,
    flexShrink: 0,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noticeContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center' as const,
    shadowColor: '#3182CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600' as const,
  },
};

export default VerificationScreen;

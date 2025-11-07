import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 本人確認の手順一覧を番号付きで表示するコンポーネント
 */
const steps = [
  {
    title: '身分証明書の準備',
    description: '運転免許証、マイナンバーカード、パスポートのいずれかをご用意ください',
  },
  {
    title: '写真の撮影',
    description: '身分証明書の表裏を撮影してください',
  },
  {
    title: '審査完了',
    description: '審査完了まで1-3営業日程度かかります',
  },
];

/**
 * 手順リストを描画するメインコンポーネント
 */
const StepsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>本人確認の手順</Text>
      {steps.map((step, index) => (
        <View key={step.title} style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3182CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default StepsSection;


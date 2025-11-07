import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 注意事項リストをボックス表示するコンポーネント
 */
const notices = [
  '身分証明書の情報は暗号化され、安全に管理されます',
  '本人確認は一度のみ必要です',
  '審査中は通常通りアプリをご利用いただけます',
  '身分証明書の有効期限が切れている場合は使用できません',
  '写真は鮮明で、文字が読み取れるように撮影してください',
];

/**
 * 注意事項セクション本体のコンポーネント
 */
const NoticeList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>注意事項</Text>
      <View style={styles.box}>
        {notices.map((notice) => (
          <Text key={notice} style={styles.text}>
            • {notice}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  box: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default NoticeList;


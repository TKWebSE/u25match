import { colors } from '@styles/globalStyles';
import { showErrorToast, showSuccessToast } from '@utils/showToast';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * お問い合わせスクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - お問い合わせフォームの表示
 * - ユーザーからの問い合わせ受付
 * - サポート情報の提供
 */
const ContactScreen = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // お問い合わせ送信処理
  const handleSubmit = () => {
    // バリデーション: 必須項目のチェック
    if (!name.trim()) {
      showErrorToast('お名前を入力してください');
      return;
    }

    if (!email.trim()) {
      showErrorToast('メールアドレスを入力してください');
      return;
    }

    if (!subject.trim()) {
      showErrorToast('件名を入力してください');
      return;
    }

    if (!message.trim()) {
      showErrorToast('お問い合わせ内容を入力してください');
      return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showErrorToast('正しいメールアドレスを入力してください');
      return;
    }

    // 文字数制限チェック
    if (name.length > 50) {
      showErrorToast('お名前は50文字以内で入力してください');
      return;
    }

    if (subject.length > 100) {
      showErrorToast('件名は100文字以内で入力してください');
      return;
    }

    if (message.length > 1000) {
      showErrorToast('お問い合わせ内容は1000文字以内で入力してください');
      return;
    }

    // 送信処理（実際の実装ではAPI呼び出しなど）
    try {
      // シミュレーション: 送信処理
      setTimeout(() => {
        showSuccessToast('お問い合わせを送信しました');

        // フォームをリセット
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');

        // 少し遅延してから前の画面に戻る
        setTimeout(() => {
          router.back();
        }, 2000);
      }, 1000);
    } catch (error) {
      showErrorToast('送信に失敗しました。もう一度お試しください');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1, padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ maxWidth: 800, alignSelf: 'center', width: '100%' }}>
          {/* タイトル */}
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: 20,
            textAlign: 'center'
          }}>
            お問い合わせ
          </Text>

          {/* 説明文 */}
          <Text style={{
            fontSize: 16,
            lineHeight: 24,
            color: '#666',
            marginBottom: 30,
            textAlign: 'center'
          }}>
            ご質問やご意見がございましたら、以下のフォームからお気軽にお問い合わせください。
          </Text>

          {/* お問い合わせフォーム */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>

            {/* お名前 */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
              お名前 <Text style={{ color: '#e53e3e' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                backgroundColor: '#f9fafb'
              }}
              placeholder="お名前を入力してください"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />

            {/* メールアドレス */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
              メールアドレス <Text style={{ color: '#e53e3e' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                backgroundColor: '#f9fafb'
              }}
              placeholder="example@email.com"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* 件名 */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
              件名 <Text style={{ color: '#e53e3e' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                backgroundColor: '#f9fafb'
              }}
              placeholder="件名を入力してください"
              placeholderTextColor="#9ca3af"
              value={subject}
              onChangeText={setSubject}
            />

            {/* お問い合わせ内容 */}
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 8 }}>
              お問い合わせ内容 <Text style={{ color: '#e53e3e' }}>*</Text>
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                backgroundColor: '#f9fafb',
                height: 120,
                textAlignVertical: 'top'
              }}
              placeholder="お問い合わせ内容を詳しく入力してください"
              placeholderTextColor="#9ca3af"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={5}
            />

            {/* 送信ボタン */}
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 16,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                送信する
              </Text>
            </TouchableOpacity>
          </View>

          {/* サポート情報 */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 15 }}>
              サポート情報
            </Text>

            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 15 }}>
              <Text style={{ fontWeight: '600' }}>営業時間：</Text>平日 9:00〜18:00（土日祝日除く）
            </Text>

            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 15 }}>
              <Text style={{ fontWeight: '600' }}>返信期間：</Text>通常3営業日以内
            </Text>

            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 15 }}>
              <Text style={{ fontWeight: '600' }}>メール：</Text>support@u25match.com
            </Text>

          </View>

          {/* よくある質問 */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2, marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 15 }}>
              よくある質問
            </Text>

            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 }}>
              Q: アカウントの削除方法は？
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: '#666', marginBottom: 15 }}>
              A: 設定画面の「アカウント削除」から削除できます。
            </Text>

            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 }}>
              Q: マッチングがうまくいかない
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: '#666', marginBottom: 15 }}>
              A: プロフィールの充実度や写真の質を向上させることをお勧めします。
            </Text>

            <Text style={{ fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 }}>
              Q: パスワードを忘れてしまった
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 20, color: '#666', marginBottom: 15 }}>
              A: ログイン画面の「パスワードを忘れた方」から再設定できます。
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactScreen;

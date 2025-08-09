import CustomHeader from '@components/common/CustomHeader';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * プライバシーポリシースクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - プライバシーポリシーの表示
 * - ユーザーの個人情報保護に関する説明
 * - 法的要件への対応
 */
const PrivacyPolicyScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* カスタムヘッダー */}
      <CustomHeader title="プライバシーポリシー" />

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
            プライバシーポリシー
          </Text>

          {/* 更新日 */}
          <Text style={{
            fontSize: 14,
            color: '#666',
            marginBottom: 30,
            textAlign: 'center'
          }}>
            最終更新日: 2024年1月20日
          </Text>

          {/* プライバシーポリシー内容 */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>

            {/* 1. はじめに */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              1. はじめに
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              U25Match（以下「当アプリ」）は、お客様の個人情報の保護を最重要事項と考えています。本プライバシーポリシーは、当アプリが収集、使用、保存、共有する個人情報について説明します。
            </Text>

            {/* 2. 収集する情報 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              2. 収集する情報
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 }}>
              当アプリは以下の情報を収集します：
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              • 基本情報：名前、年齢、居住地{'\n'}
              • プロフィール情報：写真、自己紹介、趣味・興味{'\n'}
              • 認証情報：メールアドレス、認証状態{'\n'}
              • 利用履歴：アプリの使用状況、マッチング履歴{'\n'}
              • デバイス情報：端末識別子、OS情報
            </Text>

            {/* 3. 情報の使用目的 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              3. 情報の使用目的
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 }}>
              収集した情報は以下の目的で使用します：
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              • マッチングサービスの提供{'\n'}
              • ユーザー認証・セキュリティ{'\n'}
              • カスタマーサポート{'\n'}
              • サービス改善・開発{'\n'}
              • 法的要件への対応
            </Text>

            {/* 4. 情報の共有 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              4. 情報の共有
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、以下の場合を除き、お客様の個人情報を第三者と共有しません：{'\n'}
              • お客様の明示的な同意がある場合{'\n'}
              • 法的義務に基づく場合{'\n'}
              • サービス提供に必要な限定的な範囲での委託先への提供
            </Text>

            {/* 5. 情報の保護 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              5. 情報の保護
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、お客様の個人情報を適切に保護するため、以下の措置を講じています：{'\n'}
              • 暗号化通信の使用{'\n'}
              • アクセス制御の実施{'\n'}
              • 定期的なセキュリティ監査{'\n'}
              • 従業員への教育・訓練
            </Text>

            {/* 6. 情報の保持期間 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              6. 情報の保持期間
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、サービス提供に必要な期間、お客様の個人情報を保持します。アカウント削除時には、関連する個人情報を適切に削除いたします。
            </Text>

            {/* 7. お客様の権利 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              7. お客様の権利
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              お客様は以下の権利を有します：{'\n'}
              • 個人情報の開示請求{'\n'}
              • 個人情報の訂正・削除請求{'\n'}
              • 個人情報の利用停止請求{'\n'}
              • データの可搬性の要求
            </Text>

            {/* 8. クッキー・トラッキング */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              8. クッキー・トラッキング
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、サービス向上のためクッキーや類似技術を使用することがあります。お客様はブラウザ設定でクッキーの使用を制限できます。
            </Text>

            {/* 9. 未成年者の保護 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              9. 未成年者の保護
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、18歳未満のユーザーからの個人情報収集を禁止しています。保護者の同意なく未成年者の個人情報を収集することはありません。
            </Text>

            {/* 10. プライバシーポリシーの変更 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              10. プライバシーポリシーの変更
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、アプリ内でお知らせいたします。
            </Text>

            {/* 11. お問い合わせ */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              11. お問い合わせ
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              プライバシーポリシーに関するご質問やご要望がございましたら、以下の方法でお問い合わせください：{'\n'}
              • メール: privacy@u25match.com{'\n'}
              • アプリ内サポート: 設定画面の「お問い合わせ」から
            </Text>

            {/* 12. 準拠法 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              12. 準拠法
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              本プライバシーポリシーは、日本法に準拠して解釈されます。
            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

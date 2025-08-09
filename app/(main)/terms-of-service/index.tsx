import CustomHeader from '@components/common/CustomHeader';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * 利用規約スクリーン
 * 
 * このスクリーンは以下の責務を持ちます：
 * - 利用規約の表示
 * - ユーザーの権利と義務の説明
 * - 法的要件への対応
 */
const TermsOfServiceScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* カスタムヘッダー */}
      <CustomHeader title="利用規約" />

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
            利用規約
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

          {/* 利用規約内容 */}
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>

            {/* 1. はじめに */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第1条（適用）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              本利用規約（以下「本規約」）は、U25Match（以下「当アプリ」）が提供するマッチングサービス（以下「本サービス」）の利用条件を定めるものです。ユーザーは本規約に同意した上で本サービスを利用するものとします。
            </Text>

            {/* 2. 定義 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第2条（定義）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 }}>
              本規約において使用する用語の定義は、次の各号に定めるとおりとします：
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              （1）「ユーザー」とは、本サービスを利用する個人をいいます。{'\n'}
              （2）「コンテンツ」とは、ユーザーが本サービスに投稿する文章、画像、動画等の情報をいいます。{'\n'}
              （3）「マッチング」とは、本サービスを通じてユーザー同士が相互に興味を示すことをいいます。
            </Text>

            {/* 3. 利用登録 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第3条（利用登録）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 本サービスの利用を希望する者は、本規約に同意の上、当アプリの定める方法によって利用登録を申請するものとします。{'\n'}
              2. 当アプリは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります：{'\n'}
              （1）虚偽の事項を届け出た場合{'\n'}
              （2）本規約に違反したことがある者からの申請である場合{'\n'}
              （3）その他、当アプリが利用登録を相当でないと判断した場合
            </Text>

            {/* 4. 利用料金 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第4条（利用料金）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 本サービスの基本利用料金は無料とします。{'\n'}
              2. 有料機能を利用する場合、別途定める料金体系に従って料金を支払うものとします。{'\n'}
              3. 料金の支払い方法、支払い時期等については、当アプリが別途定める方法に従うものとします。
            </Text>

            {/* 5. 禁止事項 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第5条（禁止事項）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 }}>
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              （1）法令または公序良俗に違反する行為{'\n'}
              （2）犯罪行為に関連する行為{'\n'}
              （3）当アプリのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為{'\n'}
              （4）本サービスの運営を妨害するおそれのある行為{'\n'}
              （5）他のユーザーに関する個人情報等を収集または蓄積する行為{'\n'}
              （6）他のユーザーに成りすます行為{'\n'}
              （7）当アプリのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為{'\n'}
              （8）その他、当アプリが不適切と判断する行為
            </Text>

            {/* 6. 本サービスの提供の停止等 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第6条（本サービスの提供の停止等）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 当アプリは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします：{'\n'}
              （1）本サービスにかかるコンピュータシステムの保守点検または更新を行う場合{'\n'}
              （2）地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合{'\n'}
              （3）その他、当アプリが本サービスの提供が困難と判断した場合{'\n'}
              2. 当アプリは、本サービスの提供の停止または中断によりユーザーまたは第三者に生じた損害について、一切の責任を負いません。
            </Text>

            {/* 7. 利用制限および登録抹消 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第7条（利用制限および登録抹消）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 当アプリは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします：{'\n'}
              （1）本規約のいずれかの条項に違反した場合{'\n'}
              （2）登録事項に虚偽の事実があることが判明した場合{'\n'}
              （3）その他、当アプリが本サービスの利用を適当でないと判断した場合{'\n'}
              2. 当アプリは、本条に基づき当アプリが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
            </Text>

            {/* 8. 退会 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第8条（退会）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              ユーザーは、当アプリの定める退会手続により、本サービスから退会できるものとします。
            </Text>

            {/* 9. 保証の否認及び免責 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第9条（保証の否認及び免責）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 当アプリは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しておりません。{'\n'}
              2. 当アプリは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。{'\n'}
              3. 当アプリは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </Text>

            {/* 10. サービス内容の変更等 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第10条（サービス内容の変更等）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
            </Text>

            {/* 11. 利用規約の変更 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第11条（利用規約の変更）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              当アプリは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約変更後、本サービスの利用を継続した場合には、変更後の規約に同意したものとみなします。
            </Text>

            {/* 12. 通知または連絡 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第12条（通知または連絡）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              ユーザーと当アプリとの間の通知または連絡は、当アプリの定める方法によって行うものとします。当アプリは、ユーザーから、当アプリが別途定める方法に従った変更の届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
            </Text>

            {/* 13. 権利義務の譲渡の禁止 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第13条（権利義務の譲渡の禁止）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              ユーザーは、当アプリの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
            </Text>

            {/* 14. 準拠法・裁判管轄 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              第14条（準拠法・裁判管轄）
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              1. 本規約の解釈にあたっては、日本法を準拠法とします。{'\n'}
              2. 本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </Text>

            {/* 15. 附則 */}
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a', marginBottom: 10 }}>
              附則
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 }}>
              本規約は2024年1月20日から適用されます。
            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsOfServiceScreen;

import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';
import { TermsOfServiceContent } from './TermsOfServiceContent';

/**
 * 利用規約・プライバシーポリシーモーダル表示フック
 */
export const useLegalDocuments = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'terms' | 'privacy'>('terms');

  const showTerms = () => {
    setType('terms');
    setVisible(true);
  };

  const showPrivacy = () => {
    setType('privacy');
    setVisible(true);
  };

  const hide = () => setVisible(false);

  const LegalModal = () => (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={hide}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        {/* ヘッダー */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0'
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1a1a1a',
            flex: 1,
            textAlign: 'center'
          }}>
            {type === 'terms' ? '利用規約' : 'プライバシーポリシー'}
          </Text>
          <TouchableOpacity
            onPress={hide}
            style={{
              position: 'absolute',
              right: 16,
              padding: 8,
              backgroundColor: '#f5f5f5',
              borderRadius: 20,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{
              fontSize: 18,
              color: '#666',
              fontWeight: '500'
            }}>
              ×
            </Text>
          </TouchableOpacity>
        </View>

        {/* コンテンツ */}
        <ScrollView
          style={{ flex: 1, padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ maxWidth: 800, alignSelf: 'center', width: '100%' }}>
            {type === 'terms' ? <TermsOfServiceContent /> : <PrivacyPolicyContent />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return { showTerms, showPrivacy, Modal: LegalModal };
};

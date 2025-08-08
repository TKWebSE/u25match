import CustomHeader from '@components/common/CustomHeader';
import { ProfileDetailStyles } from '@styles/profile/ProfileDetailStyles';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * プロフィール編集画面
 * 
 * この画面は以下の責務を持ちます：
 * - プロフィール情報の編集
 * - 画像の編集
 * - 保存機能
 */
const ProfileEditScreen = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // 保存処理
  const handleSave = () => {
    Alert.alert(
      '保存確認',
      'プロフィールを保存しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '保存',
          onPress: () => {
            // TODO: 実際の保存処理を実装
            Alert.alert('保存完了', 'プロフィールを保存しました');
            router.back();
          }
        }
      ]
    );
  };

  // キャンセル処理
  const handleCancel = () => {
    Alert.alert(
      'キャンセル確認',
      '編集内容を破棄しますか？',
      [
        { text: '続行', style: 'cancel' },
        {
          text: '破棄',
          onPress: () => router.back()
        }
      ]
    );
  };

  // 戻る処理
  const handleBack = () => {
    if (isEditing) {
      handleCancel();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={ProfileDetailStyles.safeArea}>
      <CustomHeader title="プロフィール編集" />

      <ScrollView style={ProfileDetailStyles.container} showsVerticalScrollIndicator={false}>
        {/* 保存ボタン */}
        <View style={ProfileDetailStyles.header}>
          <TouchableOpacity onPress={handleSave} style={ProfileDetailStyles.saveButton}>
            <Text style={ProfileDetailStyles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>

        {/* 編集画面のコンテンツ */}
        <View style={ProfileDetailStyles.header}>
          <Text style={ProfileDetailStyles.name}>プロフィール編集</Text>
          <Text style={ProfileDetailStyles.age}>
            この画面でプロフィール情報を編集できます
          </Text>
        </View>

        {/* 編集フォーム（後で実装） */}
        <View style={ProfileDetailStyles.header}>
          <Text style={ProfileDetailStyles.name}>編集機能</Text>
          <Text style={ProfileDetailStyles.age}>
            詳細画面と同じ構造で編集可能なフォームを実装予定
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEditScreen;

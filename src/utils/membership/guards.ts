// src/utils/guards.ts
// プレミアム会員向け機能の利用可否を判定するガード関数群

import type { FirestoreUser } from '@my-types/firestore';
import { Alert } from 'react-native';
import { getMembershipType } from './membershipUtils';

/**
 * プレミアム限定機能の実行前にチェックし、未プレミアムならアラートを表示して中断する
 * @param profile ユーザープロフィール
 * @returns 実行可否（true: 実行可能, false: 中断）
 */
export function ensurePremium(profile?: FirestoreUser): boolean {
  const membershipType = getMembershipType(profile);
  const isPremium = membershipType === 'premium';

  if (!isPremium) {
    Alert.alert(
      'プレミアム会員限定機能',
      'この機能のご利用には、プレミアム登録が必要です。'
    );
    return false;
  }

  return true;
}

/**
 * プレミアム限定機能のチェック（アラート表示なし）
 * @param profile ユーザープロフィール
 */
export function canUsePremiumFeature(profile?: FirestoreUser): boolean {
  return getMembershipType(profile) === 'premium';
}



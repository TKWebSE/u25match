import type { FirestoreUser } from '@my-types/firestore';
import { getMembershipType } from './membershipUtils';

/**
 * プラン名を取得
 * @param profile Firestoreのユーザープロフィール（未指定なら無料会員として扱う）
 * @returns プラン名（'プレミアム会員' | '無料会員'）
 */
export const getPlanName = (profile?: FirestoreUser): string => {
  if (!profile) {
    return '無料会員';
  }

  const membershipType = getMembershipType(profile);
  return membershipType === 'premium' ? 'プレミアム会員' : '無料会員';
};



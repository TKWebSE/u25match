import { FirestoreUser } from '@my-types/firestore';

/**
 * 会員種別を判定するユーティリティ関数
 * 
 * @param profile - ユーザープロフィール情報
 * @returns 会員種別 ('free' | 'premium')
 */
export const getMembershipType = (profile?: FirestoreUser): 'free' | 'premium' => {
  // プロフィールが存在しない場合は無料会員
  if (!profile) {
    return 'free';
  }

  // membershipTypeが明示的に設定されている場合はそれを使用（'premium' 以外は 'free' に丸める）
  if (profile.membershipType !== undefined) {
    return profile.membershipType === 'premium' ? 'premium' : 'free';
  }

  // 残り残量が多い場合は有料会員と判定（暫定的なロジック）
  // 実際の実装では、Firestoreの会員情報や決済履歴を参照する
  const hasHighRemainingCounts =
    (profile.remainingLikes ?? 0) > 50 ||
    (profile.remainingBoosts ?? 0) > 10 ||
    (profile.remainingPoints ?? 0) > 500;

  return hasHighRemainingCounts ? 'premium' : 'free';
};

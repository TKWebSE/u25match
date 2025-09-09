import { ProfileUser } from '../types/user';

/**
 * 会員種別を判定するユーティリティ関数
 * 
 * @param profile - ユーザープロフィール情報
 * @returns 会員種別 ('free' | 'premium')
 */
export const getMembershipType = (profile?: ProfileUser): 'free' | 'premium' => {
  // プロフィールが存在しない場合は無料会員
  if (!profile) {
    return 'free';
  }

  // membershipTypeが明示的に設定されている場合はそれを使用
  if (profile.membershipType) {
    return profile.membershipType;
  }

  // 残り残量が多い場合は有料会員と判定（暫定的なロジック）
  // 実際の実装では、Firestoreの会員情報や決済履歴を参照する
  const hasHighRemainingCounts =
    (profile.remainingLikes ?? 0) > 50 ||
    (profile.remainingBoosts ?? 0) > 10 ||
    (profile.remainingPoints ?? 0) > 500;

  return hasHighRemainingCounts ? 'premium' : 'free';
};

/**
 * プラン名を取得するユーティリティ関数
 * 
 * @param profile - ユーザープロフィール情報
 * @returns プラン名
 */
export const getPlanName = (profile?: ProfileUser): string => {
  if (!profile) {
    return '無料会員';
  }

  // プラン名が明示的に設定されている場合はそれを使用
  if (profile.planName) {
    return profile.planName;
  }

  // 会員種別に基づいてデフォルトのプラン名を返す
  const membershipType = getMembershipType(profile);
  return membershipType === 'premium' ? 'プレミアム会員' : '無料会員';
};

/**
 * 会員種別がプレミアムかどうかを判定する
 * 
 * @param profile - ユーザープロフィール情報
 * @returns プレミアム会員かどうか
 */
export const isPremiumMember = (profile?: ProfileUser): boolean => {
  return getMembershipType(profile) === 'premium';
};

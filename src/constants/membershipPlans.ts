// プレミアム会員プランの型定義
export interface MembershipPlan {
  name: string;
  price: string;
  period: string;
  savings: string | null;
  popular: boolean;
  features: string[];
}

// プランIDの型定義
export type PlanId = 'monthly' | 'quarterly' | 'yearly';

// プレミアム会員プランの定数
export const MEMBERSHIP_PLANS: Record<PlanId, MembershipPlan> = {
  monthly: {
    name: '月額プラン',
    price: '¥1,200',
    period: '月',
    savings: null,
    popular: false,
    features: ['100いいね付与', 'メッセージ機能解放'],
  },
  quarterly: {
    name: '3ヶ月プラン',
    price: '¥3,000',
    period: '3ヶ月',
    savings: '¥600',
    popular: true,
    features: ['300いいね付与', 'メッセージ機能解放', 'ブースト3回無料'],
  },
  yearly: {
    name: '年額プラン',
    price: '¥12,000',
    period: '年',
    savings: '¥2,400',
    popular: false,
    features: ['1200いいね付与', 'メッセージ機能解放', 'ブースト10回無料'],
  },
};

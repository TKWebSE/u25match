// src/stores/profileStore.ts
// プロフィール状態管理ストア - ユーザープロフィール情報・編集状態を担当

import { ProfileDetail } from '@services/profile/types';
import { create } from 'zustand';

/**
 * プロフィール情報
 * Firestoreのusersコレクションと同じ構造
 */
export type ProfileData = ProfileDetail;

/**
 * プロフィール関連の状態
 */
interface ProfileState {
  currentProfile: ProfileDetail | null;  // 現在のプロフィール情報
}

/**
 * プロフィール関連のアクション
 */
interface ProfileActions {
  setCurrentProfile: (profile: ProfileDetail | null) => void;
  reset: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

/**
 * プロフィールストア
 */
export const profileStore = create<ProfileStore>((set, get) => ({
  // 初期状態
  currentProfile: null,

  // アクション
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
  reset: () => set({
    currentProfile: null,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useProfileStore = () => profileStore();

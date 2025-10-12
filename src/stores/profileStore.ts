// src/stores/profileStore.ts
// プロフィール状態管理ストア - ユーザープロフィール情報・編集状態を担当

import { FirestoreUser } from '@my-types/firestore';
import { create } from 'zustand';

/**
 * プロフィール情報
 * Firestoreのusersコレクションと同じ構造
 */
export type ProfileData = FirestoreUser;

/**
 * プロフィール関連の状態
 */
interface ProfileState {
  currentProfile: FirestoreUser | null;  // 現在のプロフィール情報
  isLoading: boolean;                    // プロフィール処理中フラグ（取得・更新）
}

/**
 * プロフィール関連のアクション
 */
interface ProfileActions {
  setCurrentProfile: (profile: FirestoreUser | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

/**
 * プロフィールストア
 */
export const profileStore = create<ProfileStore>((set, get) => ({
  // 初期状態
  currentProfile: null,
  isLoading: false,

  // アクション
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set({
    currentProfile: null,
    isLoading: false,
  }),
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useProfileStore = () => profileStore();

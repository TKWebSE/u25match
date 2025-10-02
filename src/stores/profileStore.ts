// src/stores/profileStore.ts
// プロフィール状態管理ストア - ユーザープロフィール情報・編集状態を担当

import { create } from 'zustand';

/**
 * プロフィール情報（設定画面で必要な情報も含む）
 */
export interface ProfileData {
  uid: string;
  displayName?: string;
  bio?: string;
  age?: number;
  location?: string;
  occupation?: string;
  interests?: string[];
  images?: string[];
  isVerified?: boolean;
  lastActive?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  // 設定画面用の追加情報
  remainingLikes?: number;      // 残いいね数
  remainingBoosts?: number;     // 残ブースト数
  remainingPoints?: number;     // 残ポイント数
  membershipType?: 'free' | 'premium' | 'vip'; // 会員種別
  email?: string;               // メールアドレス
}

/**
 * プロフィール関連の状態
 */
interface ProfileState {
  currentProfile: ProfileData | null;    // 現在のプロフィール情報
  editingProfile: ProfileData | null;    // 編集中のプロフィール情報
  viewedProfiles: ProfileData[];         // 閲覧したプロフィール一覧
  isLoading: boolean;                    // プロフィール取得中フラグ
  isSaving: boolean;                     // プロフィール保存中フラグ
}

/**
 * プロフィール関連のアクション
 */
interface ProfileActions {
  setCurrentProfile: (profile: ProfileData | null) => void;
  setEditingProfile: (profile: ProfileData | null) => void;
  updateEditingProfile: (updates: Partial<ProfileData>) => void;
  setViewedProfiles: (profiles: ProfileData[]) => void;
  addViewedProfile: (profile: ProfileData) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  reset: () => void; // 状態をリセット
  // 編集関連
  startEditing: () => void;
  cancelEditing: () => void;
  saveChanges: () => void;
}

type ProfileStore = ProfileState & ProfileActions;

/**
 * プロフィールストア
 */
export const profileStore = create<ProfileStore>((set, get) => ({
  // 初期状態
  currentProfile: null,
  editingProfile: null,
  viewedProfiles: [],
  isLoading: false,
  isSaving: false,

  // アクション
  setCurrentProfile: (currentProfile) => set({ currentProfile }),
  setEditingProfile: (editingProfile) => set({ editingProfile }),
  updateEditingProfile: (updates) => set((state) => ({
    editingProfile: state.editingProfile
      ? { ...state.editingProfile, ...updates }
      : null
  })),
  setViewedProfiles: (viewedProfiles) => set({ viewedProfiles }),
  addViewedProfile: (profile) => set((state) => {
    // 重複チェック
    const exists = state.viewedProfiles.some(p => p.uid === profile.uid);
    if (exists) return state;

    return {
      viewedProfiles: [profile, ...state.viewedProfiles.slice(0, 49)] // 最大50件
    };
  }),
  setLoading: (isLoading) => set({ isLoading }),
  setSaving: (isSaving) => set({ isSaving }),
  reset: () => set({
    currentProfile: null,
    editingProfile: null,
    viewedProfiles: [],
    isLoading: false,
    isSaving: false,
  }),

  // 編集関連
  startEditing: () => {
    const { currentProfile } = get();
    if (currentProfile) {
      set({ editingProfile: { ...currentProfile } });
    }
  },
  cancelEditing: () => set({ editingProfile: null }),
  saveChanges: () => {
    const { editingProfile } = get();
    if (editingProfile) {
      set({
        currentProfile: { ...editingProfile },
        editingProfile: null
      });
    }
  },
}));

/**
 * React Hook として使用するためのカスタムフック
 */
export const useProfileStore = () => profileStore();

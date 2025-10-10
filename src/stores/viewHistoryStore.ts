// src/stores/viewHistoryStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serviceRegistry } from "@services/core/ServiceRegistry";
import { authStore } from "@stores/authStore";
import { create } from "zustand";

type ViewedProfile = {
  viewerId: string;
  targetId: string;
  viewedAt: number;
};

type ViewHistoryState = {
  cache: ViewedProfile[];
  addView: (targetId: string) => Promise<void>;
  flushIfNeeded: () => Promise<void>;
  clear: () => Promise<void>;
};

const MAX_CACHE = 10; // 閾値（10件たまったら送信）

export const useViewHistoryStore = create<ViewHistoryState>((set, get) => ({
  cache: [],

  // ✅ 履歴を追加（重複チェックあり）
  addView: async (targetId: string) => {
    const currentUser = authStore.getState().user;
    if (!currentUser) return; // ログインしていなければ何もしない

    const current = get().cache;

    // すでに同じ targetId があるか確認
    const exists = current.find(item => item.targetId === targetId);
    let newCache;

    if (exists) {
      // 同じ targetId のものを最新として末尾に移動（viewedAtを更新）
      newCache = [
        ...current.filter(item => item.targetId !== targetId),
        { viewerId: currentUser.uid, targetId, viewedAt: Date.now() },
      ];
    } else {
      // 新規追加
      newCache = [...current, { viewerId: currentUser.uid, targetId, viewedAt: Date.now() }];
    }

    set({ cache: newCache });

    // 一定数たまったらflush
    if (newCache.length >= MAX_CACHE) {
      await get().flushIfNeeded();
    }
  },

  // ✅ キャッシュをFirebaseに送信してクリア
  flushIfNeeded: async () => {
    const cache = get().cache;
    if (cache.length === 0) return;

    try {
      await serviceRegistry.viewHistory.saveBatch(cache);
      set({ cache: [] });
      await AsyncStorage.removeItem("viewHistoryCache");
      console.log(`📤 ${cache.length}件の履歴をFirebaseにフラッシュしました`);
    } catch (e) {
      console.error("❌ フラッシュ失敗:", e);
    }
  },

  // ✅ 強制クリア（デバッグ用など）
  clear: async () => {
    set({ cache: [] });
    await AsyncStorage.removeItem("viewHistoryCache");
  },
}));

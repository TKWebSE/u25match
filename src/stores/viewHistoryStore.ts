// src/stores/viewHistoryStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { serviceRegistry } from "@services/core/ServiceRegistry";
import { ViewHistoryCache } from "@services/viewHistory/types";
import { authStore } from "@stores/authStore";
import { create } from "zustand";

type ViewHistoryState = {
  cache: ViewHistoryCache[];
  recentlyViewed: Map<string, number>; // UID → タイムスタンプのマップ（重複防止用）
  addView: (viewedUserId: string) => Promise<void>;
  flushIfNeeded: () => Promise<void>;
  clear: () => Promise<void>;
};

const MAX_CACHE = 10; // 閾値（10件たまったら送信）
const VIEW_COOLDOWN = 5 * 60 * 1000; // 5分（同じプロフィールを5分以内に再訪問した場合は記録しない）

export const useViewHistoryStore = create<ViewHistoryState>((set, get) => ({
  cache: [],
  recentlyViewed: new Map(),

  // ✅ 履歴を追加（重複チェックあり + クールダウン機能）
  addView: async (viewedUserId: string) => {
    const currentUser = authStore.getState().user;
    if (!currentUser) return; // ログインしていなければ何もしない

    const now = Date.now();
    const { recentlyViewed, cache: current } = get();

    // 短時間内の重複チェック（5分以内に同じプロフィールを見た場合はスキップ）
    const lastViewTime = recentlyViewed.get(viewedUserId);
    if (lastViewTime && now - lastViewTime < VIEW_COOLDOWN) {
      console.log(`⏭️ ${viewedUserId} は最近閲覧済み（${Math.floor((now - lastViewTime) / 1000)}秒前）- スキップ`);
      return;
    }

    // すでに同じ viewedUserId があるか確認
    const exists = current.find(item => item.viewedUserId === viewedUserId);
    let newCache;

    if (exists) {
      // 同じ viewedUserId のものを最新として末尾に移動
      newCache = [
        ...current.filter(item => item.viewedUserId !== viewedUserId),
        { viewerId: currentUser.uid, viewedUserId, viewedAt: now },
      ];
    } else {
      // 新規追加
      newCache = [...current, { viewerId: currentUser.uid, viewedUserId, viewedAt: now }];
    }

    // 閲覧記録を更新
    const updatedRecentlyViewed = new Map(recentlyViewed);
    updatedRecentlyViewed.set(viewedUserId, now);

    set({ cache: newCache, recentlyViewed: updatedRecentlyViewed });

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
    set({ cache: [], recentlyViewed: new Map() });
    await AsyncStorage.removeItem("viewHistoryCache");
  },
}));

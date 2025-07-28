// src/constants/routes.ts

// 認証
export const ENTRY_SCREEN_PATH = '/EntryScreen';
export const LOGIN_SCREEN_PATH = '/LoginScreen';
export const SIGN_UP_SCREEN_PATH = '/SignUpScreen';

// メイン（ユーザー探索）
export const EXPLORE_SCREEN_PATH = "/(main)/(home)/(tabs)/(explore)";
export const PROFILE_MODAL_PATH = "/(main)/profile/[uid]";

// チャット
export const CHAT_LIST_SCREEN_PATH = '/(main)/(home)/(tabs)/(chat)';
export const CHAT_ROOM_SCREEN_PATH = (chatId: string) => `/chat/${chatId}`;

// プロフィール
export const PROFILE_SCREEN_PATH = '/(main)/profile/[uid]';
export const PROFILE_EDIT_SCREEN_PATH = '/(main)/profile/edit';

// リアクション
export const REACTIONS_SCREEN_PATH = '/(main)/(home)/(tabs)/(reactions)';

// 設定
export const SETTINGS_SCREEN_PATH = '/(main)/(home)/(tabs)/(settings)'; 

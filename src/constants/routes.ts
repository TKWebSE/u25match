// src/constants/routes.ts

// 認証
export const ENTRY_SCREEN_PATH = '/EntryScreen';
export const LOGIN_SCREEN_PATH = '/LoginScreen';
export const SIGN_UP_SCREEN_PATH = '/SignUpScreen';

// ホーム（ユーザー探索）
export const EXPLORE_SCREEN_PATH = "/(home)/(tabs)/(explore)";
export const PROFILE_MODAL_PATH = "/(profile)/[uid]";

// チャット
export const CHAT_LIST_SCREEN_PATH = '/(chat)/chatListScreen';
export const CHAT_ROOM_SCREEN_PATH = (chatId: string) => `/chat/${chatId}`;

// プロフィール
export const PROFILE_SCREEN_PATH = '/(profile)/profileViewScreen';
export const PROFILE_EDIT_SCREEN_PATH = '/(profile)/profileEditScreen';

// リアクション
export const REACTIONS_SCREEN_PATH = '/(reactions)/reactionsScreen';

// 設定
export const SETTINGS_SCREEN_PATH = '/(settings)/settingsScreen'; 

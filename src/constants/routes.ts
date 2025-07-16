// src/constants/routes.ts

// 認証
export const ENTRY_SCREEN_PATH = '/entryScreen';
export const LOGIN_SCREEN_PATH = '/loginScreen';
export const SIGN_UP_SCREEN_PATH = '/signUpScreen';

// ホーム（ユーザー探索）
export const EXPLORE_SCREEN_PATH = '/(home)/(tabs)/explore'; // index.tsx にすれば '/home' でOK
export const PROFILE_MODAL_PATH = (uid: string) => `/profile/${uid}`;

// チャット
export const CHAT_LIST_SCREEN_PATH = '/(chat)/chatListScreen'; // index.tsx にすれば '/chat' でOK
export const CHAT_ROOM_SCREEN_PATH = (chatId: string) => `/chat/${chatId}`;

// プロフィール
export const PROFILE_SCREEN_PATH = '/(profile)/profileViewScreen'; // index.tsx にすれば '/profile'
export const PROFILE_EDIT_SCREEN_PATH = '/(profile)/profileEditScreen';

// リアクション
export const REACTIONS_SCREEN_PATH = '/(reactions)/reactionsScreen'; // index.tsx にすれば '/reactions'

// 設定
export const SETTINGS_SCREEN_PATH = '/(settings)/settingsScreen'; // index.tsx にすれば '/settings'

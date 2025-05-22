// src/constants/routes.ts

// 認証
export const ENTRY_SCREEN_PATH = '/entryScreen';
export const LOGIN_SCREEN_PATH = '/loginScreen';
export const SIGN_UP_SCREEN_PATH = '/signUpScreen';
export const FORGOT_PASSWORD_SCREEN_PATH = '/forgotPasswordScreen';

// メイン（ユーザー探索）
export const EXPLORE_SCREEN_PATH = "/explore";
export const PROFILE_MODAL_PATH = "/profile/detail/[uid]";

// チャット
export const CHAT_LIST_SCREEN_PATH = '/(home)/(tabs)/chat';
export const CHAT_ROOM_SCREEN_PATH = (chatId: string) => `/chat/${chatId}`;

// プロフィール
export const PROFILE_SCREEN_PATH = '/profile/detail/[uid]';
export const PROFILE_EDIT_SCREEN_PATH = '/profile/edit';
export const getProfilePath = (uid: string) => `/profile/detail/${uid}`;

// リアクション
export const REACTIONS_SCREEN_PATH = '/(home)/(tabs)/reactions';

// レコメンド
export const RECOMMENDATIONS_SCREEN_PATH = '/recommendations';

// 設定
export const SETTINGS_SCREEN_PATH = '/(home)/(tabs)/settings';

// セールス
export const SALES_SCREEN_PATH = '/sales';
export const getSalesDetailPath = (saleId: string) => `/sales/${saleId}`;

// その他の画面
export const CONTACT_SCREEN_PATH = '/contact';
export const LIKES_HISTORY_SCREEN_PATH = '/likes-history';
export const MEMBERSHIP_REGISTRATION_SCREEN_PATH = '/membership-registration';
export const NOTIFICATIONS_SCREEN_PATH = '/notifications';
export const PRIVACY_POLICY_SCREEN_PATH = '/privacy-policy';
export const TERMS_OF_SERVICE_SCREEN_PATH = '/terms-of-service';
export const PURCHASE_BOOSTS_SCREEN_PATH = '/purchase-boosts';
export const PURCHASE_LIKES_SCREEN_PATH = '/purchase-likes';
export const PURCHASE_POINTS_SCREEN_PATH = '/purchase-points';
export const VERIFICATION_SCREEN_PATH = '/verification'; 

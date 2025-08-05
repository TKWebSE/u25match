// src/services/main/profile/index.ts
// 🚀 プロフィール詳細サービスのエントリーポイント

import { createProfileDetailService } from './factory';
import { ProfileDetailService } from './types';

// 🎯 環境に応じたプロフィール詳細サービスインスタンスを生成
const profileDetailService = createProfileDetailService();

// 📤 外部から使用するためのエクスポート
export * from './types';
export { profileDetailService };
export type { ProfileDetailService };


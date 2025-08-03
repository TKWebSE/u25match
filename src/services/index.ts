// src/services/index.ts
// 🚪 サービス層の統一エントリーポイント
// このファイルから全てのサービスをエクスポートし、外部からの利用を簡素化

// 🔐 認証サービス関連
// - signUp, logIn, logOut 関数
// - AuthService, AuthResult 型
export * from './auth';

// 👤 プロフィール詳細サービス
// - getProfileDetail, updateProfileDetail, sendLike 関数
// - ProfileDetailService, ProfileDetail 型
export * from './profile';

// 🏠 メイン機能サービス
// - チャット、探索、リアクション、設定サービス
export * from './main';

// 🏭 サービスレジストリ
// - ServiceRegistry クラス
// - serviceRegistry グローバルインスタンス
export { serviceRegistry } from './ServiceRegistry';

// 🏗️ ベースクラスと共通型
// - BaseService 抽象クラス
// - ServiceResponse 型
export * from './base/BaseService';
// 🏭 ファクトリー関数（main配下に移動済み）
// 各サービスのインスタンスを生成する関数
// import { createProfileDetailService } from './profileDetail/factory'; // 削除


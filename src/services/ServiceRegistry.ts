// src/services/ServiceRegistry.ts
// 🏭 サービスレジストリ - 依存性管理の一元化

import { createAuthService } from './auth/factory';
import { AuthService } from './auth/types';
import { createProfileDetailService } from './profile/factory';
import { ProfileDetailService } from './profile/types';

export class ServiceRegistry {
  private static instance: ServiceRegistry;  // シングルトンインスタンス
  private services: Map<string, any> = new Map();  // サービスを格納するマップ

  /**
   * 🔒 プライベートコンストラクタ
   * シングルトンパターンのため外部からのインスタンス化を禁止
   */
  private constructor() {
    this.initializeServices();
  }

  /**
   * 🏭 シングルトンインスタンスを取得
   * アプリケーション全体で一つのレジストリインスタンスを共有
   * @returns ServiceRegistryの唯一のインスタンス
   */
  static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  /**
   * 🚀 サービスの初期化
   * アプリケーション起動時に必要なサービスを登録
   */
  private initializeServices(): void {
    // 認証サービスの登録
    this.register('auth', createAuthService());

    // プロフィール詳細サービスの登録
    this.register('profileDetail', createProfileDetailService());

    // 他のサービスもここで登録
    // this.register('user', createUserService());
    // this.register('chat', createChatService());
  }

  /**
   * 📝 サービスをレジストリに登録
   * @param name サービス名（キー）
   * @param service 登録するサービスインスタンス
   */
  register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  /**
   * 🔍 サービスをレジストリから取得
   * @param name 取得したいサービス名
   * @returns 登録されたサービスインスタンス
   * @throws サービスが見つからない場合にエラーを投げる
   */
  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service '${name}' not found in registry`);
    }
    return service as T;
  }

  /**
   * ✅ サービスが登録されているかチェック
   * @param name チェックしたいサービス名
   * @returns 登録されている場合はtrue
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * 🔐 認証サービスの型安全な取得
   * 型推論が効くため、より安全に使用可能
   * @returns AuthServiceインスタンス
   */
  get auth(): AuthService {
    return this.get<AuthService>('auth');
  }

  /**
   * 👤 プロフィール詳細サービスの型安全な取得
   * 型推論が効くため、より安全に使用可能
   * @returns ProfileDetailServiceインスタンス
   */
  get profileDetail(): ProfileDetailService {
    return this.get<ProfileDetailService>('profileDetail');
  }
}

// 🌍 グローバルインスタンス - アプリケーション全体で共有
export const serviceRegistry = ServiceRegistry.getInstance(); 

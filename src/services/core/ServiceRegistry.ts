// src/services/ServiceRegistry.ts
// 🏭 サービスレジストリ - 依存性管理の一元化

import { createAuthService } from '../auth/factory';
import { AuthService } from '../auth/types';
import { createChatService } from '../chat/factory';
import { ChatService } from '../chat/types';
import { createExploreService } from '../explore/factory';
import { ExploreService } from '../explore/types';
import { createPaymentService } from '../payment/factory';
import { PaymentService } from '../payment/types';
import { createProfileService } from '../profile/factory';
import { ProfileDetailService } from '../profile/types';
import { createReactionsService } from '../reactions/factory';
import { ReactionsService } from '../reactions/types';
import { createSalesService } from '../sales/factory';
import { SalesService } from '../sales/types';
import { createSettingsService } from '../settings/factory';
import { SettingsService } from '../settings/types';
import { createVerificationService } from '../verification/factory';
import { VerificationService } from '../verification/types';
import { createViewHistoryService } from '../viewHistory/factory';
import { ViewHistoryService } from '../viewHistory/types';

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
    this.register('profileDetail', createProfileService());

    // チャットサービスの登録
    this.register('chat', createChatService());

    // 探索サービスの登録
    this.register('explore', createExploreService());

    // リアクションサービスの登録
    this.register('reactions', createReactionsService());

    // 販売サービスの登録
    this.register('sales', createSalesService());

    // 設定サービスの登録
    this.register('settings', createSettingsService());

    // 本人確認サービスの登録
    this.register('verification', createVerificationService());

    // 決済サービスの登録
    this.register('payment', createPaymentService());

    // 閲覧履歴サービスの登録
    this.register('viewHistory', createViewHistoryService());
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

  /**
   * 💬 チャットサービスの型安全な取得
   * 型推論が効くため、より安全に使用可能
   * @returns ChatServiceインスタンス
   */
  get chat(): ChatService {
    return this.get<ChatService>('chat');
  }

  /**
   * 🔍 探索サービスの型安全な取得
   */
  get explore(): ExploreService {
    return this.get<ExploreService>('explore');
  }

  /**
   * ❤️ リアクションサービスの型安全な取得
   */
  get reactions(): ReactionsService {
    return this.get<ReactionsService>('reactions');
  }

  /**
   * 🏪 販売サービスの型安全な取得
   */
  get sales(): SalesService {
    return this.get<SalesService>('sales');
  }

  /**
   * ⚙️ 設定サービスの型安全な取得
   */
  get settings(): SettingsService {
    return this.get<SettingsService>('settings');
  }

  /**
   * 📄 本人確認サービスの型安全な取得
   */
  get verification(): VerificationService {
    return this.get<VerificationService>('verification');
  }

  /**
   * 💳 決済サービスの型安全な取得
   */
  get payment(): PaymentService {
    return this.get<PaymentService>('payment');
  }

  /**
   * 👁️ 閲覧履歴サービスの型安全な取得
   */
  get viewHistory(): ViewHistoryService {
    return this.get<ViewHistoryService>('viewHistory');
  }
}

// 🌍 グローバルインスタンス - アプリケーション全体で共有
export const serviceRegistry = ServiceRegistry.getInstance(); 

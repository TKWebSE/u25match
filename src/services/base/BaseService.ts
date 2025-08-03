// src/services/base/BaseService.ts
// 🏗️ 全サービスの基底クラス - 共通機能を提供

export interface ServiceResponse<T = any> {
  success: boolean;      // 処理が成功したかどうか
  data?: T;             // 成功時のデータ
  error?: string;       // エラー時のメッセージ
  timestamp: Date;      // レスポンス生成時刻
  requestId?: string;   // リクエスト追跡用ID
}

export abstract class BaseService {
  /**
   * 🔍 リクエストIDを生成
   * デバッグやログ追跡のために使用
   * 形式: req_タイムスタンプ_ランダム文字列
   */
  protected generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * ✅ 成功レスポンスを作成
   * @param data 成功時のデータ
   * @returns 統一された成功レスポンス形式
   */
  protected createSuccessResponse<T>(data: T): ServiceResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date(),
      requestId: this.generateRequestId(),
    };
  }

  /**
   * ❌ エラーレスポンスを作成
   * @param error エラーメッセージ
   * @returns 統一されたエラーレスポンス形式
   */
  protected createErrorResponse(error: string): ServiceResponse {
    return {
      success: false,
      error,
      timestamp: new Date(),
      requestId: this.generateRequestId(),
    };
  }

  /**
   * 🛡️ サービス呼び出しの安全な実行
   * 例外をキャッチして統一されたレスポンス形式に変換
   * @param serviceCall 実行したい非同期処理
   * @returns 成功/失敗を統一された形式で返す
   */
  protected async handleServiceCall<T>(
    serviceCall: () => Promise<T>
  ): Promise<ServiceResponse<T>> {
    try {
      const result = await serviceCall();
      return this.createSuccessResponse(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return this.createErrorResponse(errorMessage);
    }
  }

  /**
   * ⏱️ ネットワーク遅延をシミュレート
   * 開発時に実際のAPI呼び出しを模擬するために使用
   * @param ms 遅延時間（ミリ秒）
   */
  protected async simulateNetworkDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 
